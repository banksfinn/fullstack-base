from typing import Any
from schemas.users import OutputUser
from schemas.base import (
    GetEntitiesQuery,
    DatabaseEntity,
    OutputEntity,
    EntityCreateRequest,
    EntityDeleteRequest,
    EntityUpdateRequest,
    GetEntitiesResponse,
)
from resources.all import EntityState
from fastapi import HTTPException, status
from uuid import uuid4, UUID
from datetime import datetime
from structlog import get_logger
from pymongo import MongoClient
from http import HTTPStatus


class BaseStore:
    collection_name: str
    database_entity: DatabaseEntity
    output_entity: OutputEntity
    base_response_model: GetEntitiesResponse
    query: GetEntitiesQuery
    db_name = "fullstack-base"
    conflicting_fields: list[str] = []

    def __init__(self):
        # TODO: Switch this to enterprise
        self.client = MongoClient("mongodb://root:example@localhost:27011")
        self.logger = get_logger()

    # Base helper functions

    def store(self):
        return self.client[self.db_name][self.collection_name]

    def create_document(self, new_id: str):
        return self.store().document(new_id)

    # TODO: Move these to their own file
    def generate_id(self) -> str:
        return str(uuid4())

    def sanitize_database_entity(self, entity_info: dict[str, Any]):
        for field in entity_info.keys():
            if isinstance(entity_info[field], UUID):
                entity_info[field] = str(entity_info[field])

        return entity_info

    def convert_database_entity_to_output_entity(self, entity: DatabaseEntity) -> OutputEntity:
        """Convert a database model to gateway."""
        # TODO: Test a better conversion between models than a straight model dump
        return self.output_entity(**entity.model_dump())

    def convert_raw_dictionary_to_database_entity(self, entity: dict[str, Any]) -> DatabaseEntity:
        """Convert a database dict to database model."""
        return self.database_entity(**entity)

    def convert_raw_dictionary_to_output_entity(self, entity: dict[str, Any]) -> OutputEntity:
        """Convert a database dict to database model."""
        return self.convert_database_entity_to_output_entity(
            self.convert_raw_dictionary_to_database_entity(entity)
        )

    # Getting entities

    def _search_query_extras(self, query: GetEntitiesQuery, search: dict[str, Any]):
        # Common filters
        return search

    def _search_query_base(self, query: GetEntitiesQuery, search: dict[str, Any]):
        # Common filters
        if query.entity_state is None:
            search["entity_state"] = "ACTIVE"
        return search

    def check_for_conflicts(self, entity_request: EntityCreateRequest | EntityUpdateRequest):
        for field in self.conflicting_fields:
            if hasattr(entity_request, field):
                search_response = self.search(
                    query=self.query(**{field: getattr(entity_request, field)})
                )
                if not hasattr(entity_request, "id") and search_response.items:
                    raise HTTPException(
                        HTTPStatus.CONFLICT,
                        f"An entity with {field} of {getattr(entity_request, field)} already exists",
                    )

                for item in search_response.items:
                    if item.id != entity_request.id:
                        raise HTTPException(
                            HTTPStatus.CONFLICT, f"An entity with field {field} already exists"
                        )

    def search(self, query: GetEntitiesQuery) -> GetEntitiesResponse:
        # Create the search
        search: dict[str, Any] = {}

        # Apply entity specific filtering
        search = self._search_query_base(query, search)
        search = self._search_query_extras(query, search)

        sort_mode = {query.order_by: 1 if query.direction == "asc" else -1}

        self.logger.info(
            "Executing Get Entities Search",
            search=search,
            limit=query.limit,
            offset=query.offset,
            sort=sort_mode,
        )
        entities: list[Any] = (
            self.store().find(search, limit=query.limit, skip=query.offset).sort(sort_mode)
        )
        self.logger.info("Executed Get Entities Search")
        return self.base_response_model(
            items=[self.convert_raw_dictionary_to_output_entity(e) for e in entities]
        )

    def get(self, id: str, user: OutputUser) -> OutputEntity | None:
        raw_entity = self.store().find_one({"_id": id, "user_id": user.user_id})
        if not raw_entity:
            return None
        return self.convert_raw_dictionary_to_output_entity(raw_entity)

    # Adding a new entity

    def _create_mutation_base(
        self, entity_data: dict[str, Any], user: OutputUser, now: str
    ) -> dict[str, Any]:
        entity_data["created_at"] = now
        entity_data["updated_at"] = now
        entity_data["updated_by"] = user.id
        entity_data["created_by"] = user.id
        entity_data["user_id"] = user.id
        entity_data["entity_state"] = EntityState.ACTIVE

        return entity_data

    def _create_mutation_extras(self, entity_info: dict[str, Any]) -> dict[str, Any]:
        pass

    def create(self, creation_request: EntityCreateRequest, user: OutputUser) -> OutputEntity:
        # Store the time, generate the UUID
        now = datetime.now()

        self.check_for_conflicts(creation_request)

        new_id = self.generate_id()

        # Generate the dictionary that we are uploading
        entity_info = creation_request.model_dump()
        entity_info["_id"] = new_id

        # Add relevant database info
        self._create_mutation_base(entity_info, user, now)

        # TODO: Turn all defaults into reasonable items, like "" for None on string
        self._create_mutation_extras(entity_info)
        self.sanitize_database_entity(entity_info)

        # Also a sanity check, to ensure everything going into the database is kosher
        database_entity = self.convert_raw_dictionary_to_database_entity(entity_info)
        output_entity = self.convert_database_entity_to_output_entity(database_entity)

        self.store().insert_one(database_entity.model_dump(by_alias=True))

        return output_entity

    # Updating an entity

    def _update_mutation_base(
        self, entity_data: dict[str, Any], user: OutputUser, now: str
    ) -> dict[str, Any]:
        entity_data["updated_by"] = user.user_id
        entity_data["updated_at"] = now

        return entity_data

    def _update_mutation_extras(
        self, entity_info: dict[str, Any], user: OutputUser
    ) -> dict[str, Any]:
        pass

    def update(self, update_request: EntityUpdateRequest, user: OutputUser) -> OutputEntity:
        # Store the time
        now = datetime.now()

        self.check_for_conflicts(update_request)

        # Get the existing document
        update_info = update_request.model_dump(exclude_defaults=True)
        entity_id = str(update_info["id"])
        existing_entity = self.store().find_one({"_id": entity_id, "user_id": user.user_id})

        if not existing_entity:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Unable to locate entity with that id",
            )

        # Combine the existing with the old
        self.logger.info("Entity Database Merge Input", update_info=update_info)
        merged_entity_info = existing_entity
        self.logger.info("Entity Database Merge Before", merged_entity_info=merged_entity_info)
        merged_entity_info.update(update_info)
        self.logger.info("Entity Database Merge After", merged_entity_info=merged_entity_info)

        # Add relevant database info
        self._update_mutation_base(merged_entity_info, user, now)
        self._update_mutation_extras(merged_entity_info, user)

        self.sanitize_database_entity(merged_entity_info)

        # Sanity check, to ensure everything going into the database is kosher
        # Also a sanity check, to ensure everything going into the database is kosher
        database_entity = self.convert_raw_dictionary_to_database_entity(merged_entity_info)
        output_entity = self.convert_database_entity_to_output_entity(database_entity)

        existing_entity = self.store().update_one({"_id": entity_id}, {"$set": merged_entity_info})

        return output_entity

    def delete(self, deletion_request: EntityDeleteRequest, user: OutputUser) -> OutputEntity:
        """Delete an entity"""
        self.logger.info(
            "Entity deletion request", deletion_request=deletion_request, current_user=user
        )
        existing_entity = self.get(deletion_request.id, user)

        if not existing_entity:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Unable to locate entity with that id",
            )

        if existing_entity.entity_state == EntityState.DELETED:
            self.logger.info(
                "Entity permanent deletion", deletion_request=deletion_request, current_user=user
            )
            self.store().find_one_and_delete({"_id": deletion_request.id, "user_id": user.user_id})
            return existing_entity
        else:
            self.store().update_one(
                {"_id": deletion_request.id}, {"$set": {"entity_state": "DELETED"}}
            )
            return self.convert_raw_dictionary_to_output_entity(existing_entity)

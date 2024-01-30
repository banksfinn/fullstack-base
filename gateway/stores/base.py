from typing import Any
from schemas.users import UserFromGateway
from schemas.base import (
    EntityGetQuery,
    EntityFromGateway,
    EntityCreateRequest,
    EntityDeleteRequest,
    EntityUpdateRequest,
)
from fastapi import HTTPException, status
from uuid import uuid4, UUID
from pydantic import BaseModel
from datetime import datetime
from structlog import get_logger
from pymongo import MongoClient


class BaseStore:
    collection_name: str
    entity_from_database_model: BaseModel
    entity_from_gateway_model: BaseModel
    db_name = "users"

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

    def convert_database_object_to_gateway_object(self, entity: BaseModel) -> BaseModel:
        """Convert a database model to gateway."""
        # TODO: Test a better conversion between models than a straight model dump
        return self.entity_from_gateway_model(**entity.model_dump())

    def convert_database_raw_dictionary_to_database_object(self, entity: Any) -> BaseModel:
        """Convert a database dict to database model."""
        return self.entity_from_database_model(**entity)

    def convert_database_raw_dictionary_to_gateway_object(self, entity: Any) -> BaseModel:
        """Convert a database dict to gateway model."""
        return self.convert_database_object_to_gateway_object(
            self.entity_from_database_model(**entity)
        )

    # Getting entities

    def handle_get_entities_query_filters(self, query: EntityGetQuery, search: dict[str, Any]):
        # Common filters
        return search

    def get_entities(self, query: EntityGetQuery) -> list[EntityFromGateway]:
        # Create the search
        search: dict[str, Any] = {}

        # Apply entity specific filtering
        search = self.handle_get_entities_query_filters(query, search)

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
        return [self.convert_database_raw_dictionary_to_gateway_object(e) for e in entities]

    # Adding a new entity

    def add_creation_timing_information(
        self, entity_data: dict[str, Any], now: str
    ) -> dict[str, Any]:
        entity_data["created_at"] = now
        entity_data["updated_at"] = now

        return entity_data

    def add_creation_user_information(
        self, entity_data: dict[str, Any], user: UserFromGateway
    ) -> dict[str, Any]:
        entity_data["updated_by"] = user.id
        entity_data["created_by"] = user.id
        entity_data["user_id"] = user.id

        return entity_data

    def add_creation_request_data(
        self, entity_data: dict[str, Any], user: UserFromGateway, now: str
    ) -> dict[str, Any]:
        entity_data = self.add_creation_timing_information(entity_data, now)
        entity_data = self.add_creation_user_information(entity_data, user)

        return entity_data

    def add_creation_request_data_no_user(
        self, entity_data: dict[str, Any], now: str
    ) -> dict[str, Any]:
        entity_data = self.add_creation_timing_information(entity_data, now)

        return entity_data

    def handle_create_entity_mutations(
        self, entity_info: dict[str, Any], user: UserFromGateway
    ) -> dict[str, Any]:
        pass

    def handle_create_entity_mutations_no_user(self, entity_info: dict[str, Any]) -> dict[str, Any]:
        pass

    def create_entity_no_user(
        self, entity_create_request: EntityCreateRequest
    ) -> EntityFromGateway:
        # Store the time, generate the UUID
        now = datetime.now()
        new_id = self.generate_id()

        # Generate the dictionary that we are uploading
        entity_info = entity_create_request.model_dump()
        entity_info["_id"] = new_id

        # Add relevant database info
        self.add_creation_request_data_no_user(entity_info, now)

        # TODO: Turn all defaults into reasonable items, like "" for None on string
        self.handle_create_entity_mutations_no_user(entity_info)

        self.sanitize_database_entity(entity_info)

        # Also a sanity check, to ensure everything going into the database is kosher
        output_entity: BaseModel = self.convert_database_raw_dictionary_to_gateway_object(
            entity_info
        )

        self.store().insert_one(entity_info)

        return output_entity

    def create_entity(
        self, creation_request: EntityCreateRequest, user: UserFromGateway
    ) -> EntityFromGateway:
        # Store the time, generate the UUID
        now = datetime.now()
        new_id = self.generate_id()

        # Generate the dictionary that we are uploading
        entity_info = creation_request.model_dump()
        entity_info["_id"] = new_id

        # Add relevant database info
        self.add_creation_request_data(entity_info, user, now)

        # TODO: Turn all defaults into reasonable items, like "" for None on string
        self.handle_create_entity_mutations(entity_info, user)

        self.sanitize_database_entity(entity_info)

        # Also a sanity check, to ensure everything going into the database is kosher
        output_entity: BaseModel = self.convert_database_raw_dictionary_to_gateway_object(
            entity_info
        )

        self.store().insert_one(entity_info)

        return output_entity

    # Updating an entity

    def add_update_request_data(
        self, entity_data: dict[str, Any], user: UserFromGateway, now: str
    ) -> dict[str, Any]:
        entity_data["updated_by"] = user.user_id
        entity_data["updated_at"] = now

        return entity_data

    def handle_update_entity_mutations(
        self, entity_info: dict[str, Any], user: UserFromGateway
    ) -> dict[str, Any]:
        pass

    def update_entity(
        self, update_request: EntityUpdateRequest, user: UserFromGateway
    ) -> EntityFromGateway:
        # Store the time
        now = datetime.now()

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
        self.add_update_request_data(merged_entity_info, user, now)

        # TODO: Turn all defaults into reasonable items, like "" for None on string
        self.handle_update_entity_mutations(merged_entity_info, user)

        self.sanitize_database_entity(merged_entity_info)

        # Sanity check, to ensure everything going into the database is kosher
        output_entity: BaseModel = self.convert_database_raw_dictionary_to_gateway_object(
            merged_entity_info
        )

        existing_entity = self.store().update_one({"_id": entity_id}, {"$set": merged_entity_info})

        return output_entity

    def delete_entity(
        self, deletion_request: EntityDeleteRequest, user: UserFromGateway
    ) -> EntityFromGateway:
        """Delete an entity"""
        self.logger.info(
            "Entity deletion request", deletion_request=deletion_request, current_user=user
        )
        existing_entity = self.store().find_one_and_delete(
            {"_id": deletion_request.id, "user_id": user.user_id}
        )
        if not existing_entity:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Unable to locate entity with that id",
            )

        output_entity: BaseModel = self.convert_database_raw_dictionary_to_gateway_object(
            existing_entity
        )

        return output_entity

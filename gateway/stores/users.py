from stores.base import BaseStore
from schemas.users import (
    OutputUser,
    DatabaseUser,
    UserCreateRequest,
    GetUsersResponse,
    GetUsersQuery,
)
from typing import Any
from datetime import datetime
from resources.all import EntityState
from core.security import get_password_hash


class UserStore(BaseStore):
    collection_name = "users"
    database_entity = DatabaseUser
    output_entity = OutputUser
    base_response_model = GetUsersResponse
    query = GetUsersQuery
    conflicting_fields = ["display_name", "user_email"]
    require_auth = True

    def _search_query_extras(self, query: GetUsersQuery, search: dict[str, Any]):
        if getattr(query, "display_name", None) is not None:
            search["display_name"] = query.display_name

        if getattr(query, "user_email", None) is not None:
            search["user_email"] = query.user_email

        return super()._search_query_extras(query, search)

    def get_user_from_database_by_email(self, user_email: str) -> OutputUser | None:
        """Get the requested user via email."""
        entity = self.store().find_one({"user_email": user_email})
        if entity:
            return self.convert_raw_dictionary_to_output_entity(entity)

    def get_user_from_gateway_by_email(self, user_email: str) -> OutputUser | None:
        """Get the requested user via email."""
        entity = self.store().find_one({"user_email": user_email})
        if entity:
            return self.convert_raw_dictionary_to_output_entity(entity)

    def get_user_from_database_by_display_name(self, display_name: str) -> DatabaseUser | None:
        """Get the requested user via display name."""
        entity = self.store().find_one({"display_name": display_name})
        if entity:
            return DatabaseUser(**entity)

    def get_user_from_gateway_by_id(self, user_id: str) -> DatabaseUser | None:
        """Get the requested user via ID."""
        entity = self.store().find_one({"_id": user_id})
        if entity:
            return DatabaseUser(**entity)

    def handle_remove_password(self, entity_info: dict[str:Any]):
        # Populate with reasonable defaults
        entity_info["hashed_password"] = get_password_hash(entity_info["password"])
        del entity_info["password"]
        return entity_info

    def register_user(self, creation_request: UserCreateRequest) -> OutputUser:
        # Store the time, generate the UUID
        now = datetime.now()

        self.check_for_conflicts(creation_request)

        new_id = self.generate_id()

        # Generate the dictionary that we are uploading
        entity_info = creation_request.model_dump()
        entity_info["_id"] = new_id
        entity_info["created_at"] = now
        entity_info["updated_at"] = now
        entity_info["updated_by"] = new_id
        entity_info["created_by"] = new_id
        entity_info["user_id"] = new_id
        entity_info["entity_state"] = EntityState.ACTIVE

        self.handle_remove_password(entity_info)

        self.sanitize_database_entity(entity_info)

        # Also a sanity check, to ensure everything going into the database is kosher
        database_entity = self.convert_raw_dictionary_to_database_entity(entity_info)
        output_entity = self.convert_database_entity_to_output_entity(database_entity)

        self.store().insert_one(database_entity.model_dump(by_alias=True))

        return output_entity


user_store = UserStore()

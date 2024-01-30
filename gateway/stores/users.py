from stores.base import BaseStore
from schemas.users import (
    UserFromGateway,
    UserFromDatabase,
    UserGetQuery,
    UserCreateRequest,
    UserDeleteRequest,
    UserUpdateRequest,
)
from typing import Any
from fastapi import HTTPException
from core.security import get_password_hash


class UserStore(BaseStore):
    collection_name = "users"
    entity_from_database_model = UserFromDatabase
    entity_from_gateway_model = UserFromGateway

    def get_users(self, query: UserGetQuery) -> list[UserFromGateway]:
        """Get the requested users."""
        return self.get_entities(query)

    def get_user_from_database_by_email(self, user_email: str) -> UserFromGateway | None:
        """Get the requested user via email."""
        entity = self.store().find_one({"user_email": user_email})
        if entity:
            return self.convert_database_raw_dictionary_to_database_object(entity)

    def get_user_from_gateway_by_email(self, user_email: str) -> UserFromGateway | None:
        """Get the requested user via email."""
        entity = self.store().find_one({"user_email": user_email})
        if entity:
            return self.convert_database_raw_dictionary_to_gateway_object(entity)

    def get_user_from_database_by_display_name(self, display_name: str) -> UserFromDatabase | None:
        """Get the requested user via display name."""
        entity = self.store().find_one({"display_name": display_name})
        if entity:
            return UserFromDatabase(**entity)

    def get_user_from_gateway_by_id(self, user_id: str) -> UserFromDatabase | None:
        """Get the requested user via ID."""
        entity = self.store().find_one({"_id": user_id})
        if entity:
            return UserFromDatabase(**entity)

    def handle_create_entity_mutations(
        self, entity_info: dict[str:Any], current_user: UserFromGateway
    ):
        # Populate with reasonable defaults
        entity_info["hashed_password"] = get_password_hash(entity_info["password"])
        del entity_info["password"]
        return entity_info

    def handle_create_entity_mutations_no_user(self, entity_info: dict[str:Any]):
        # Populate with reasonable defaults
        entity_info["hashed_password"] = get_password_hash(entity_info["password"])
        del entity_info["password"]
        return entity_info

    def add_creation_request_data_no_user(
        self, entity_data: dict[str, Any], now: str
    ) -> dict[str, Any]:
        entity_data = self.add_creation_timing_information(entity_data, now)
        entity_data["updated_by"] = entity_data["_id"]
        entity_data["created_by"] = entity_data["_id"]
        # Easier to store it twice than deal with validation issues
        entity_data["user_id"] = entity_data["_id"]

        return entity_data

    def create_user(
        self, user_request: UserCreateRequest, current_user: UserFromGateway
    ) -> UserFromGateway:
        """Create the requested user."""
        return self.create_entity(user_request, current_user)

    def register_user(self, user_create_request: UserCreateRequest) -> UserFromGateway:
        """Register the requested user."""
        user = self.get_user_from_database_by_email(user_email=user_create_request.user_email)
        if user:
            raise HTTPException(
                status_code=400,
                detail="The user with this email already exists in the system.",
            )

        user = user_store.get_user_from_database_by_display_name(
            display_name=user_create_request.display_name
        )

        if user:
            raise HTTPException(
                status_code=400,
                detail="The user with this display name already exists in the system.",
            )

        return self.create_entity_no_user(user_create_request)

    def update_user(
        self, user_update_request: UserUpdateRequest, current_user: UserFromGateway
    ) -> UserFromGateway:
        """Update the requested user."""
        return self.update_entity(user_update_request, current_user)

    def delete_user(
        self, user_delete_request: UserDeleteRequest, current_user: UserFromGateway
    ) -> UserFromGateway:
        """Delete the requested user."""
        return self.delete_entity(user_delete_request, current_user)


user_store = UserStore()

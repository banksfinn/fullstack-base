from stores.base import BaseStore
from schemas.users import User, UserFromDatabase, GetUsersQuery, CreateUserRequest
from typing import Any
from core.security import get_password_hash


class UserStore(BaseStore):
    collection_name = "users"
    entity_from_database_model = UserFromDatabase
    entity_from_gateway_model = User

    def get_users(self, query: GetUsersQuery) -> list[User]:
        """Get the requested users."""
        return self.get_entities(query)

    def get_user_by_email(self, user_email: str) -> User | None:
        """Get the requested user."""
        entity = self.store().find_one({"email": user_email})

        if entity:
            return self.convert_database_to_gateway(UserFromDatabase(**entity))

    def get_user_by_id(self, user_id: str) -> UserFromDatabase | None:
        """Get the requested user."""
        entity = self.store().find_one({"_id": user_id})
        if entity:
            return self.convert_database_to_gateway(UserFromDatabase(**entity))

    def handle_create_entity_mutations(self, entity_info: dict[str:Any], current_user: User):
        # Populate with reasonable defaults
        entity_info["hashed_password"] = get_password_hash(entity_info["password"])
        del entity_info["password"]
        return entity_info

    def add_creation_user_information(self, entity_data: dict[str, Any], current_user: User):
        entity_data["updated_by"] = entity_data["_id"]
        entity_data["created_by"] = entity_data["_id"]
        # Easier to store it twice than deal with validation issues
        entity_data["user_id"] = entity_data["_id"]
        return entity_data

    def create_user(self, user_request: CreateUserRequest) -> User:
        """Create the requested article."""
        return self.create_entity(user_request, None)


user_store = UserStore()

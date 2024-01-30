from pydantic import Field
from schemas.base import Entity, GetEntitiesQuery, CreateEntityRequest, UpdateEntityRequest


class User(Entity):
    """A user in the system."""

    email: str = Field(description="The email of the user")
    transaction_refresh_interval_minutes: int = Field(
        description="The refresh rate of transactions"
    )

    account_refresh_interval_minutes: int = Field(description="The refresh rate of accounts")


class CreateUserRequest(CreateEntityRequest):
    pass


class UpdateUserRequest(UpdateEntityRequest):
    pass


class UserFromDatabase(User):
    """An entity as represented in a database."""

    # Include in here all fields that are stored that we don't pass along from the API
    pass


class GetUsersQuery(GetEntitiesQuery):
    """Query for fetching users."""

    pass

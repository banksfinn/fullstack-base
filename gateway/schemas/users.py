from pydantic import BaseModel, Field
from schemas.base import (
    DatabaseEntity,
    GetEntitiesQuery,
    OutputEntity,
    EntityUpdateRequest,
    EntityCreateRequest,
    EntityDeleteRequest,
    GetEntitiesResponse,
)


# Base Objects
class DatabaseUser(DatabaseEntity):
    display_name: str = Field(description="The display name of the user")
    user_email: str = Field(description="The email of the user")
    hashed_password: str = Field(description="The stored and hashed password of the user")


class OutputUser(OutputEntity):
    display_name: str = Field(description="The display name of the user")
    user_email: str = Field(description="The email of the user")
    hashed_password: str = Field(description="The stored and hashed password of the user")


# Inbound Requests
class UserCreateRequest(EntityCreateRequest):
    display_name: str = Field(description="The display name of the user")
    user_email: str = Field(description="The email of the user")
    password: str = Field(description="The password (to be hashed and stored)")


# Inbound Requests
class UserLoginRequest(BaseModel):
    user_email: str = Field(description="The email of the user")
    password: str = Field(description="The password of the user")


class UserUpdateRequest(EntityUpdateRequest):
    display_name: str | None = Field(description="The display name of the user", default=None)
    password: str | None = Field(description="The new password of the user", default=None)


class UserDeleteRequest(EntityDeleteRequest):
    pass


class UserDeleteRequestByEmail(BaseModel):
    user_email: str = Field(description="The display name of the user to delete")


class GetUsersQuery(GetEntitiesQuery):
    pass


GetUsersResponse = GetEntitiesResponse[OutputUser]

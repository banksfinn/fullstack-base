from pydantic import BaseModel, Field
from datetime import datetime


# I think this should be all fields
class Entity(BaseModel):
    id: str = Field(description="The ID of the entity")
    user_id: str = Field(description="The user id who owns this entity")


# Entity as represented in the database
class EntityFromDatabase(BaseModel):
    id: str = Field(description="The ID of the entity")
    updated_at: datetime = Field(description="The time that this entity was last updated")
    created_at: datetime = Field(description="The time that this entity was created")
    user_id: str = Field(description="The user id who owns this entity")


# This is required for creating an entity
class CreateEntityRequest(BaseModel):
    pass


# This is required for updating an entity
class UpdateEntityRequest(BaseModel):
    id: str = Field(description="The ID of the entity to update")


class DeleteEntityRequest(BaseModel):
    id: str = Field(description="The ID of the entity to delete")


class GetEntitiesQuery(BaseModel):
    offset: int = Field(
        title="Offset",
        description="How many offset items from the beginning to skip",
        default=0,
    )
    limit: int = Field(
        title="Limit",
        description="The number of items to return with the response",
        default=50,
    )
    user_id: str = Field(title="User ID", description="Filter by this user ID")

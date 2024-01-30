from pydantic import BaseModel, Field
from datetime import datetime
from uuid import UUID


class EntityFromDatabase(BaseModel):
    id: str = Field(description="The ID of the entity", alias="_id")
    created_at: datetime = Field(description="The time that this article was created")
    updated_by: str = Field(description="The user id who last updated this article")
    updated_at: datetime = Field(description="The time that this article was last updated")
    created_by: str = Field(description="The user id who created this article")

    user_id: str = Field(description="The user who created this entity")


class EntityFromGateway(BaseModel):
    id: str = Field(description="The ID of the entity")
    user_id: str = Field(description="The user who created this entity")


class EntityUpdateRequest(BaseModel):
    id: UUID = Field(description="The ID of the entity being updated")


class EntityDeleteRequest(BaseModel):
    id: UUID = Field(description="The ID of the entity being updated")


class EntityCreateRequest(BaseModel):
    pass


class EntityGetQuery(BaseModel):
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
    user_id: str | None = Field(
        title="User ID", description="Filter by this specific user ID", default=None
    )

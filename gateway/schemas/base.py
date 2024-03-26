from pydantic import BaseModel, Field
from datetime import datetime
from resources.all import EntityState
from typing import Literal, Generic, TypeVar

Item = TypeVar("Item")


class GetEntitiesResponse(BaseModel, Generic[Item]):
    """Response class with items and metadata"""

    items: list[Item] = Field(description="The list of items requested.")


class DatabaseEntity(BaseModel):
    id: str = Field(description="The UUID of the entity", alias="_id")
    created_at: datetime = Field(description="The time that this article was created")
    updated_by: str = Field(description="The user id who last updated this article")
    updated_at: datetime = Field(description="The time that this article was last updated")
    created_by: str = Field(description="The user id who created this article")

    user_id: str = Field(description="The user who created this entity")

    entity_state: EntityState = Field(description="The state of the entity")


class OutputEntity(BaseModel):
    id: str = Field(description="The UUID of the entity")
    user_id: str = Field(description="The user who created this entity")
    entity_state: EntityState = Field(description="The state of the entity")
    created_at: datetime = Field(description="The time that this article was created")
    updated_at: datetime = Field(description="The time that this article was last updated")


class EntityUpdateRequest(BaseModel):
    id: str = Field(description="The UUID of the entity being updated")


class EntityDeleteRequest(BaseModel):
    id: str = Field(description="The UUID of the entity being updated")


class EntityCreateRequest(BaseModel):
    pass


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
    direction: Literal["asc", "desc"] = Field(
        title="Direction", description="Sort by ascending or descending order.", default="desc"
    )
    order_by: str = Field(
        title="Order By", description="Sort by this property.", default="created_at"
    )
    user_id: str | None = Field(
        title="User ID", description="Filter by this specific user ID", default=None
    )

    entity_state: EntityState | None = Field(
        description="The state of the entity", default=EntityState.ACTIVE
    )

    apply_user_filter: bool = Field(description="Should we filter by user id", default=True)

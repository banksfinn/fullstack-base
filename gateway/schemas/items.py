from pydantic import Field
from schemas.base import (
    OutputEntity,
    EntityCreateRequest,
    GetEntitiesQuery,
    DatabaseEntity,
    EntityUpdateRequest,
    EntityDeleteRequest,
    GetEntitiesResponse,
)


class OutputItem(OutputEntity):
    label: str = Field(description="The label of the item")
    raw_label: str = Field(description="The original label")


class DatabaseItem(DatabaseEntity):
    label: str = Field(description="The label of the item")
    raw_label: str = Field(description="The original label")


class ItemCreateRequest(EntityCreateRequest):
    raw_label: str = Field(description="The original label")


class ItemUpdateRequest(EntityUpdateRequest):
    label: str | None = Field(description="The new label of the item", default=None)


class ItemDeleteRequest(EntityDeleteRequest):
    pass


class GetItemsQuery(GetEntitiesQuery):
    pass


GetItemsResponse = GetEntitiesResponse[OutputItem]

from pydantic import Field
from resources.all import ItemType
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
    item_type: ItemType = Field(description="The type of the item")


class DatabaseItem(DatabaseEntity):
    label: str = Field(description="The label of the item")
    raw_label: str = Field(description="The original label")
    item_type: ItemType = Field(description="The type of the item")


class ItemCreateRequest(EntityCreateRequest):
    raw_label: str = Field(description="The original label")
    item_type: ItemType = Field(description="The type of the item")


class ItemUpdateRequest(EntityUpdateRequest):
    label: str | None = Field(description="The new label of the item", default=None)
    item_type: ItemType | None = Field(description="The type of the item", default=None)


class ItemDeleteRequest(EntityDeleteRequest):
    pass


class GetItemsQuery(GetEntitiesQuery):
    label: str | None = Field(description="Filter by this label.", default=None)
    item_type: ItemType | None = Field(description="Filter by this item type.", default=None)


GetItemsResponse = GetEntitiesResponse[OutputItem]

from pydantic import Field
from schemas.base import (
    Entity,
    CreateEntityRequest,
    GetEntitiesQuery,
    EntityFromDatabase,
    UpdateEntityRequest,
    DeleteEntityRequest,
)


class Item(Entity):
    label: str = Field(description="The label of the item")


class ItemFromDatabase(EntityFromDatabase):
    pass


class CreateItemRequest(CreateEntityRequest):
    raw_label: str = Field(description="The original label")


class UpdateItemRequest(UpdateEntityRequest):
    pass


class DeleteItemRequest(DeleteEntityRequest):
    pass


class GetItemsQuery(GetEntitiesQuery):
    pass

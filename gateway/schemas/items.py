from pydantic import Field
from schemas.base import (
    EntityFromGateway,
    EntityCreateRequest,
    EntityGetQuery,
    EntityFromDatabase,
    EntityUpdateRequest,
    EntityDeleteRequest,
)


class ItemFromGateway(EntityFromGateway):
    label: str = Field(description="The label of the item")


class ItemFromDatabase(EntityFromDatabase):
    pass


class ItemCreateRequest(EntityCreateRequest):
    raw_label: str = Field(description="The original label")


class ItemUpdateRequest(EntityUpdateRequest):
    pass


class ItemDeleteRequest(EntityDeleteRequest):
    pass


class ItemGetQuery(EntityGetQuery):
    pass

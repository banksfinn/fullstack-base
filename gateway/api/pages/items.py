from fastapi import APIRouter, Depends
from stores.items import item_store
from schemas.items import (
    ItemGetQuery,
    ItemFromGateway,
    ItemCreateRequest,
    ItemUpdateRequest,
    ItemDeleteRequest,
)
from api.deps import (
    CurrentUserDependency,
)

router = APIRouter()


@router.get("/items")
def get_items(
    get_items_query: ItemGetQuery = Depends(),
) -> list[ItemFromGateway]:
    """
    Retrieve items.
    """
    return item_store.get_items(get_items_query)


@router.post("/items")
def create_item(
    item_create_request: ItemCreateRequest, current_user: CurrentUserDependency
) -> ItemFromGateway:
    """Create an item."""
    return item_store.create_item(item_create_request, current_user=current_user)


@router.patch("/items")
def update_item(
    item_update_request: ItemUpdateRequest, current_user: CurrentUserDependency
) -> ItemFromGateway:
    """Create an item."""
    return item_store.update_item(item_update_request, current_user=current_user)


@router.delete("/items")
def delete_item(
    item_delete_request: ItemDeleteRequest, current_user: CurrentUserDependency
) -> ItemFromGateway:
    """Create an item."""
    return item_store.delete_item(item_delete_request, current_user=current_user)

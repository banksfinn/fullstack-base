from fastapi import APIRouter, Depends
from stores.items import item_store
from schemas.items import (
    GetItemsQuery,
    OutputItem,
    ItemCreateRequest,
    ItemUpdateRequest,
    ItemDeleteRequest,
    GetItemsResponse,
)
from api.deps import (
    CurrentUserDependency,
)

router = APIRouter()


@router.get("/items", tags=["items"])
def get_items(
    current_user: CurrentUserDependency,
    get_items_query: GetItemsQuery = Depends(),
) -> GetItemsResponse:
    """
    Retrieve items.
    """
    return item_store.search(get_items_query, current_user)


@router.post("/items", tags=["items"])
def create_item(
    item_create_request: ItemCreateRequest, current_user: CurrentUserDependency
) -> OutputItem:
    """Create an item."""
    return item_store.create(item_create_request, current_user)


@router.patch("/items", tags=["items"])
def update_item(
    item_update_request: ItemUpdateRequest, current_user: CurrentUserDependency
) -> OutputItem:
    """Create an item."""
    return item_store.update(item_update_request, current_user)


@router.delete("/items", tags=["items"])
def delete_item(
    item_delete_request: ItemDeleteRequest, current_user: CurrentUserDependency
) -> OutputItem:
    """Create an item."""
    return item_store.delete(item_delete_request, current_user)

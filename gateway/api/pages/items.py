from fastapi import APIRouter, Depends
from stores.items import item_store
from schemas.items import (
    GetItemsQuery,
    Item,
    CreateItemRequest,
    UpdateItemRequest,
)
from api.deps import (
    CurrentUserDependency,
)

router = APIRouter()


@router.get("/items")
def get_items(
    get_items_query: GetItemsQuery = Depends(),
) -> list[Item]:
    """
    Retrieve items.
    """
    return item_store.get_items(get_items_query)


@router.post("/items")
def create_item(
    create_item_request: CreateItemRequest, current_user: CurrentUserDependency
) -> Item:
    """Create an item."""
    return item_store.create_item(create_item_request, current_user=current_user)


@router.patch("/items")
def update_item(
    update_item_request: UpdateItemRequest, current_user: CurrentUserDependency
) -> Item:
    """Create an item."""
    return item_store.update_item(update_item_request, current_user=current_user)

from stores.base import BaseStore
from schemas.items import (
    Item,
    CreateItemRequest,
    ItemFromDatabase,
    GetItemsQuery,
    UpdateItemRequest,
    DeleteItemRequest,
)
from schemas.users import User
from typing import Any


class ItemStore(BaseStore):
    collection_name = "items"
    entity_from_database_model = ItemFromDatabase
    entity_from_gateway_model = Item

    def get_items(self, get_items_query: GetItemsQuery) -> list[ItemFromDatabase]:
        """Get the requested items."""
        return self.get_entities(get_items_query)

    def handle_get_entities_query_filters(self, query: GetItemsQuery, search):
        # Apply specific searches
        return search

    def handle_create_entity_mutations(self, entity_info: dict[str:Any], user: User):
        # Populate with reasonable defaults
        return entity_info

    def handle_update_entity_mutations(self, entity_info: dict[str:Any], user: User):
        # Nothing special here yet
        return entity_info

    def create_item(self, item_creation_request: CreateItemRequest, user: User) -> Item:
        """Create the requested item."""
        return self.create_entity(item_creation_request, user)

    def update_item(self, item_update_request: UpdateItemRequest, user: User) -> Item:
        """Update the requested item."""
        return self.update_entity(item_update_request, user)

    def delete_item(self, item_delete_request: DeleteItemRequest, user: User) -> Item:
        """Delete the requested item"""
        self.delete_entity(item_delete_request, user)


item_store = ItemStore()

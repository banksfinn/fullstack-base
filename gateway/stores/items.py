from stores.base import BaseStore
from schemas.items import (
    ItemCreateRequest,
    ItemFromDatabase,
    ItemFromGateway,
    ItemGetQuery,
    ItemUpdateRequest,
    ItemDeleteRequest,
)
from schemas.users import UserFromGateway
from typing import Any


class ItemStore(BaseStore):
    collection_name = "items"
    entity_from_database_model = ItemFromDatabase
    entity_from_gateway_model = ItemFromGateway

    def get_items(self, get_items_query: ItemGetQuery) -> list[ItemFromDatabase]:
        """Get the requested items."""
        return self.get_entities(get_items_query)

    def handle_get_entities_query_filters(self, query: ItemGetQuery, search):
        # Apply specific searches
        return search

    def handle_create_entity_mutations(self, entity_info: dict[str:Any], user: UserFromGateway):
        # Populate with reasonable defaults
        return entity_info

    def handle_update_entity_mutations(self, entity_info: dict[str:Any], user: UserFromGateway):
        # Nothing special here yet
        return entity_info

    def create_item(
        self, item_creation_request: ItemCreateRequest, user: UserFromGateway
    ) -> ItemFromGateway:
        """Create the requested item."""
        return self.create_entity(item_creation_request, user)

    def update_item(
        self, item_update_request: ItemUpdateRequest, user: UserFromGateway
    ) -> ItemFromGateway:
        """Update the requested item."""
        return self.update_entity(item_update_request, user)

    def delete_item_by_email(
        self, item_delete_request: ItemDeleteRequest, user: UserFromGateway
    ) -> ItemFromGateway:
        """Delete the requested item"""
        self.delete_entity(item_delete_request, user)


item_store = ItemStore()

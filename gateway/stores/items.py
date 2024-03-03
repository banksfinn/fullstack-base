from stores.base import BaseStore
from schemas.items import (
    DatabaseItem,
    OutputItem,
    GetItemsQuery,
    GetItemsResponse,
)
from typing import Any


class ItemStore(BaseStore):
    collection_name = "items"
    database_entity = DatabaseItem
    output_entity = OutputItem
    base_response_model = GetItemsResponse
    query = GetItemsQuery
    require_auth = True

    def _create_mutation_extras(self, entity_info: dict[str, Any]) -> dict[str, Any]:
        entity_info["label"] = entity_info["raw_label"]
        return entity_info

    def _search_query_extras(self, query: GetItemsQuery, search: dict[str, Any]):
        if getattr(query, "label", None) is not None:
            search["label"] = query.label

        return super()._search_query_extras(query, search)


item_store = ItemStore()

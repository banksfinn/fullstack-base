from stores.base import BaseStore


def test_create_document():
    """Test creating a document."""
    test_store = BaseStore()
    response = test_store.create_document("test_id")

    assert response == "less"

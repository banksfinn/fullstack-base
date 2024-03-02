"""Test the base store."""
from unittest.mock import Mock


def create_test_store():
    """Sample store."""
    return Mock()


def test_sanitize_database_entity_basic():
    """Basic test."""
    store = create_test_store()

from typing import Literal
from structlog import get_logger
from core.config import settings


class ExampleClient:
    client_id: str = settings.EXAMPLE_CLIENT_ID
    client_secret: str = settings.EXAMPLE_CLIENT_SECRET
    environment: Literal["sandbox", "production"] = settings.ENVIRONMENT

    def __init__(self):
        """Initialize the client."""
        self.logger = get_logger()
        # Create the client


example_client = ExampleClient()

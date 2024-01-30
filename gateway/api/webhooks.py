from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter()


class ExampleSyncUpdate(BaseModel):
    webhook_type: str = Field(description="The type of webhook")
    webhook_code: str = Field(description="The code of the webhook")


@router.post("/webhook/example")
def handle_example_webhook_sync(example_sync_update: ExampleSyncUpdate):
    """Handle a webhook sync."""
    # Handle the sync
    return

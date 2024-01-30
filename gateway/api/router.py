from fastapi import APIRouter

from api.pages import items
from api.pages import users
from api.pages import login
from api import webhooks

api_router = APIRouter()
api_router.include_router(webhooks.router)
api_router.include_router(users.router, tags=["users"])
api_router.include_router(items.router, tags=["items"])
api_router.include_router(login.router)

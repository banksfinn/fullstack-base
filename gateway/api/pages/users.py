from fastapi import APIRouter

from api.deps import (
    CurrentUserDependency,
)
from stores.users import user_store
from schemas.users import User, GetUsersQuery

router = APIRouter()


@router.get("/users")
def get_users(query: GetUsersQuery) -> list[User]:
    """
    Retrieve users.
    """
    return user_store.get_users(query)


@router.get("/me")
def get_current_user(current_user: CurrentUserDependency) -> User:
    return current_user

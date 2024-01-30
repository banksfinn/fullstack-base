from fastapi import APIRouter, Depends

from api.deps import (
    CurrentUserDependency,
)
from stores.users import user_store
from schemas.users import UserFromGateway, UserGetQuery, UserDeleteRequest

router = APIRouter()


@router.get("/users")
def get_users(query: UserGetQuery = Depends()) -> list[UserFromGateway]:
    """
    Retrieve users.
    """
    return user_store.get_users(query)


@router.get("/me")
def get_current_user(current_user: CurrentUserDependency) -> UserFromGateway:
    return current_user


@router.delete("/users")
def delete_user(
    user_delete_request: UserDeleteRequest, current_user: CurrentUserDependency
) -> UserFromGateway:
    """Create an item."""
    return user_store.delete_user(user_delete_request, current_user=current_user)

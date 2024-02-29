from fastapi import APIRouter, Depends

from api.deps import (
    CurrentUserDependency,
)
from stores.users import user_store
from schemas.users import (
    OutputUser,
    GetUsersQuery,
    UserDeleteRequest,
    UserUpdateRequest,
    GetUsersResponse,
)

router = APIRouter()


@router.get("/users")
def get_users(query: GetUsersQuery = Depends()) -> GetUsersResponse:
    """
    Retrieve users.
    """
    return user_store.search(query)


@router.get("/me")
def get_current_user(current_user: CurrentUserDependency) -> OutputUser:
    return current_user


@router.patch("/users")
def update_user(
    user_update_request: UserUpdateRequest, current_user: CurrentUserDependency
) -> OutputUser:
    """Update a user."""
    return user_store.update_user(user_update_request, current_user=current_user)


@router.delete("/users")
def delete_user(
    user_delete_request: UserDeleteRequest, current_user: CurrentUserDependency
) -> OutputUser:
    """Delete a user."""
    return user_store.delete_user(user_delete_request, current_user=current_user)

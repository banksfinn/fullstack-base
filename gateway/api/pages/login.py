from fastapi import APIRouter, HTTPException
from core.security import verify_password, create_access_token

from schemas.users import (
    UserCreateRequest,
    UserFromGateway,
)
from schemas.auth import SuccessfulLoginResponse, UserLoginRequest
from stores.users import user_store

router = APIRouter()


def authenticate_user(email: str, password: str) -> UserFromGateway | None:
    user = user_store.get_user_by_email(user_email=email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


@router.post("/login/token")
def handle_user_login(user_login_request: UserLoginRequest) -> SuccessfulLoginResponse:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = authenticate_user(user_login_request.user_email, user_login_request.password)

    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    return SuccessfulLoginResponse(
        access_token=create_access_token(str(user.user_id)),
        token_type="bearer",
        user=user,
    )


@router.post("/register")
def handle_register_user(
    user_create_request: UserCreateRequest,
) -> SuccessfulLoginResponse:
    """Create new user."""

    user = user_store.register_user(user_create_request)

    return SuccessfulLoginResponse(
        access_token=create_access_token(str(user.user_id)),
        token_type="bearer",
        user=user,
    )

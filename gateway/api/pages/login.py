from fastapi import APIRouter, HTTPException
from core.security import verify_password, create_access_token

from schemas.users import (
    UserCreateRequest,
    OutputUser,
)
from schemas.auth import SuccessfulLoginResponse, UserLoginRequest
from stores.users import user_store

router = APIRouter()


def authenticate_user(email: str, password: str) -> OutputUser:
    user: OutputUser | None = user_store.get_user_from_gateway_by_email(user_email=email)
    print(user)
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=400, detail="Unable to authenticate user with email: " + email
        )

    return user


@router.post("/login/token")
def handle_user_login(user_login_request: UserLoginRequest) -> SuccessfulLoginResponse:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = authenticate_user(user_login_request.user_email, user_login_request.password)

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

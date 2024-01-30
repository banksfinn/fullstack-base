from typing import Annotated

from fastapi import Depends, HTTPException, status
from jose import jwt
from pydantic import ValidationError

from core import security
from core.config import settings
from stores.users import user_store
from schemas.users import User
from schemas.auth import TokenDependency, DecodedToken


def get_current_user(token: TokenDependency) -> User:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[security.ALGORITHM])
        token = DecodedToken(**payload)
        # token_data = TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )

    user = user_store.get_user_by_id(token.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


CurrentUserDependency = Annotated[User, Depends(get_current_user)]
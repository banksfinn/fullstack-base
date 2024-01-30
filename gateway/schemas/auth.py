from pydantic import BaseModel, Field
from schemas.users import User
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from fastapi import Depends


class UserLoginRequest(BaseModel):
    user_email: str = Field(description="The email for login")
    password: str = Field(description="The password for the user")


class SuccessfulLoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: User = Field(description="The user who has just logged in")


class DecodedToken(BaseModel):
    user_id: str | None = None


reusable_oauth2 = OAuth2PasswordBearer(tokenUrl="/login/token")
TokenDependency = Annotated[str, Depends(reusable_oauth2)]

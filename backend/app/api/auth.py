
from fastapi import APIRouter, HTTPException, status
from app.models.schemas import UserLogin, UserRegister, Token

router = APIRouter()

# Mock Database
FAKE_USERS_DB = {
    "admin": {"username": "admin", "password": "password123", "role": "Senior Architect"},
    "analyst": {"username": "analyst", "password": "securepass", "role": "SecOps Analyst"}
}

@router.post("/login", response_model=Token)
async def login(user_in: UserLogin):
    user = FAKE_USERS_DB.get(user_in.username)
    
    if not user or user["password"] != user_in.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    
    # In a real app, generate a real JWT here using python-jose
    return {
        "access_token": "fake-jwt-token-xyz-123",
        "token_type": "bearer",
        "user_profile": {
            "name": user["username"].upper(),
            "role": user["role"],
            "avatar": ""
        }
    }

@router.post("/register")
async def register(user_in: UserRegister):
    if user_in.username in FAKE_USERS_DB:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # Mock registration
    FAKE_USERS_DB[user_in.username] = {
        "username": user_in.username,
        "password": user_in.password,
        "role": user_in.role
    }
    
    return {"message": "User registered successfully"}


from fastapi import APIRouter
from typing import List
from app.models.schemas import ThreatEvent
from app.services.mock_engine import MockEngine

router = APIRouter()

@router.get("/", response_model=List[ThreatEvent])
async def get_alerts():
    """
    Retrieve active alerts from the backend.
    In the future, this will query a TimescaleDB or PostgreSQL database.
    """
    return MockEngine.generate_mock_alerts()

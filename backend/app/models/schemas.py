
from pydantic import BaseModel
from typing import List, Optional, Any

# --- Auth Schemas ---
class UserLogin(BaseModel):
    username: str
    password: str

class UserRegister(BaseModel):
    username: str
    email: str
    password: str
    role: Optional[str] = "Analyst"

class Token(BaseModel):
    access_token: str
    token_type: str
    user_profile: dict

# --- Detection Input Schemas ---
class WifiScanData(BaseModel):
    ssid: str
    bssid: str
    rssi: int
    encryption: str

class RogueApData(BaseModel):
    ssid: str
    bssid: str
    vendor_oui: str
    security_protocol: str

class MitmData(BaseModel):
    gateway_mac: str
    certificate_issuer: str
    dns_server: str
    latency_ms: float

class AppScanData(BaseModel):
    package_name: str
    app_name: str
    permissions: List[str]
    api_calls: List[str]

class NetworkAnomalyData(BaseModel):
    timestamp: str
    bytes_in: int
    bytes_out: int
    protocol_distribution: dict

# --- Response Schemas ---
class DetectionResult(BaseModel):
    module: str
    status: str  # 'safe', 'warning', 'critical'
    risk_score: float # 0.0 to 1.0
    details: str
    timestamp: str
    recommendation: Optional[str] = None

class ThreatEvent(BaseModel):
    id: str
    timestamp: int
    type: str
    severity: str
    description: str
    device: str
    status: str

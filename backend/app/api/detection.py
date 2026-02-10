
from fastapi import APIRouter
from app.models.schemas import (
    WifiScanData, RogueApData, MitmData, AppScanData, NetworkAnomalyData, DetectionResult
)
from app.services.mock_engine import MockEngine
from datetime import datetime

router = APIRouter()

@router.post("/wifi", response_model=DetectionResult)
async def detect_wifi_threats(data: WifiScanData):
    score, status, details = MockEngine.detect_wifi_anomaly(data.rssi, data.encryption)
    
    return {
        "module": "WiFi Sentry",
        "status": status,
        "risk_score": score,
        "details": details,
        "timestamp": datetime.now().isoformat(),
        "recommendation": "Disconnect immediately if network is unknown." if score > 0.5 else "No action needed."
    }

@router.post("/rogue-ap", response_model=DetectionResult)
async def detect_rogue_ap(data: RogueApData):
    score, status, details = MockEngine.detect_rogue_ap(data.ssid, data.bssid, data.vendor_oui)
    
    return {
        "module": "Rogue AP Detector",
        "status": status,
        "risk_score": score,
        "details": details,
        "timestamp": datetime.now().isoformat()
    }

@router.post("/mitm", response_model=DetectionResult)
async def detect_mitm(data: MitmData):
    score, status, details = MockEngine.detect_mitm(data.gateway_mac, data.certificate_issuer)
    
    return {
        "module": "MITM Guard",
        "status": status,
        "risk_score": score,
        "details": details,
        "timestamp": datetime.now().isoformat()
    }

@router.post("/malware", response_model=DetectionResult)
async def detect_malware(data: AppScanData):
    score, status, details = MockEngine.detect_malware(data.permissions)
    
    return {
        "module": "App Shield",
        "status": status,
        "risk_score": score,
        "details": details,
        "timestamp": datetime.now().isoformat(),
        "recommendation": "Uninstall application immediately." if score > 0.7 else None
    }

@router.post("/anomaly", response_model=DetectionResult)
async def detect_network_anomaly(data: NetworkAnomalyData):
    score, status, details = MockEngine.detect_network_anomaly(data.bytes_out)
    
    return {
        "module": "Network LSTM",
        "status": status,
        "risk_score": score,
        "details": details,
        "timestamp": datetime.now().isoformat()
    }

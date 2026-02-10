
import random
import time
import uuid
from datetime import datetime

class MockEngine:
    """
    Simulates ML inference. 
    In the future, replace these methods with calls to TensorFlow/PyTorch models.
    """

    @staticmethod
    def detect_wifi_anomaly(rssi: int, encryption: str):
        # Logic: Weak encryption or super strong signal (possible Evil Twin) = Risk
        time.sleep(0.1) # Simulate inference latency
        
        if encryption == "OPEN" or encryption == "WEP":
            return 0.85, "critical", "Insecure Encryption Detected (OPEN/WEP)"
        
        if rssi > -30:
            return 0.65, "warning", "Abnormally strong signal source (Proximity Alert)"
            
        return 0.05, "safe", "WiFi connection appears secure"

    @staticmethod
    def detect_rogue_ap(ssid: str, bssid: str, vendor: str):
        # Logic: Simulation of OUI mismatch
        time.sleep(0.2)
        
        # Mock logic: if vendor is 'Unknown' or 'Raspberry Pi', flag it
        if "Raspberry" in vendor or "Unknown" in vendor:
            return 0.95, "critical", f"Hardware Signature Mismatch: {vendor}"
            
        return 0.1, "safe", "AP Vendor matches historical profile"

    @staticmethod
    def detect_mitm(gateway_mac: str, cert_issuer: str):
        time.sleep(0.3)
        
        if "Self-Signed" in cert_issuer or "Debug" in cert_issuer:
            return 0.98, "critical", "Untrusted Certificate Authority intercepted"
            
        return 0.1, "safe", "SSL Chain of Trust verified"

    @staticmethod
    def detect_malware(permissions: list):
        time.sleep(0.5) # Heavier model simulation
        
        risk_perms = ["SEND_SMS", "SYSTEM_ALERT_WINDOW", "BIND_ACCESSIBILITY_SERVICE"]
        detected = [p for p in permissions if p in risk_perms]
        
        if len(detected) >= 2:
            return 0.88, "critical", f"High-risk permission combination: {', '.join(detected)}"
        elif len(detected) == 1:
            return 0.45, "warning", f"Suspicious permission: {detected[0]}"
            
        return 0.02, "safe", "App signature matches trusted whitelist"

    @staticmethod
    def detect_network_anomaly(bytes_out: int):
        # Logic: Exfiltration detection
        if bytes_out > 50000: # Arbitrary threshold for demo
            return 0.90, "critical", "Data exfiltration spike detected (>50MB upload)"
        
        return 0.15, "safe", "Traffic volume within baseline"

    @staticmethod
    def generate_mock_alerts():
        return [
            {
                "id": f"evt-{str(uuid.uuid4())[:8]}",
                "timestamp": int(time.time() * 1000) - 360000,
                "type": "Malicious Application",
                "severity": "HIGH",
                "description": "App 'Flashlight Pro' requested Accessibility Services.",
                "device": "Pixel 7 Pro",
                "status": "active",
                "details": {"pkg": "com.sus.flashlight"}
            },
            {
                "id": f"evt-{str(uuid.uuid4())[:8]}",
                "timestamp": int(time.time() * 1000) - 7200000,
                "type": "Suspicious WiFi",
                "severity": "MEDIUM",
                "description": "Connected to open network 'Starbucks_Free'.",
                "device": "Galaxy S23",
                "status": "resolved",
                "details": {"ssid": "Starbucks_Free"}
            }
        ]

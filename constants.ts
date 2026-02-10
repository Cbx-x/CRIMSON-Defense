import { ThreatEvent, ThreatType, Severity, DeviceStatus, AppScanResult, NetworkPacket } from './types';

export const MOCK_DEVICES: DeviceStatus[] = [
  { id: 'dev-001', name: 'Pixel 7 Pro - CEO', status: 'online', battery: 82, lastSeen: Date.now(), ip: '10.0.0.45', wifiSSID: 'Corp_Secure_5G' },
  { id: 'dev-002', name: 'Galaxy S23 - Sales', status: 'compromised', battery: 45, lastSeen: Date.now() - 3000, ip: '192.168.1.104', wifiSSID: 'Free_Airport_WiFi' },
  { id: 'dev-003', name: 'Pixel 6a - Dev', status: 'online', battery: 12, lastSeen: Date.now(), ip: '10.0.0.52', wifiSSID: 'Corp_Secure_5G' },
  { id: 'dev-004', name: 'OnePlus 11 - HR', status: 'offline', battery: 0, lastSeen: Date.now() - 86400000, ip: '10.0.0.12', wifiSSID: 'Home_Net' },
  { id: 'dev-005', name: 'Galaxy Tab S8 - Kiosk', status: 'online', battery: 99, lastSeen: Date.now(), ip: '10.0.0.200', wifiSSID: 'Corp_Guest' },
];

export const MOCK_THREATS: ThreatEvent[] = [
  {
    id: 'thr-8823',
    timestamp: Date.now() - 120000,
    type: ThreatType.MITM,
    severity: Severity.CRITICAL,
    description: 'ARP Spoofing detected. Gateway MAC address changed unexpectedly.',
    details: {
      original_mac: 'AA:BB:CC:11:22:33',
      spoofed_mac: 'DD:EE:FF:44:55:66',
      gateway_ip: '192.168.1.1',
      technique: 'ARP Cache Poisoning'
    },
    device: 'Galaxy S23 - Sales',
    status: 'active'
  },
  {
    id: 'thr-8824',
    timestamp: Date.now() - 500000,
    type: ThreatType.MALWARE_APP,
    severity: Severity.HIGH,
    description: 'Suspicious application "Fast Cleaner Pro" detected with unauthorized SMS permissions.',
    details: {
      packageName: 'com.fast.cleaner.pro',
      permissions: ['SEND_SMS', 'READ_CONTACTS', 'SYSTEM_ALERT_WINDOW'],
      signature_hash: 'ae32...99f1'
    },
    device: 'Pixel 6a - Dev',
    status: 'active'
  },
  {
    id: 'thr-8825',
    timestamp: Date.now() - 900000,
    type: ThreatType.ROGUE_AP,
    severity: Severity.MEDIUM,
    description: 'Connected to an open WiFi network with a common rogue SSID.',
    details: {
      ssid: 'Free_Airport_WiFi',
      bssid: '12:34:56:78:90:AB',
      encryption: 'NONE',
      signal_strength: -45
    },
    device: 'Galaxy S23 - Sales',
    status: 'resolved'
  }
];

export const MOCK_APPS: AppScanResult[] = [
  { packageName: 'com.android.chrome', appName: 'Google Chrome', riskScore: 5, permissions: ['INTERNET', 'LOCATION'], isMalicious: false },
  { packageName: 'com.whatsapp', appName: 'WhatsApp', riskScore: 15, permissions: ['CONTACTS', 'CAMERA', 'MIC'], isMalicious: false },
  { packageName: 'com.fast.cleaner.pro', appName: 'Fast Cleaner Pro', riskScore: 92, permissions: ['SEND_SMS', 'SYSTEM_OVERLAY', 'INSTALL_PACKAGES'], isMalicious: true },
  { packageName: 'com.super.flashlight', appName: 'Super Flashlight', riskScore: 85, permissions: ['READ_CONTACTS', 'LOCATION_BACKGROUND'], isMalicious: true },
  { packageName: 'com.slack', appName: 'Slack', riskScore: 10, permissions: ['INTERNET', 'NOTIFICATIONS'], isMalicious: false },
];

export const generateTrafficData = (): NetworkPacket[] => {
  const data: NetworkPacket[] = [];
  const now = new Date();
  for (let i = 20; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      inbound: Math.floor(Math.random() * 50) + 10,
      outbound: Math.floor(Math.random() * 30) + 5,
      latency: Math.floor(Math.random() * 50) + 20,
      anomalyScore: Math.random() > 0.8 ? Math.floor(Math.random() * 80) + 20 : Math.floor(Math.random() * 10),
    });
  }
  return data;
};

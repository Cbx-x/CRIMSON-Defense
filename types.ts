
export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum ThreatType {
  SUSPICIOUS_WIFI = 'Suspicious WiFi',
  ROGUE_AP = 'Rogue Access Point',
  MITM = 'MITM Attack',
  MALWARE_APP = 'Malicious Application',
  NETWORK_ANOMALY = 'Network Anomaly',
}

export interface UserProfile {
  name: string;
  role: string;
  avatar?: string;
}

export interface ThreatEvent {
  id: string;
  timestamp: number;
  type: ThreatType;
  severity: Severity;
  description: string;
  details: Record<string, any>;
  device: string;
  status: 'active' | 'resolved' | 'analyzing';
}

export interface DeviceStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'compromised';
  battery: number;
  lastSeen: number;
  ip: string;
  wifiSSID: string;
}

export interface AppScanResult {
  packageName: string;
  appName: string;
  riskScore: number; // 0-100
  permissions: string[];
  isMalicious: boolean;
}

export interface NetworkPacket {
  time: string;
  inbound: number;
  outbound: number;
  latency: number;
  anomalyScore: number;
}

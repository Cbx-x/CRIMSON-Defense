
import { ThreatEvent } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export interface DetectionResult {
  module: string;
  status: 'safe' | 'warning' | 'critical';
  risk_score: number;
  details: string;
  timestamp: string;
  recommendation?: string;
}

export const backendService = {
  getHeaders() {
    const token = localStorage.getItem('crimson_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  },

  async getAlerts(): Promise<ThreatEvent[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/alerts/`, {
        headers: this.getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch alerts');
      return await response.json();
    } catch (error) {
      console.error('Backend connection failed, using fallback:', error);
      return [];
    }
  },

  async detectWifi(data: { ssid: string; bssid: string; rssi: number; encryption: string }): Promise<DetectionResult> {
    const response = await fetch(`${API_BASE_URL}/detect/wifi`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Detection failed');
    return await response.json();
  }
};

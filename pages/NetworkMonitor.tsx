import React from 'react';
import { NetworkPacket } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wifi, Router, Activity, Lock, AlertTriangle } from 'lucide-react';

interface NetworkMonitorProps {
  trafficData: NetworkPacket[];
}

const NetworkMonitor: React.FC<NetworkMonitorProps> = ({ trafficData }) => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Network Guard</h1>
        <p className="text-slate-400">Real-time traffic analysis and anomaly detection</p>
      </div>

      {/* Traffic Chart */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Network Traffic Flow (Mbps)</h3>
            <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <span className="text-slate-400">Inbound</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-slate-400">Outbound</span>
                </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                    <span className="text-slate-400">Anomaly Score</span>
                </div>
            </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#e2e8f0' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Area type="monotone" dataKey="inbound" stroke="#6366f1" fillOpacity={1} fill="url(#colorIn)" strokeWidth={2} />
              <Area type="monotone" dataKey="outbound" stroke="#10b981" fillOpacity={1} fill="url(#colorOut)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WiFi Security Status */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-6">
                <Wifi className="w-6 h-6 text-indigo-400" />
                <h3 className="text-lg font-semibold text-white">Active Connection</h3>
            </div>
            
            <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-950 rounded-lg border border-slate-800">
                    <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Current SSID</p>
                        <p className="text-lg font-mono text-emerald-400">Corp_Secure_5G</p>
                    </div>
                    <Lock className="w-5 h-5 text-emerald-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-500 uppercase tracking-wider">BSSID</p>
                        <p className="text-sm font-mono text-slate-300">AC:12:FF:44:11:99</p>
                    </div>
                     <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Security</p>
                        <p className="text-sm font-mono text-slate-300">WPA3-Enterprise</p>
                    </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-3">
                    <Router className="w-5 h-5 text-slate-400" />
                    <div className="flex-1">
                        <div className="flex justify-between mb-1">
                            <span className="text-xs text-slate-500">Gateway ARP Status</span>
                            <span className="text-xs text-emerald-500">Normal</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full">
                            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* MITM / Rogue AP Logs */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                <h3 className="text-lg font-semibold text-white">Detection Logs</h3>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {[1, 2, 3].map((_, i) => (
                    <div key={i} className="p-3 bg-slate-950/50 rounded border border-slate-800 text-sm">
                        <div className="flex justify-between items-start mb-1">
                             <span className="text-slate-300 font-medium">SSL Strip Attempt</span>
                             <span className="text-xs text-slate-500">10:42:{10 + i} AM</span>
                        </div>
                        <p className="text-slate-500 text-xs">Blocked connection to unencrypted endpoint 192.168.1.10{i}</p>
                    </div>
                ))}
                <div className="p-3 bg-rose-950/20 rounded border border-rose-900/50 text-sm">
                        <div className="flex justify-between items-start mb-1">
                             <span className="text-rose-400 font-medium">ARP Spoofing Detected</span>
                             <span className="text-xs text-rose-500/70">09:15:00 AM</span>
                        </div>
                        <p className="text-rose-300/70 text-xs">Gateway MAC address mismatch detected. Traffic rerouted.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkMonitor;

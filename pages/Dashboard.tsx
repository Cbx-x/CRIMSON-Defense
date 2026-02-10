
import React from 'react';
import { ThreatEvent, DeviceStatus, Severity } from '../types';
import ThreatCard from '../components/ThreatCard';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { ShieldCheck, AlertOctagon, Activity } from 'lucide-react';

interface DashboardProps {
  threats: ThreatEvent[];
  devices: DeviceStatus[];
  onResolveThreat: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ threats, devices, onResolveThreat }) => {
  const activeThreats = threats.filter(t => t.status === 'active');
  const compromisedDevices = devices.filter(d => d.status === 'compromised').length;
  const onlineDevices = devices.filter(d => d.status === 'online').length;

  // Chart Data
  const severityData = [
    { name: 'Critical', value: activeThreats.filter(t => t.severity === Severity.CRITICAL).length, color: '#e11d48' }, // crimson-600
    { name: 'High', value: activeThreats.filter(t => t.severity === Severity.HIGH).length, color: '#f97316' }, // orange-500
    { name: 'Medium', value: activeThreats.filter(t => t.severity === Severity.MEDIUM).length, color: '#f59e0b' }, // amber-500
    { name: 'Low', value: activeThreats.filter(t => t.severity === Severity.LOW).length, color: '#3b82f6' }, // blue-500
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div>
           <h1 className="text-2xl font-bold font-display text-white mb-1 tracking-wide">SECURITY OVERVIEW</h1>
           <p className="text-zinc-400">Real-time telemetry from active Android endpoints</p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-xs font-medium text-zinc-300">System Live</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-xl flex items-center justify-between backdrop-blur-sm">
           <div>
             <p className="text-zinc-400 text-xs font-mono uppercase mb-2">Fleet Health</p>
             <h2 className="text-4xl font-bold text-emerald-500 font-display">{((onlineDevices / devices.length) * 100).toFixed(0)}%</h2>
             <p className="text-xs text-zinc-500 mt-1">{onlineDevices}/{devices.length} Devices Secure</p>
           </div>
           <div className="p-4 bg-emerald-500/10 rounded-full border border-emerald-500/20">
             <ShieldCheck className="w-8 h-8 text-emerald-500" />
           </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-xl flex items-center justify-between backdrop-blur-sm relative overflow-hidden">
           {activeThreats.length > 0 && <div className="absolute top-0 right-0 w-2 h-full bg-crimson-600"></div>}
           <div>
             <p className="text-zinc-400 text-xs font-mono uppercase mb-2">Active Threats</p>
             <h2 className="text-4xl font-bold text-crimson-500 font-display">{activeThreats.length}</h2>
             <p className="text-xs text-crimson-400 mt-1">Immediate Action Req.</p>
           </div>
           <div className="p-4 bg-crimson-500/10 rounded-full border border-crimson-500/20 animate-pulse">
             <AlertOctagon className="w-8 h-8 text-crimson-500" />
           </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-xl flex items-center justify-between backdrop-blur-sm">
           <div>
             <p className="text-zinc-400 text-xs font-mono uppercase mb-2">Compromised Devices</p>
             <h2 className="text-4xl font-bold text-amber-500 font-display">{compromisedDevices}</h2>
             <p className="text-xs text-zinc-500 mt-1">Quarantine Protocols Active</p>
           </div>
           <div className="p-4 bg-amber-500/10 rounded-full border border-amber-500/20">
             <Activity className="w-8 h-8 text-amber-500" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Threat Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <h3 className="text-lg font-semibold text-white font-display tracking-wide">LIVE THREAT FEED</h3>
          </div>
          <div className="space-y-4">
             {activeThreats.length === 0 ? (
                 <div className="p-8 text-center border border-dashed border-zinc-800 rounded-lg bg-zinc-900/20">
                     <ShieldCheck className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                     <p className="text-zinc-500 font-mono">NO ACTIVE THREATS DETECTED. SYSTEM SECURE.</p>
                 </div>
             ) : (
                activeThreats.map(threat => (
                    <ThreatCard key={threat.id} threat={threat} onResolve={onResolveThreat} />
                ))
             )}
          </div>
        </div>

        {/* Stats & Charts */}
        <div className="space-y-6">
            <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4 font-display">THREAT DISTRIBUTION</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={severityData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {severityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <RechartsTooltip 
                                contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#e4e4e7' }}
                                itemStyle={{ color: '#e4e4e7' }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4 font-display">ML MODEL STATUS</h3>
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-zinc-400 font-mono">TFLITE (ON-DEVICE)</span>
                            <span className="text-emerald-500 font-bold">ACTIVE</span>
                        </div>
                        <div className="w-full bg-black rounded-full h-1.5 border border-zinc-800">
                            <div className="bg-emerald-500 h-1.5 rounded-full shadow-[0_0_8px_#10b981]" style={{ width: '98%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-zinc-400 font-mono">GEMINI (CLOUD)</span>
                            <span className="text-crimson-500 font-bold">STANDBY</span>
                        </div>
                        <div className="w-full bg-black rounded-full h-1.5 border border-zinc-800">
                            <div className="bg-crimson-600 h-1.5 rounded-full shadow-[0_0_8px_#e11d48]" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-zinc-400 font-mono">DETECTION ACCURACY</span>
                            <span className="text-zinc-200">94.2%</span>
                        </div>
                        <div className="w-full bg-black rounded-full h-1.5 border border-zinc-800">
                            <div className="bg-zinc-500 h-1.5 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import React, { useState, useEffect } from 'react';
import { Network, Lock, FileWarning, Eye, Unlock, Fingerprint, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';

const MitmDetectionModule: React.FC = () => {
  const [isAttackActive, setIsAttackActive] = useState(false);
  const [latencyData, setLatencyData] = useState<any[]>([]);
  const [anomalyScore, setAnomalyScore] = useState(0.1);

  // Simulation Constants
  const GATEWAY_MAC_REAL = "AA:BB:CC:11:22:33";
  const GATEWAY_MAC_SPOOF = "DE:AD:BE:EF:00:01";

  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyData(prev => {
        // Attack introduces processing delay in the loop
        const baseLatency = isAttackActive ? 140 : 40; 
        const jitter = Math.random() * 20;
        const newLatency = baseLatency + jitter;
        
        // Calculate Anomaly Score based on Latency & Cert features
        const newScore = isAttackActive 
            ? 0.85 + (Math.random() * 0.1) 
            : 0.1 + (Math.random() * 0.1);
            
        setAnomalyScore(newScore);

        const newData = [...prev, { time: new Date().toLocaleTimeString(), latency: newLatency }];
        return newData.slice(-20); // Keep last 20 points
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAttackActive]);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-start border-b border-white/10 pb-6">
        <div>
           <h1 className="text-2xl font-bold font-display text-white mb-1">MITM DETECTION</h1>
           <p className="text-zinc-400">Real-time ARP monitoring & SSL Anomaly Detection using Isolation Forests</p>
        </div>
        <button 
          onClick={() => setIsAttackActive(!isAttackActive)}
          className={`px-4 py-2 rounded font-medium text-sm transition-colors flex items-center gap-2 border shadow-lg font-mono
            ${isAttackActive 
              ? 'bg-crimson-600 hover:bg-crimson-700 text-white border-crimson-500 shadow-[0_0_15px_rgba(225,29,72,0.4)]' 
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700'}`}
        >
          {isAttackActive ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          {isAttackActive ? 'STOP SIMULATION' : 'SIMULATE ARP SPOOFING'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Network Indicators */}
        <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 font-display">
                <Network className="w-5 h-5 text-crimson-500" /> 1. Network Indicators
            </h2>
            
            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-5 space-y-4 backdrop-blur-sm">
                {/* ARP Table Status */}
                <div className={`p-4 rounded-lg border transition-colors duration-300 ${isAttackActive ? 'bg-crimson-900/20 border-crimson-500/30' : 'bg-black border-white/5'}`}>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-zinc-500 uppercase font-mono">Gateway ARP Cache</span>
                        {isAttackActive && <span className="text-[10px] bg-crimson-600 text-white px-1.5 rounded font-mono animate-pulse">POISONED</span>}
                    </div>
                    <div className="font-mono text-sm text-zinc-300 flex items-center gap-2">
                        <span className="text-zinc-500">MAC:</span>
                        <span className={isAttackActive ? 'text-crimson-400 font-bold' : 'text-emerald-400'}>
                            {isAttackActive ? GATEWAY_MAC_SPOOF : GATEWAY_MAC_REAL}
                        </span>
                    </div>
                    {isAttackActive && (
                        <div className="mt-2 text-[10px] text-crimson-400 font-mono">
                            &gt; Warning: MAC address oscillation detected.
                        </div>
                    )}
                </div>

                {/* TLS Status */}
                <div className={`p-4 rounded-lg border transition-colors duration-300 ${isAttackActive ? 'bg-amber-900/20 border-amber-500/30' : 'bg-black border-white/5'}`}>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-zinc-500 uppercase font-mono">TLS Certificate Check</span>
                        {isAttackActive && <span className="text-[10px] bg-amber-500 text-black px-1.5 rounded font-mono">ANOMALY</span>}
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Issuer:</span>
                            <span className={`font-mono ${isAttackActive ? 'text-amber-400' : 'text-zinc-300'}`}>
                                {isAttackActive ? 'Unsafe Proxy CA' : 'DigiCert Global G2'}
                            </span>
                        </div>
                         <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">Chain Depth:</span>
                            <span className={`font-mono ${isAttackActive ? 'text-amber-400' : 'text-zinc-300'}`}>
                                {isAttackActive ? '1 (Self-signed)' : '3 (Trusted)'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* DNS Check */}
                <div className="p-4 rounded-lg bg-black border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-zinc-500 uppercase font-mono">DNS Integrity</span>
                        <span className="text-xs text-emerald-500 font-mono font-bold">VERIFIED</span>
                    </div>
                     <div className="font-mono text-xs text-zinc-400">
                        DoH Provider: 8.8.8.8 (Google)
                    </div>
                </div>
            </div>
        </div>

        {/* Center: Feature Engineering & Time Series */}
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 font-display">
                <Activity className="w-5 h-5 text-crimson-500" /> 2. Feature Engineering & Latency Analysis
            </h2>
            
            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-sm font-medium text-zinc-200 font-display">SSL HANDSHAKE LATENCY (RTT)</h3>
                        <p className="text-xs text-zinc-500">MITM interception introduces measurable delays</p>
                    </div>
                    <div className="text-right">
                         <div className="text-xs text-zinc-500 font-mono uppercase">Current Latency</div>
                         <div className={`text-xl font-mono font-bold ${isAttackActive ? 'text-crimson-500' : 'text-emerald-400'}`}>
                             {latencyData.length > 0 ? Math.round(latencyData[latencyData.length - 1].latency) : 0} ms
                         </div>
                    </div>
                </div>

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={latencyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                            <XAxis dataKey="time" stroke="#71717a" fontSize={10} tickLine={false} />
                            <YAxis stroke="#71717a" fontSize={10} tickLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#e4e4e7' }}
                                itemStyle={{ color: '#e4e4e7' }}
                            />
                            <ReferenceLine y={100} label={{ value: 'Anomaly Threshold', fill: '#f43f5e', fontSize: 10 }} stroke="#f43f5e" strokeDasharray="3 3" />
                            <Line 
                                type="monotone" 
                                dataKey="latency" 
                                stroke={isAttackActive ? "#f43f5e" : "#10b981"} 
                                strokeWidth={2} 
                                dot={false} 
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/10">
                    <div>
                        <div className="text-[10px] text-zinc-500 uppercase font-bold font-mono">Feature 1: Delta T</div>
                        <div className="text-xs text-zinc-300">Packet Inter-arrival Time</div>
                    </div>
                     <div>
                        <div className="text-[10px] text-zinc-500 uppercase font-bold font-mono">Feature 2: Entropy</div>
                        <div className="text-xs text-zinc-300">Payload Randomness</div>
                    </div>
                     <div>
                        <div className="text-[10px] text-zinc-500 uppercase font-bold font-mono">Feature 3: Cert Hash</div>
                        <div className="text-xs text-zinc-300">Leaf Certificate Fingerprint</div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Bottom: ML Model & Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-xl relative overflow-hidden backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                    <Fingerprint className="w-6 h-6 text-crimson-500" />
                    <h3 className="text-lg font-semibold text-white font-display">DETECTION WORKFLOW</h3>
                </div>
                
                <div className="space-y-4 relative z-10">
                    <div className="flex items-start gap-3">
                        <div className="bg-black text-zinc-400 w-6 h-6 rounded flex items-center justify-center text-xs font-bold mt-0.5 border border-white/10 font-mono">1</div>
                        <div>
                            <p className="text-sm text-zinc-200 font-medium">Rootless Packet Inspection</p>
                            <p className="text-xs text-zinc-400">Android <code className="bg-zinc-800 px-1 rounded text-white/80">VpnService</code> intercepts outbound TCP flows.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-black text-zinc-400 w-6 h-6 rounded flex items-center justify-center text-xs font-bold mt-0.5 border border-white/10 font-mono">2</div>
                        <div>
                            <p className="text-sm text-zinc-200 font-medium">Metadata Extraction</p>
                            <p className="text-xs text-zinc-400">Extract headers: Source IP, Dest IP, TCP Flags, TLS ClientHello/ServerHello.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-black text-zinc-400 w-6 h-6 rounded flex items-center justify-center text-xs font-bold mt-0.5 border border-white/10 font-mono">3</div>
                        <div>
                            <p className="text-sm text-zinc-200 font-medium">Isolation Forest (On-Device)</p>
                            <p className="text-xs text-zinc-400">ML model isolates outliers based on flow duration, byte count, and handshake timing.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <div className="bg-black text-zinc-400 w-6 h-6 rounded flex items-center justify-center text-xs font-bold mt-0.5 border border-white/10 font-mono">4</div>
                        <div>
                            <p className="text-sm text-zinc-200 font-medium">Cloud Verification</p>
                            <p className="text-xs text-zinc-400">If Score {'>'} 0.8, send Cert Hash to backend to check against CT logs.</p>
                        </div>
                    </div>
                </div>
          </div>

          <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-xl flex flex-col justify-center items-center text-center backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-2 font-display">REAL-TIME THREAT SCORE</h3>
                <p className="text-sm text-zinc-400 mb-6">Combined probability of MITM presence</p>

                <div className="relative w-48 h-48 flex items-center justify-center">
                    <div className={`absolute inset-0 rounded-full border-4 ${isAttackActive ? 'border-crimson-900/30' : 'border-emerald-900/30'}`}></div>
                    <div className={`absolute inset-0 rounded-full border-4 ${isAttackActive ? 'border-t-crimson-500 border-r-crimson-500' : 'border-t-emerald-500 border-r-emerald-500'} transition-all duration-500 rotate-45 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}></div>
                    
                    <div className="z-10">
                        <div className={`text-4xl font-bold font-display ${isAttackActive ? 'text-crimson-500' : 'text-emerald-500'}`}>
                            {(anomalyScore * 100).toFixed(0)}%
                        </div>
                        <div className="text-xs text-zinc-500 uppercase mt-1 font-bold font-mono">
                            {isAttackActive ? 'CRITICAL' : 'NORMAL'}
                        </div>
                    </div>
                </div>

                {isAttackActive && (
                    <div className="mt-6 flex gap-2 animate-in fade-in slide-in-from-bottom-2">
                        <button className="px-4 py-2 bg-crimson-600 hover:bg-crimson-500 text-white text-sm font-medium rounded transition-colors shadow-[0_0_10px_#e11d48]">
                            BLOCK CONNECTION
                        </button>
                        <button className="px-4 py-2 bg-black hover:bg-zinc-900 text-zinc-300 text-sm font-medium rounded transition-colors border border-zinc-800">
                            VIEW PACKET LOG
                        </button>
                    </div>
                )}
          </div>
      </div>
    </div>
  );
};

export default MitmDetectionModule;

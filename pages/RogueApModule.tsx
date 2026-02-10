
import React, { useState, useEffect } from 'react';
import { Router, ShieldAlert, CheckCircle, AlertOctagon, GitCompare, Server, Wifi, Brain } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const RogueApModule: React.FC = () => {
  const [scenario, setScenario] = useState<'safe' | 'roaming' | 'evil_twin'>('safe');
  const [similarityScore, setSimilarityScore] = useState(0.98);

  // Profile Definitions
  const trustedProfile = {
    ssid: "Corp_Secure_5G",
    bssid_prefix: "00:40:96", // Cisco Systems
    vendor: "Cisco Systems, Inc",
    security: "WPA3-Enterprise",
    band: "5 GHz",
    channel_range: "36-165"
  };

  // Dynamic Scan Data based on scenario
  const currentScan = {
    ssid: "Corp_Secure_5G", // Evil Twin always copies SSID
    bssid: scenario === 'evil_twin' ? "B8:27:EB:11:22:33" : (scenario === 'roaming' ? "00:40:96:AA:BB:CC" : "00:40:96:11:22:33"),
    vendor: scenario === 'evil_twin' ? "Raspberry Pi Foundation" : "Cisco Systems, Inc",
    security: scenario === 'evil_twin' ? "WPA2-Personal" : "WPA3-Enterprise", // Attack often downgrades security
    band: scenario === 'evil_twin' ? "2.4 GHz" : "5 GHz", // Attackers often use 2.4 for range
    channel: scenario === 'evil_twin' ? "6" : (scenario === 'roaming' ? "48" : "36")
  };

  // Feature Weights for ML Model (Visual Representation)
  const featureData = [
    { name: 'SSID Match', score: 100, weight: 1 }, // Always matches in Evil Twin
    { name: 'OUI Match', score: scenario === 'evil_twin' ? 0 : 100, weight: 3 }, // Vendor check
    { name: 'Sec Match', score: scenario === 'evil_twin' ? 0 : 100, weight: 4 }, // Security downgrade check
    { name: 'Band Match', score: scenario === 'evil_twin' ? 20 : 100, weight: 1 }, // Band consistency
    { name: 'Geo Fence', score: 100, weight: 2 }, // Assumed location valid for demo
  ];

  useEffect(() => {
    // Calculate simple weighted score for demo
    let totalScore = 0;
    let maxScore = 0;
    featureData.forEach(f => {
      totalScore += f.score * f.weight;
      maxScore += 100 * f.weight;
    });
    setSimilarityScore(totalScore / maxScore);
  }, [scenario]);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-start border-b border-white/10 pb-6">
        <div>
           <h1 className="text-2xl font-bold font-display text-white mb-1">ROGUE AP DETECTION</h1>
           <p className="text-zinc-400">Evil Twin differentiation using Historical Profiling & OUI Analysis</p>
        </div>
        <div className="flex bg-black rounded-lg p-1 border border-white/10">
            <button 
                onClick={() => setScenario('safe')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${scenario === 'safe' ? 'bg-emerald-600 text-white shadow-[0_0_10px_#10b981]' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                Stable Connection
            </button>
            <button 
                onClick={() => setScenario('roaming')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${scenario === 'roaming' ? 'bg-blue-600 text-white shadow-[0_0_10px_#2563eb]' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                Safe Roaming
            </button>
            <button 
                onClick={() => setScenario('evil_twin')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${scenario === 'evil_twin' ? 'bg-crimson-600 text-white shadow-[0_0_10px_#e11d48]' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                Evil Twin Attack
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Comparison Engine */}
        <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 font-display">
                <GitCompare className="w-5 h-5 text-crimson-500" /> 1. Profile Comparison
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
                {/* Trusted Profile Card */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4 text-emerald-500">
                        <Server className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider font-mono">Historical Profile</span>
                    </div>
                    <div className="space-y-3 text-sm">
                        <div>
                            <p className="text-zinc-500 text-xs font-mono uppercase">SSID</p>
                            <p className="text-zinc-200 font-mono font-bold">{trustedProfile.ssid}</p>
                        </div>
                         <div>
                            <p className="text-zinc-500 text-xs font-mono uppercase">Expected Vendor (OUI)</p>
                            <p className="text-zinc-200 font-mono">{trustedProfile.vendor}</p>
                        </div>
                         <div>
                            <p className="text-zinc-500 text-xs font-mono uppercase">Security Config</p>
                            <p className="text-zinc-200 font-mono">{trustedProfile.security}</p>
                        </div>
                         <div>
                            <p className="text-zinc-500 text-xs font-mono uppercase">Frequency Band</p>
                            <p className="text-zinc-200 font-mono">{trustedProfile.band}</p>
                        </div>
                    </div>
                </div>

                {/* Live Scan Card */}
                <div className={`bg-zinc-900/50 border rounded-xl p-5 relative overflow-hidden backdrop-blur-sm transition-colors duration-300 ${scenario === 'evil_twin' ? 'border-crimson-500/50 bg-crimson-900/10' : 'border-white/10'}`}>
                    {scenario === 'evil_twin' && (
                        <div className="absolute top-0 right-0 p-2 bg-crimson-500/20 rounded-bl-xl border-l border-b border-crimson-500/30">
                            <ShieldAlert className="w-5 h-5 text-crimson-500" />
                        </div>
                    )}
                    <div className={`flex items-center gap-2 mb-4 ${scenario === 'evil_twin' ? 'text-crimson-400' : 'text-blue-400'}`}>
                        <Wifi className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider font-mono">Live Scan Result</span>
                    </div>
                    <div className="space-y-3 text-sm">
                        <div>
                            <p className="text-zinc-500 text-xs font-mono uppercase">SSID</p>
                            <p className="text-zinc-200 font-mono font-bold">{currentScan.ssid}</p>
                        </div>
                         <div>
                            <p className="text-zinc-500 text-xs font-mono uppercase">Detected Vendor</p>
                            <p className={`font-mono ${scenario === 'evil_twin' ? 'text-crimson-400 font-bold' : 'text-zinc-200'}`}>
                                {currentScan.vendor}
                            </p>
                        </div>
                         <div>
                            <p className="text-zinc-500 text-xs font-mono uppercase">Security Config</p>
                            <p className={`font-mono ${scenario === 'evil_twin' ? 'text-crimson-400 font-bold' : 'text-zinc-200'}`}>
                                {currentScan.security}
                            </p>
                        </div>
                         <div>
                            <p className="text-zinc-500 text-xs font-mono uppercase">Frequency Band</p>
                             <p className={`font-mono ${scenario === 'evil_twin' ? 'text-amber-400' : 'text-zinc-200'}`}>
                                {currentScan.band} (Ch {currentScan.channel})
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* ML Score & Logic */}
        <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 font-display">
                <Brain className="w-5 h-5 text-crimson-500" /> 2. ML Trust Scoring
            </h2>
            
            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="text-sm text-zinc-400 font-mono uppercase">Profile Similarity</div>
                        <div className={`text-4xl font-bold font-display ${similarityScore < 0.6 ? 'text-crimson-500 drop-shadow-[0_0_8px_rgba(225,29,72,0.5)]' : 'text-emerald-500'}`}>
                            {(similarityScore * 100).toFixed(1)}%
                        </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold border font-mono tracking-wide ${
                        similarityScore < 0.6 
                        ? 'bg-crimson-500/10 text-crimson-500 border-crimson-500/20' 
                        : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                    }`}>
                        {similarityScore < 0.6 ? 'ROGUE DETECTED' : 'TRUSTED AP'}
                    </div>
                </div>

                <div className="h-40 mb-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={featureData} layout="vertical">
                            <XAxis type="number" hide domain={[0, 100]} />
                            <YAxis dataKey="name" type="category" width={80} tick={{fill: '#71717a', fontSize: 10, fontFamily: 'monospace'}} />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#e4e4e7' }} />
                            <Bar dataKey="score" radius={[0, 2, 2, 0]} barSize={12}>
                                {featureData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.score < 50 ? '#f43f5e' : '#10b981'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="p-3 bg-black rounded border border-white/10">
                    <div className="text-[10px] text-zinc-500 mb-1 font-mono uppercase font-bold">Decision Logic</div>
                    <p className="text-xs text-zinc-300 font-mono">
                        {scenario === 'evil_twin' 
                            ? "> CRITICAL: OUI Mismatch (Cisco vs RPi) AND Security Downgrade detected. Rejecting connection."
                            : scenario === 'roaming'
                                ? "> INFO: BSSID changed but Vendor OUI matches Trusted Profile. Valid roam event."
                                : "> INFO: BSSID matches trusted history. Connection valid."
                        }
                    </p>
                </div>
            </div>
        </div>

      </div>

      <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
           <h3 className="text-white font-semibold mb-4 font-display">FALSE POSITIVE MITIGATION</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                   <h4 className="text-sm font-medium text-emerald-500 font-mono">Legitimate Roaming (Mesh)</h4>
                   <p className="text-xs text-zinc-400 leading-relaxed">
                       In corporate environments, devices roam between APs with different BSSIDs. 
                       Our ML model distinguishes this by validating the <strong>Organizationally Unique Identifier (OUI)</strong>. 
                       If the user moves from one Cisco AP to another Cisco AP on the same SSID with WPA3, the Trust Score remains high.
                   </p>
                   <div className="flex gap-2 text-xs font-mono text-zinc-500 mt-2 bg-black p-2 rounded border border-white/5">
                       <span>Trusted: 00:40:96</span>
                       <span className="text-emerald-500">→</span>
                       <span>New: 00:40:96</span>
                       <span className="text-emerald-500">(Match)</span>
                   </div>
               </div>
               <div className="space-y-2">
                   <h4 className="text-sm font-medium text-crimson-500 font-mono">Rogue AP (Evil Twin)</h4>
                   <p className="text-xs text-zinc-400 leading-relaxed">
                       Attackers often use consumer hardware (Alfa cards, Pineapples). 
                       The model detects a sudden shift in Vendor OUI (e.g., Cisco to Realtek/Intel) or a drop in security. 
                       Even if the SSID matches, the <strong>Vector Distance</strong> exceeds the safe threshold.
                   </p>
                   <div className="flex gap-2 text-xs font-mono text-zinc-500 mt-2 bg-black p-2 rounded border border-white/5">
                       <span>Trusted: 00:40:96</span>
                       <span className="text-crimson-500">→</span>
                       <span>New: B8:27:EB</span>
                       <span className="text-crimson-500">(Mismatch)</span>
                   </div>
               </div>
           </div>
      </div>
    </div>
  );
};

export default RogueApModule;

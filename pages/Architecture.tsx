
import React from 'react';
import { Smartphone, Server, Database, Cloud, Shield, Cpu, Lock, Network, Zap, FileJson } from 'lucide-react';

const Architecture: React.FC = () => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-display text-white mb-1">SYSTEM ARCHITECTURE</h1>
        <p className="text-zinc-400">High-level overview of the Crimson Defense security ecosystem</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        
        {/* Layer 1: Mobile Agent */}
        <div className="relative">
            <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-crimson-500 to-transparent"></div>
            <h2 className="text-xl font-semibold text-crimson-400 mb-4 pl-4 font-display">1. CRIMSON ENDPOINT AGENT</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-xl relative overflow-hidden group backdrop-blur-sm hover:border-crimson-500/30 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Smartphone className="w-24 h-24 text-crimson-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <Shield className="w-6 h-6 text-crimson-500" />
                        <h3 className="font-semibold text-zinc-200 font-display">SECURITY MONITORS</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-zinc-400">
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 mt-1.5"></span>
                            <span><strong>Network Guard:</strong> Inspects traffic for MITM & data leaks.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 mt-1.5"></span>
                            <span><strong>App Shield:</strong> Detects malicious installs & overlays.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 mt-1.5"></span>
                            <span><strong>WiFi Sentry:</strong> Identifies Rogue APs & Evil Twins.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-xl relative overflow-hidden group backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Cpu className="w-24 h-24 text-emerald-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <Cpu className="w-6 h-6 text-emerald-500" />
                        <h3 className="font-semibold text-zinc-200 font-display">LOCAL INTELLIGENCE</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-zinc-400">
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></span>
                            <span><strong>Behavioral AI:</strong> Detects anomalies in real-time.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></span>
                            <span><strong>Privacy First:</strong> Analysis happens locally; data stays on device.</span>
                        </li>
                         <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></span>
                            <span><strong>Offline Ready:</strong> Protection remains active without internet.</span>
                        </li>
                    </ul>
                </div>

                 <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-xl relative overflow-hidden group backdrop-blur-sm hover:border-zinc-500/30 transition-colors">
                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Lock className="w-24 h-24 text-zinc-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <Lock className="w-6 h-6 text-zinc-400" />
                        <h3 className="font-semibold text-zinc-200 font-display">SECURE UPLINK</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-zinc-400">
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-1.5"></span>
                            <span><strong>Event Batching:</strong> Optimizes battery usage.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-1.5"></span>
                            <span><strong>Encryption:</strong> End-to-end encrypted telemetry.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center -my-4 z-10">
            <div className="bg-black px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-xs text-zinc-400 font-mono uppercase tracking-wider">
                <Network className="w-4 h-4" />
                Secure Encrypted Tunnel
            </div>
        </div>

        {/* Layer 2: Cloud Backend */}
        <div className="relative">
            <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500 to-transparent"></div>
            <h2 className="text-xl font-semibold text-amber-500 mb-4 pl-4 font-display">2. CLOUD ANALYSIS PLATFORM</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 bg-zinc-900/50 border border-white/10 p-6 rounded-xl flex flex-col items-center text-center backdrop-blur-sm">
                    <Server className="w-12 h-12 text-amber-500 mb-4" />
                    <h3 className="font-semibold text-zinc-200 mb-2 font-display">MANAGEMENT GATEWAY</h3>
                    <p className="text-sm text-zinc-400">Centralized Control</p>
                    <div className="mt-4 w-full space-y-2">
                        <div className="bg-black p-2 rounded border border-white/5 text-xs text-zinc-500 font-mono">Device Authentication</div>
                        <div className="bg-black p-2 rounded border border-white/5 text-xs text-zinc-500 font-mono">Policy Distribution</div>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-zinc-900/50 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <Cloud className="w-6 h-6 text-blue-400" />
                        <h3 className="font-semibold text-zinc-200 font-display">THREAT INTELLIGENCE ENGINE</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-black rounded-lg border border-white/5">
                             <div className="flex items-center gap-2 mb-2">
                                <FileJson className="w-4 h-4 text-zinc-400" />
                                <span className="text-sm font-medium text-zinc-300">Deep Correlation</span>
                             </div>
                             <p className="text-xs text-zinc-500">Analyzes aggregate fleet data to identify complex attack patterns and coordinated campaigns.</p>
                        </div>
                        <div className="p-4 bg-crimson-900/10 rounded-lg border border-crimson-500/20">
                             <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-crimson-400" />
                                <span className="text-sm font-medium text-crimson-300">AI Analyst (Gemini)</span>
                             </div>
                             <p className="text-xs text-crimson-200/70">Contextualizes security alerts into human-readable incident reports and remediation steps.</p>
                        </div>
                    </div>
                </div>

                 <div className="lg:col-span-1 bg-zinc-900/50 border border-white/10 p-6 rounded-xl flex flex-col items-center text-center backdrop-blur-sm">
                    <Database className="w-12 h-12 text-zinc-600 mb-4" />
                    <h3 className="font-semibold text-zinc-200 mb-2 font-display">SECURE STORAGE</h3>
                    <div className="mt-4 w-full space-y-2">
                        <div className="bg-black p-2 rounded border border-white/5 text-xs text-zinc-500 text-left font-mono">
                            <span className="text-blue-400 font-bold">Metadata:</span> Device Inv
                        </div>
                        <div className="bg-black p-2 rounded border border-white/5 text-xs text-zinc-500 text-left font-mono">
                            <span className="text-orange-400 font-bold">History:</span> Incident Logs
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Architecture;

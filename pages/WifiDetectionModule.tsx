
import React, { useState, useEffect } from 'react';
import { Wifi, Cpu, ShieldAlert, Database, Lock } from 'lucide-react';
import { backendService } from '../services/backendService';

const WifiDetectionModule: React.FC = () => {
  const [rssi, setRssi] = useState(-65);
  const [anomalyScore, setAnomalyScore] = useState(0.1);
  const [status, setStatus] = useState<string>('safe');
  const [isAttackSimulated, setIsAttackSimulated] = useState(false);
  const [featureHistory, setFeatureHistory] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Poll the backend periodically (simulating real-time sensor data)
    const interval = setInterval(async () => {
      // 1. Simulate Reading Sensors
      const currentRssi = isAttackSimulated 
        ? -35 + Math.floor(Math.random() * 10) // Stronger signal (Attack)
        : -65 + Math.floor(Math.random() * 5); // Normal
      
      setRssi(currentRssi);

      // 2. Prepare Payload
      const scanData = {
        ssid: isAttackSimulated ? "Free_Public_WiFi" : "Corp_Secure",
        bssid: isAttackSimulated ? "DE:AD:BE:EF:00:00" : "AA:BB:CC:DD:EE:FF",
        rssi: currentRssi,
        encryption: isAttackSimulated ? "OPEN" : "WPA3"
      };

      try {
        setIsProcessing(true);
        // 3. Send to Backend for Analysis
        const result = await backendService.detectWifi(scanData);
        
        // 4. Update UI with Backend Results
        setAnomalyScore(result.risk_score);
        setStatus(result.status);

        setFeatureHistory(prev => {
          const newData = [...prev.slice(-20), { score: result.risk_score, rssi: currentRssi }];
          return newData;
        });
      } catch (err) {
        console.error("Analysis Failed", err);
      } finally {
        setIsProcessing(false);
      }

    }, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, [isAttackSimulated]);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-start border-b border-white/10 pb-6">
        <div>
           <h1 className="text-2xl font-bold font-display text-white mb-1">WIFI DETECTION MODULE</h1>
           <p className="text-zinc-400">Real-time Backend Inference (Python/FastAPI)</p>
        </div>
        <button 
          onClick={() => setIsAttackSimulated(!isAttackSimulated)}
          className={`px-4 py-2 rounded font-medium text-sm transition-colors flex items-center gap-2 border shadow-lg
            ${isAttackSimulated 
              ? 'bg-crimson-600 hover:bg-crimson-700 text-white border-crimson-500' 
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700'}`}
        >
          {isAttackSimulated ? <ShieldAlert className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
          {isAttackSimulated ? 'Stop "Evil Twin" Simulation' : 'Simulate "Evil Twin" Attack'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Feature Extraction & Model Input */}
        <div className="lg:col-span-1 space-y-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 font-display">
                <Database className="w-5 h-5 text-crimson-500" /> 1. Sensor Data (Telemetry)
            </h2>
            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-5 space-y-4 backdrop-blur-sm">
                <div className="text-xs text-zinc-500 uppercase font-bold font-mono mb-2">Payload to Backend</div>
                
                <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-black rounded border border-white/5">
                        <span className="text-zinc-400 text-sm font-mono">RSSI (Signal)</span>
                        <span className={`font-mono font-bold ${isAttackSimulated ? 'text-crimson-400' : 'text-emerald-400'}`}>
                            {rssi} dBm
                        </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-black rounded border border-white/5">
                        <span className="text-zinc-400 text-sm font-mono">Encryption</span>
                        <span className={`font-mono text-sm ${isAttackSimulated ? 'text-crimson-400' : 'text-emerald-400'}`}>
                            {isAttackSimulated ? 'OPEN' : 'WPA3'}
                        </span>
                    </div>
                     <div className="flex justify-between items-center p-3 bg-black rounded border border-white/5">
                        <span className="text-zinc-400 text-sm font-mono">SSID</span>
                        <span className="font-mono text-sm text-zinc-300">
                            {isAttackSimulated ? 'Free_Public_WiFi' : 'Corp_Secure'}
                        </span>
                    </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs text-zinc-500 font-mono">STATUS</span>
                    <span className={`text-xs font-bold font-mono ${isProcessing ? 'text-amber-500 animate-pulse' : 'text-zinc-500'}`}>
                        {isProcessing ? 'SENDING TELEMETRY...' : 'IDLE'}
                    </span>
                </div>
            </div>
        </div>

        {/* Middle Column: Model Inference */}
        <div className="lg:col-span-1 space-y-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 font-display">
                <Cpu className="w-5 h-5 text-crimson-500" /> 2. Backend Analysis
            </h2>
             <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-5 relative overflow-hidden h-[340px] flex flex-col backdrop-blur-sm">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Cpu className="w-32 h-32 text-crimson-500" />
                </div>
                
                <div className="z-10 flex-1 flex flex-col justify-center items-center space-y-6">
                    <div className="bg-blue-900/20 border border-blue-500/30 px-4 py-2 rounded-full text-blue-300 text-xs font-mono">
                        POST /api/v1/detect/wifi
                    </div>

                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="h-16 w-full flex items-end gap-1 px-4">
                            {featureHistory.map((d, i) => (
                                <div 
                                    key={i} 
                                    className={`flex-1 rounded-t-sm transition-all duration-300 ${d.score > 0.5 ? 'bg-crimson-500 shadow-[0_0_10px_#f43f5e]' : 'bg-emerald-500'}`}
                                    style={{ height: `${Math.max(10, d.score * 100)}%` }}
                                ></div>
                            ))}
                        </div>
                        <div className="text-xs text-zinc-500 font-mono">HISTORY (LAST 20 SCANS)</div>
                    </div>

                    <div className="text-center">
                        <div className="text-sm text-zinc-400 mb-1 font-display tracking-wide">CALCULATED RISK</div>
                        <div className={`text-4xl font-bold transition-colors duration-300 font-mono ${anomalyScore > 0.5 ? 'text-crimson-500' : 'text-emerald-400'}`}>
                            {anomalyScore.toFixed(3)}
                        </div>
                    </div>
                </div>

                {status === 'critical' && (
                     <div className="absolute bottom-4 left-0 right-0 text-center animate-pulse">
                        <span className="bg-crimson-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(225,29,72,0.6)] font-mono">
                            CRITICAL THREAT DETECTED
                        </span>
                     </div>
                )}
             </div>
        </div>

        {/* Right Column: Logic & Defense */}
        <div className="lg:col-span-1 space-y-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 font-display">
                <ShieldAlert className="w-5 h-5 text-crimson-500" /> 3. Response
            </h2>
            <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-zinc-900 px-4 py-2 border-b border-white/5 flex justify-between items-center">
                    <span className="text-xs font-mono text-zinc-400">ResponseAction.json</span>
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-crimson-500/20 border border-crimson-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                    </div>
                </div>
                <div className="p-4 overflow-x-auto">
                    <pre className="text-[10px] md:text-xs font-mono text-zinc-300 leading-relaxed">
{`{
  "module": "WiFi Sentry",
  "status": "${status.toUpperCase()}",
  "risk_score": ${anomalyScore.toFixed(2)},
  "action_required": ${anomalyScore > 0.5 ? 'true' : 'false'},
  "backend_latency": "12ms"
}`}
                    </pre>
                </div>
                
                {/* Simulated Alert State */}
                <div className={`p-4 border-t border-white/10 transition-colors duration-300 ${status === 'critical' ? 'bg-crimson-900/30' : 'bg-zinc-900'}`}>
                    <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-full ${status === 'critical' ? 'bg-crimson-600 text-white shadow-[0_0_10px_#e11d48]' : 'bg-zinc-800 text-zinc-600'}`}>
                            {status === 'critical' ? <Lock className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
                         </div>
                         <div>
                             <div className={`text-sm font-bold font-display ${status === 'critical' ? 'text-crimson-400' : 'text-zinc-400'}`}>
                                 {status === 'critical' ? 'AUTO-DEFENSE ENGAGED' : 'SYSTEM NORMAL'}
                             </div>
                             <div className="text-xs text-zinc-500 font-mono">
                                 {status === 'critical' ? 'Connection terminated by Policy Engine' : 'Routine monitoring active'}
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default WifiDetectionModule;

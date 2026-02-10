
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Siren, WifiOff, Lock, Activity, Smartphone, AlertTriangle, CheckCircle, Brain, Terminal } from 'lucide-react';

interface ModuleScore {
  name: string;
  score: number;
  icon: any;
  status: 'safe' | 'warning' | 'critical';
}

const AutomatedDefenseModule: React.FC = () => {
  const [scenario, setScenario] = useState<'safe' | 'suspicious' | 'attack'>('safe');
  const [globalRisk, setGlobalRisk] = useState(5);
  const [moduleScores, setModuleScores] = useState<ModuleScore[]>([
    { name: 'WiFi Security', score: 5, icon: WifiOff, status: 'safe' },
    { name: 'MITM Monitor', score: 2, icon: Activity, status: 'safe' },
    { name: 'App Scanner', score: 0, icon: Smartphone, status: 'safe' },
    { name: 'Net Anomaly', score: 8, icon: Activity, status: 'safe' },
  ]);
  const [logs, setLogs] = useState<any[]>([]);

  // Simulation Logic
  useEffect(() => {
    let targetRisk = 5;
    let newModuleScores = [...moduleScores];
    let newLog = null;

    if (scenario === 'safe') {
      targetRisk = 5;
      newModuleScores = newModuleScores.map(m => ({ ...m, score: Math.floor(Math.random() * 10), status: 'safe' }));
    } else if (scenario === 'suspicious') {
      targetRisk = 45;
      newModuleScores = [
        { name: 'WiFi Security', score: 20, icon: WifiOff, status: 'safe' },
        { name: 'MITM Monitor', score: 15, icon: Activity, status: 'safe' },
        { name: 'App Scanner', score: 65, icon: Smartphone, status: 'warning' },
        { name: 'Net Anomaly', score: 40, icon: Activity, status: 'warning' },
      ];
      if (Math.random() > 0.7) {
          newLog = { time: new Date().toLocaleTimeString(), type: 'warning', msg: 'Suspicious App Activity detected. User notified.' };
      }
    } else if (scenario === 'attack') {
      targetRisk = 92;
      newModuleScores = [
        { name: 'WiFi Security', score: 85, icon: WifiOff, status: 'critical' },
        { name: 'MITM Monitor', score: 95, icon: Activity, status: 'critical' },
        { name: 'App Scanner', score: 30, icon: Smartphone, status: 'safe' },
        { name: 'Net Anomaly', score: 88, icon: Activity, status: 'critical' },
      ];
      if (Math.random() > 0.6) {
           const actions = [
               'MITM Detected! Disconnecting WiFi...',
               'Blocking traffic via VpnService...',
               'Alerting Security Operations Center...',
               'Isolating device container...'
           ];
           newLog = { time: new Date().toLocaleTimeString(), type: 'critical', msg: actions[Math.floor(Math.random() * actions.length)] };
      }
    }

    // Animate Risk Score
    setGlobalRisk(prev => prev + (targetRisk - prev) * 0.1);
    setModuleScores(newModuleScores);
    
    if (newLog) {
        setLogs(prev => [newLog, ...prev].slice(0, 5));
    }

  }, [scenario, moduleScores]);

  // Helper for color
  const getRiskColor = (score: number) => {
      if (score < 30) return 'text-emerald-500';
      if (score < 70) return 'text-amber-500';
      return 'text-crimson-500';
  };
  
  const getRiskBg = (score: number) => {
      if (score < 30) return 'bg-emerald-500';
      if (score < 70) return 'bg-amber-500';
      return 'bg-crimson-500';
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-start border-b border-white/10 pb-6">
        <div>
           <h1 className="text-2xl font-bold font-display text-white mb-1 tracking-wide">AUTOMATED DEFENSE ENGINE</h1>
           <p className="text-zinc-400">Centralized Decision Logic, Alerting & Response Automation</p>
        </div>
        <div className="flex bg-black rounded-lg p-1 border border-white/10">
            <button 
                onClick={() => setScenario('safe')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${scenario === 'safe' ? 'bg-emerald-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                Safe State
            </button>
            <button 
                onClick={() => setScenario('suspicious')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${scenario === 'suspicious' ? 'bg-amber-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                Suspicious Activity
            </button>
            <button 
                onClick={() => setScenario('attack')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${scenario === 'attack' ? 'bg-crimson-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                Active Attack
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Global Risk Gauge */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm">
             <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-crimson-500 opacity-20"></div>
             
             <h2 className="text-lg font-semibold text-white mb-6 font-display">GLOBAL THREAT SCORE</h2>
             
             <div className="relative w-48 h-48 flex items-center justify-center">
                 {/* Background Circle */}
                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                     <circle cx="96" cy="96" r="88" stroke="#09090b" strokeWidth="12" fill="none" />
                     <circle 
                         cx="96" cy="96" r="88" 
                         stroke="currentColor" 
                         strokeWidth="12" 
                         fill="none" 
                         strokeDasharray="552" 
                         strokeDashoffset={552 - (552 * (globalRisk / 100))}
                         className={`transition-all duration-500 ${getRiskColor(globalRisk)} drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                         strokeLinecap="round"
                     />
                 </svg>
                 <div className="absolute flex flex-col items-center">
                     <span className={`text-5xl font-bold font-display ${getRiskColor(globalRisk)}`}>
                         {globalRisk.toFixed(0)}
                     </span>
                     <span className="text-xs text-zinc-500 uppercase font-bold mt-1 font-mono">
                         / 100
                     </span>
                 </div>
             </div>

             <div className={`mt-6 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 border font-mono tracking-wide ${
                 globalRisk < 30 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                 globalRisk < 70 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                 'bg-crimson-500/10 text-crimson-500 border-crimson-500/20'
             }`}>
                 {globalRisk < 30 ? <CheckCircle className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                 {globalRisk < 30 ? 'SYSTEM SECURE' : globalRisk < 70 ? 'ELEVATED RISK' : 'DEFENSE ACTIVE'}
             </div>
        </div>

        {/* Center: Module Status Breakdown */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 space-y-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white mb-4 font-display">DETECTION VECTORS</h2>
            <div className="space-y-4">
                {moduleScores.map((module) => (
                    <div key={module.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-300 flex items-center gap-2 font-mono text-xs uppercase">
                                <module.icon className={`w-4 h-4 ${module.status === 'safe' ? 'text-zinc-500' : module.status === 'warning' ? 'text-amber-500' : 'text-crimson-500'}`} />
                                {module.name}
                            </span>
                            <span className={`font-mono font-bold ${getRiskColor(module.score)}`}>{module.score}%</span>
                        </div>
                        <div className="w-full bg-black rounded-full h-1.5 border border-zinc-800">
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ${getRiskBg(module.score)}`} 
                                style={{ width: `${module.score}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 text-xs text-zinc-500 font-mono">
                <p>
                    :: AGGREGATION LOGIC ::<br/>
                    Global Score is a weighted average. Critical events (MITM, Root) carry 3x weight vs warnings.
                </p>
            </div>
        </div>

        {/* Right: Defense Log & Actions */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 flex flex-col backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 font-display">
                <Siren className="w-5 h-5 text-crimson-500" /> AUTOMATED RESPONSE
            </h2>
            
            <div className="flex-1 space-y-3 overflow-hidden relative">
                {logs.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-zinc-600 text-sm italic font-mono">
                        [NO RECENT ACTIONS]
                    </div>
                ) : (
                    logs.map((log, i) => (
                        <div key={i} className={`p-3 rounded border text-sm animate-in fade-in slide-in-from-right-4 duration-300 ${
                            log.type === 'critical' ? 'bg-crimson-900/20 border-crimson-500/30 text-crimson-200' : 'bg-amber-900/20 border-amber-500/30 text-amber-200'
                        }`}>
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-xs uppercase font-display tracking-wider">{log.type === 'critical' ? 'DEFENSE TRIGGERED' : 'USER ALERT'}</span>
                                <span className="text-[10px] opacity-70 font-mono">{log.time}</span>
                            </div>
                            <p className="text-xs">{log.msg}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Manual Override */}
            <div className="mt-4 pt-4 border-t border-white/5">
                <div className="text-[10px] text-zinc-500 mb-2 font-mono uppercase font-bold tracking-wider">Manual Override</div>
                <div className="flex gap-2">
                    <button className="flex-1 bg-crimson-600 hover:bg-crimson-700 text-white text-xs py-2 rounded transition-colors font-bold font-mono shadow-[0_0_10px_rgba(225,29,72,0.3)]">
                        LOCKDOWN
                    </button>
                    <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs py-2 rounded transition-colors border border-zinc-700 font-mono">
                        RESET
                    </button>
                </div>
            </div>
        </div>

      </div>

      {/* Explainability Section */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-crimson-500" />
              <h3 className="text-lg font-semibold text-white font-display">EXPLAINABLE LOGIC (XAI)</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                  <div className="bg-black p-4 rounded-lg border border-white/10 font-mono text-xs text-zinc-300 relative">
                      <div className="absolute top-2 right-2 flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-crimson-500 mb-2">// Current Policy Evaluation</div>
                      <p>IF <span className="text-crimson-400">GlobalRisk &gt; 80</span> OR <span className="text-crimson-400">MITM_Score &gt; 90</span>:</p>
                      <p className="pl-4 text-emerald-400">→ ACTION: DISCONNECT_WIFI</p>
                      <p className="pl-4 text-emerald-400">→ ACTION: ENABLE_VPN_LOCKDOWN</p>
                      <br/>
                      <p>ELSE IF <span className="text-amber-400">GlobalRisk &gt; 50</span>:</p>
                      <p className="pl-4 text-amber-300">→ ACTION: NOTIFY_USER_HIGH_PRIORITY</p>
                  </div>
              </div>
              
              <div>
                  <h4 className="text-sm font-medium text-white mb-2 font-display">DECISION RATIONALE</h4>
                  <ul className="space-y-3 text-sm text-zinc-400">
                      <li className="flex gap-2">
                          <CheckCircle className="w-4 h-4 text-zinc-600 mt-0.5" />
                          <span>
                              Decisions are based on a <strong>Multi-Vector Correlation</strong> matrix. A single low-confidence anomaly (e.g., slight latency spike) will not trigger a block.
                          </span>
                      </li>
                      <li className="flex gap-2">
                          <CheckCircle className="w-4 h-4 text-zinc-600 mt-0.5" />
                          <span>
                              <strong>Compliance:</strong> Traffic blocking is achieved via the Android <code className="bg-zinc-800 px-1 rounded text-xs text-zinc-200">VpnService</code> API, which allows local packet filtering without root access.
                          </span>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AutomatedDefenseModule;


import React, { useState, useEffect } from 'react';
import { Zap, Activity, RefreshCw, BarChart2, TrendingUp, AlertTriangle, Shield, Clock } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Bar, CartesianGrid, Legend } from 'recharts';

const NetworkAnomalyModule: React.FC = () => {
  const [simulationMode, setSimulationMode] = useState<'normal' | 'anomaly'>('normal');
  const [trafficData, setTrafficData] = useState<any[]>([]);
  const [anomalyScore, setAnomalyScore] = useState(0.1);
  const [adaptationProgress, setAdaptationProgress] = useState(0);

  // Constants
  const DATA_POINTS = 30;

  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(prev => {
        // 1. Generate "Predicted" Baseline (LSTM Output)
        // A sine wave represents daily usage patterns (e.g., active during day, low at night)
        const timeIndex = new Date().getTime() / 1000;
        const baseline = 50 + Math.sin(timeIndex / 5) * 20;

        // 2. Generate "Actual" Traffic
        let actual = baseline + (Math.random() * 10 - 5); // Normal noise
        
        if (simulationMode === 'anomaly') {
          // Injection attack or Exfiltration spike
          actual += 80 + (Math.random() * 40); 
        }

        // 3. Calculate Residual (Reconstruction Error)
        const residual = Math.abs(actual - baseline);
        const currentScore = Math.min(1.0, residual / 100);
        
        setAnomalyScore(prevScore => prevScore * 0.8 + currentScore * 0.2); // Smooth updates

        // Update Adaptation Progress (Simulation of Online Learning)
        if (simulationMode === 'normal') {
            setAdaptationProgress(p => Math.min(100, p + 0.5));
        }

        const newData = [...prev, {
          time: new Date().toLocaleTimeString([], { second: '2-digit', minute: '2-digit' }),
          baseline: Math.max(0, baseline),
          actual: Math.max(0, actual),
          residual: residual
        }];

        return newData.slice(-DATA_POINTS);
      });
    }, 800);

    return () => clearInterval(interval);
  }, [simulationMode]);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-start border-b border-white/10 pb-6">
        <div>
           <h1 className="text-2xl font-bold font-display text-white mb-1">NETWORK ANOMALY DETECTION</h1>
           <p className="text-zinc-400">Time-Series Forecasting (LSTM) with User-Adaptive Baselines</p>
        </div>
        <div className="flex bg-black rounded-lg p-1 border border-white/10">
            <button 
                onClick={() => setSimulationMode('normal')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${simulationMode === 'normal' ? 'bg-emerald-600 text-white shadow-[0_0_10px_#10b981]' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                Normal Traffic
            </button>
            <button 
                onClick={() => setSimulationMode('anomaly')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${simulationMode === 'anomaly' ? 'bg-crimson-600 text-white shadow-[0_0_10px_#e11d48]' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                Simulate Data Exfiltration
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Real-time Analysis */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2 font-display">
                            <Activity className="w-5 h-5 text-crimson-500" /> FORECASTING VS. ACTUAL
                        </h2>
                        <p className="text-xs text-zinc-500">LSTM model predicts expected volume. Large deviations trigger alerts.</p>
                    </div>
                    <div className="flex gap-4 text-xs font-medium font-mono">
                        <div className="flex items-center gap-2 text-indigo-400">
                            <div className="w-3 h-1 bg-indigo-400"></div> Predicted (Baseline)
                        </div>
                        <div className="flex items-center gap-2 text-emerald-400">
                            <div className="w-3 h-1 bg-emerald-400"></div> Actual Flow
                        </div>
                    </div>
                </div>

                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={trafficData}>
                            <defs>
                                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={simulationMode === 'anomaly' ? "#f43f5e" : "#10b981"} stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor={simulationMode === 'anomaly' ? "#f43f5e" : "#10b981"} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                            <XAxis dataKey="time" hide />
                            <YAxis stroke="#71717a" fontSize={10} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#e4e4e7' }} />
                            
                            {/* Predicted Line (Baseline) */}
                            <Line type="monotone" dataKey="baseline" stroke="#818cf8" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                            
                            {/* Actual Area */}
                            <Area 
                                type="monotone" 
                                dataKey="actual" 
                                stroke={simulationMode === 'anomaly' ? "#f43f5e" : "#10b981"} 
                                fill="url(#colorActual)" 
                                strokeWidth={2} 
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Protocol Distribution Features */}
                 <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                     <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2 font-display">
                        <BarChart2 className="w-4 h-4 text-zinc-400" /> PROTOCOL DISTRIBUTION
                     </h3>
                     <div className="space-y-3">
                         <div>
                             <div className="flex justify-between text-xs text-zinc-400 mb-1 font-mono">
                                 <span>HTTPS (Port 443)</span>
                                 <span>{simulationMode === 'anomaly' ? '30%' : '85%'}</span>
                             </div>
                             <div className="w-full bg-black rounded-full h-1.5 border border-white/5">
                                 <div className={`h-full rounded-full transition-all duration-500 ${simulationMode === 'anomaly' ? 'w-[30%] bg-zinc-600' : 'w-[85%] bg-emerald-500'}`}></div>
                             </div>
                         </div>
                         <div>
                             <div className="flex justify-between text-xs text-zinc-400 mb-1 font-mono">
                                 <span>Unknown/High Entropy</span>
                                 <span className={simulationMode === 'anomaly' ? 'text-crimson-400 font-bold' : ''}>{simulationMode === 'anomaly' ? '65%' : '5%'}</span>
                             </div>
                             <div className="w-full bg-black rounded-full h-1.5 border border-white/5">
                                 <div className={`h-full rounded-full transition-all duration-500 ${simulationMode === 'anomaly' ? 'w-[65%] bg-crimson-500' : 'w-[5%] bg-zinc-600'}`}></div>
                             </div>
                         </div>
                         <div>
                             <div className="flex justify-between text-xs text-zinc-400 mb-1 font-mono">
                                 <span>DNS (Port 53)</span>
                                 <span>{simulationMode === 'anomaly' ? '5%' : '10%'}</span>
                             </div>
                             <div className="w-full bg-black rounded-full h-1.5 border border-white/5">
                                 <div className="bg-blue-500 h-full rounded-full" style={{ width: '10%' }}></div>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Anomaly Gauge */}
                 <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 flex flex-col justify-center items-center backdrop-blur-sm">
                     <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                            <circle cx="64" cy="64" r="56" stroke="#27272a" strokeWidth="8" fill="none" />
                            <circle 
                                cx="64" cy="64" r="56" 
                                stroke={anomalyScore > 0.6 ? "#f43f5e" : "#10b981"} 
                                strokeWidth="8" 
                                fill="none" 
                                strokeDasharray="351" 
                                strokeDashoffset={351 - (351 * anomalyScore)}
                                className="transition-all duration-300 ease-out drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className={`text-2xl font-bold font-display ${anomalyScore > 0.6 ? 'text-crimson-500' : 'text-emerald-400'}`}>
                                {(anomalyScore * 100).toFixed(0)}
                            </span>
                            <span className="text-[10px] text-zinc-500 uppercase font-mono font-bold">Score</span>
                        </div>
                     </div>
                     <div className={`text-sm font-medium mt-2 font-display tracking-wide ${anomalyScore > 0.6 ? 'text-crimson-500' : 'text-zinc-300'}`}>
                         {anomalyScore > 0.6 ? 'CRITICAL ANOMALY' : 'NORMAL BEHAVIOR'}
                     </div>
                 </div>
            </div>
        </div>

        {/* Right Column: Adaptive Learning */}
        <div className="space-y-6">
            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4 font-display">
                    <RefreshCw className="w-5 h-5 text-amber-500" /> ADAPTIVE LEARNING
                </h2>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    The model updates continuously (Online Learning) to adapt to the user's specific behavior patterns without retraining from scratch.
                </p>

                {/* Adaptive Pipeline Visualization */}
                <div className="space-y-6 relative">
                    <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-zinc-800"></div>

                    <div className="relative flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-black border border-zinc-700 flex items-center justify-center text-xs z-10 shrink-0 text-zinc-400 font-mono">1</div>
                        <div>
                            <h4 className="text-sm font-medium text-zinc-200">Collect Trusted Samples</h4>
                            <p className="text-xs text-zinc-500">Cache trusted traffic windows (e.g., nightly backups) that deviate from global baseline.</p>
                        </div>
                    </div>

                    <div className="relative flex items-start gap-4">
                         <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs z-10 shrink-0 transition-colors duration-500 font-mono ${simulationMode === 'normal' ? 'bg-amber-500/20 border-amber-500 text-amber-500 animate-pulse' : 'bg-black border-zinc-700 text-zinc-400'}`}>
                             {simulationMode === 'normal' ? <Zap className="w-3 h-3" /> : '2'}
                         </div>
                        <div>
                            <h4 className="text-sm font-medium text-zinc-200">Incremental Weight Update</h4>
                            <p className="text-xs text-zinc-500">Fine-tune LSTM weights on-device using trusted samples.</p>
                            {simulationMode === 'normal' && (
                                <div className="mt-2 text-xs font-mono text-amber-500 flex items-center gap-2">
                                    Updating... <span className="animate-pulse">||||</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-black border border-zinc-700 flex items-center justify-center text-xs z-10 shrink-0 text-zinc-400 font-mono">3</div>
                        <div>
                            <h4 className="text-sm font-medium text-zinc-200">Update Detection Boundary</h4>
                            <p className="text-xs text-zinc-500">Shift anomaly threshold to reduce false positives for this specific user.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-black rounded-lg border border-white/5">
                    <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-zinc-400 font-mono">User Profile Confidence</span>
                        <span className="text-emerald-500 font-bold">{adaptationProgress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 border border-white/5">
                        <div 
                            className="bg-emerald-500 h-full rounded-full transition-all duration-300 shadow-[0_0_8px_#10b981]" 
                            style={{ width: `${adaptationProgress}%` }}
                        ></div>
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-2">
                        Higher confidence reduces false alarms for habitual usage spikes.
                    </p>
                </div>
            </div>

            {/* Model Architecture Info */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-white mb-3 font-display">MODEL ARCHITECTURE</h3>
                <div className="space-y-2 text-xs text-zinc-400">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Core Model</span>
                        <span className="text-zinc-200 font-mono">LSTM Autoencoder</span>
                    </div>
                     <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Input Sequence</span>
                        <span className="text-zinc-200 font-mono">60s Traffic Window</span>
                    </div>
                     <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Optimization</span>
                        <span className="text-zinc-200 font-mono">Online Stochastic Gradient</span>
                    </div>
                     <div className="flex justify-between">
                        <span>Outlier Logic</span>
                        <span className="text-zinc-200 font-mono">Isolation Forest (Ensemble)</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default NetworkAnomalyModule;

import React, { useState } from 'react';
import { GitBranch, Database, Cpu, Cloud, ShieldCheck, RefreshCw, AlertTriangle, Check, ArrowRight, BarChart, FileCode } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const MLLifecycleModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'metrics' | 'deployment'>('pipeline');

  // Mock Data for Charts
  const trainingHistory = [
    { epoch: 1, accuracy: 0.65, loss: 0.8 },
    { epoch: 5, accuracy: 0.78, loss: 0.5 },
    { epoch: 10, accuracy: 0.85, loss: 0.35 },
    { epoch: 15, accuracy: 0.91, loss: 0.22 },
    { epoch: 20, accuracy: 0.94, loss: 0.15 },
    { epoch: 25, accuracy: 0.96, loss: 0.11 },
  ];

  const confusionData = [
    { name: 'True Positive', value: 945, fill: '#10b981' }, // emerald
    { name: 'False Positive', value: 45, fill: '#f59e0b' }, // amber
    { name: 'True Negative', value: 890, fill: '#3b82f6' }, // blue
    { name: 'False Negative', value: 12, fill: '#f43f5e' }, // rose
  ];

  const adversarialData = [
    { subject: 'Standard Accuracy', A: 96, fullMark: 100 },
    { subject: 'FGSM Attack', A: 82, fullMark: 100 }, // Fast Gradient Sign Method
    { subject: 'PGD Attack', A: 78, fullMark: 100 }, // Projected Gradient Descent
    { subject: 'Noise Robustness', A: 92, fullMark: 100 },
    { subject: 'Evasion Rate', A: 15, fullMark: 100 }, // Lower is better (inverted for radar? Let's assume robustness score)
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
           <h1 className="text-2xl font-bold text-white mb-1">ML Training & Evaluation Strategy</h1>
           <p className="text-slate-400">Production Lifecycle: From Data Collection to Canary Deployment</p>
        </div>
        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
            <button 
                onClick={() => setActiveTab('pipeline')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'pipeline' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
                Pipeline
            </button>
            <button 
                onClick={() => setActiveTab('metrics')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'metrics' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
                Metrics
            </button>
            <button 
                onClick={() => setActiveTab('deployment')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'deployment' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
                Deployment
            </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="grid grid-cols-1 gap-8">
        
        {activeTab === 'pipeline' && (
            <div className="space-y-8">
                {/* Visual Pipeline */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 overflow-hidden relative">
                    <h2 className="text-lg font-semibold text-white mb-8 flex items-center gap-2">
                        <GitBranch className="w-5 h-5 text-indigo-400" /> Data & Training Pipeline
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                        {/* Connecting Line */}
                        <div className="absolute top-8 left-0 right-0 h-0.5 bg-slate-800 -z-10 hidden md:block"></div>

                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="w-16 h-16 bg-slate-950 border border-slate-700 rounded-full flex items-center justify-center text-slate-300 shadow-lg">
                                <Database className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-200">1. Data Ingestion</h3>
                                <p className="text-xs text-slate-500 mt-1">Telemetry, APKs, PCAP</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="w-16 h-16 bg-slate-950 border border-slate-700 rounded-full flex items-center justify-center text-slate-300 shadow-lg">
                                <FileCode className="w-7 h-7" />
                            </div>
                             <div>
                                <h3 className="text-sm font-bold text-slate-200">2. Labeling</h3>
                                <p className="text-xs text-slate-500 mt-1">Auto-Sandbox + Human</p>
                            </div>
                        </div>

                         {/* Step 3 */}
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="w-16 h-16 bg-indigo-900/20 border border-indigo-500/50 rounded-full flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-900/20">
                                <Cloud className="w-7 h-7" />
                            </div>
                             <div>
                                <h3 className="text-sm font-bold text-indigo-300">3. Offline Training</h3>
                                <p className="text-xs text-slate-500 mt-1">GPU Cluster (PyTorch)</p>
                            </div>
                        </div>

                         {/* Step 4 */}
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="w-16 h-16 bg-slate-950 border border-slate-700 rounded-full flex items-center justify-center text-slate-300 shadow-lg">
                                <Cpu className="w-7 h-7" />
                            </div>
                             <div>
                                <h3 className="text-sm font-bold text-slate-200">4. Optimization</h3>
                                <p className="text-xs text-slate-500 mt-1">Quantization -> TFLite</p>
                            </div>
                        </div>

                         {/* Step 5 */}
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="w-16 h-16 bg-emerald-900/20 border border-emerald-500/50 rounded-full flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-900/20">
                                <RefreshCw className="w-7 h-7" />
                            </div>
                             <div>
                                <h3 className="text-sm font-bold text-emerald-400">5. Online Learning</h3>
                                <p className="text-xs text-slate-500 mt-1">On-Device Adaptation</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-white font-semibold mb-4">Offline vs. Online Strategy</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                                <h4 className="text-sm font-bold text-indigo-400 mb-1">Offline Training (Cloud)</h4>
                                <p className="text-xs text-slate-400 mb-2">
                                    Heavy lifting. Retrains weekly on global datasets (VirusTotal feeds, aggregated telemetry).
                                </p>
                                <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
                                    <li>Generates base model weights.</li>
                                    <li>Handles Adversarial Training (FGSM/PGD).</li>
                                    <li>Output: <code className="bg-slate-800 px-1 rounded">model_v2.tflite</code></li>
                                </ul>
                            </div>
                             <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                                <h4 className="text-sm font-bold text-emerald-400 mb-1">Online Learning (Device)</h4>
                                <p className="text-xs text-slate-400 mb-2">
                                    Fine-tuning. Adapts the base model to user-specific behavior (e.g., normal sleep hours, home WiFi).
                                </p>
                                <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
                                    <li>Uses Transfer Learning on the last dense layer.</li>
                                    <li>Privacy: User data never leaves the device.</li>
                                    <li>Adapts to concept drift in network usage.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-white font-semibold mb-4">Adversarial Robustness</h3>
                        <p className="text-xs text-slate-400 mb-4">
                            Models are hardened against evasion attacks using Adversarial Training.
                        </p>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={adversarialData}>
                                    <PolarGrid stroke="#334155" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Robustness"
                                        dataKey="A"
                                        stroke="#818cf8"
                                        fill="#818cf8"
                                        fillOpacity={0.3}
                                    />
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#e2e8f0' }} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'metrics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Training Curves */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Training History (Loss vs Accuracy)</h3>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trainingHistory}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis dataKey="epoch" stroke="#64748b" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
                                <YAxis yAxisId="left" stroke="#10b981" />
                                <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#e2e8f0' }} />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} name="Accuracy" />
                                <Line yAxisId="right" type="monotone" dataKey="loss" stroke="#f43f5e" strokeWidth={2} name="Loss" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Confusion Matrix */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Confusion Matrix (Validation Set)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={confusionData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                                <XAxis type="number" stroke="#64748b" />
                                <YAxis dataKey="name" type="category" width={100} stroke="#94a3b8" fontSize={11} />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#e2e8f0' }} />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex justify-between text-xs text-slate-400 px-4">
                        <span>Precision: 95.4%</span>
                        <span>Recall: 98.7%</span>
                        <span>F1-Score: 97.0%</span>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'deployment' && (
             <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                     <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" /> Model Rollout Strategy
                    </h3>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-400">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-950 border-b border-slate-800">
                                <tr>
                                    <th className="px-6 py-3">Model Version</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Distribution</th>
                                    <th className="px-6 py-3">Accuracy</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                <tr className="bg-slate-900/50">
                                    <td className="px-6 py-4 font-mono text-slate-200">v2.4.1 (Current)</td>
                                    <td className="px-6 py-4"><span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-xs border border-emerald-500/20">Active</span></td>
                                    <td className="px-6 py-4">90% of Fleet</td>
                                    <td className="px-6 py-4 text-emerald-400">96.2%</td>
                                    <td className="px-6 py-4">
                                        <button className="text-slate-400 hover:text-white transition-colors">Details</button>
                                    </td>
                                </tr>
                                <tr className="bg-slate-900/50">
                                    <td className="px-6 py-4 font-mono text-slate-200">v2.5.0-rc1</td>
                                    <td className="px-6 py-4"><span className="bg-amber-500/10 text-amber-500 px-2 py-1 rounded text-xs border border-amber-500/20">Canary</span></td>
                                    <td className="px-6 py-4">10% of Fleet</td>
                                    <td className="px-6 py-4 text-amber-400">97.1%</td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <button className="text-indigo-400 hover:text-indigo-300 font-medium">Promote</button>
                                        <button className="text-rose-400 hover:text-rose-300 font-medium">Rollback</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h4 className="text-white font-semibold mb-2">Canary Testing Logic</h4>
                        <p className="text-xs text-slate-400 mb-4">
                            New models are deployed to a random 10% subset of devices (Canary Group). Performance metrics are compared against the Control Group for 24 hours before full rollout.
                        </p>
                        <div className="flex gap-2">
                             <div className="flex-1 bg-slate-950 p-3 rounded border border-slate-800">
                                 <div className="text-xs text-slate-500 mb-1">False Positive Rate</div>
                                 <div className="flex justify-between">
                                     <span className="text-emerald-500 font-bold">0.8% (Canary)</span>
                                     <span className="text-slate-400">1.2% (Current)</span>
                                 </div>
                             </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h4 className="text-white font-semibold mb-2">Automatic Rollback</h4>
                        <div className="p-3 bg-rose-950/20 border border-rose-500/30 rounded flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-rose-300 font-medium">Trigger Condition</p>
                                <p className="text-xs text-rose-300/70 mt-1">
                                    If <strong>Inference Latency {'>'} 200ms</strong> OR <strong>Battery Drain {'>'} 5%/hr</strong>, the system automatically reverts to the previous stable version (v2.4.1).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        )}
      </div>
    </div>
  );
};

export default MLLifecycleModule;
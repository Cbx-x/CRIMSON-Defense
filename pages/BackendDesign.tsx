import React, { useState } from 'react';
import { Server, Database, Cloud, Lock, Code, Terminal, ChevronRight, Box, Cpu, HardDrive } from 'lucide-react';

const BackendDesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'api' | 'schema' | 'infra'>('api');

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
           <h1 className="text-2xl font-bold text-white mb-1">Cloud Backend Design</h1>
           <p className="text-slate-400">FastAPI Microservices, PostgreSQL Schema & Scalable Infrastructure</p>
        </div>
        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
            <button 
                onClick={() => setActiveTab('api')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'api' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
                API Endpoints
            </button>
            <button 
                onClick={() => setActiveTab('schema')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'schema' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
                DB Schema
            </button>
            <button 
                onClick={() => setActiveTab('infra')}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'infra' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
                Cloud Infra
            </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Context / Code */}
        <div className="lg:col-span-2 space-y-6">
            
            {activeTab === 'api' && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                        <div className="flex items-center gap-2">
                             <Terminal className="w-5 h-5 text-indigo-400" />
                             <span className="text-sm font-bold text-slate-200">API Specification (FastAPI / OpenAPI)</span>
                        </div>
                        <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">v1.2.0 Active</span>
                    </div>

                    <div className="divide-y divide-slate-800">
                        {/* Auth Endpoint */}
                        <div className="p-4 hover:bg-slate-800/30 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded border border-emerald-500/30">POST</span>
                                <code className="text-sm text-slate-200 font-mono">/api/v1/auth/device-login</code>
                            </div>
                            <p className="text-xs text-slate-400 mb-3 pl-14">
                                Exchanges Android KeyStore attestation for a short-lived JWT access token.
                            </p>
                            <div className="pl-14 bg-slate-950 rounded p-3 border border-slate-800 relative">
                                <div className="text-[10px] text-slate-500 absolute top-2 right-2">Request Body</div>
                                <pre className="text-xs text-indigo-300 font-mono">
{`{
  "device_id": "uuid-v4",
  "attestation_proof": "base64_encoded_signature",
  "nonce": "random_string"
}`}
                                </pre>
                            </div>
                        </div>

                        {/* Threat Report Endpoint */}
                        <div className="p-4 hover:bg-slate-800/30 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded border border-amber-500/30">POST</span>
                                <code className="text-sm text-slate-200 font-mono">/api/v1/threats/report</code>
                            </div>
                            <p className="text-xs text-slate-400 mb-3 pl-14">
                                Uplinks detected threat vector for cloud correlation and Gemini analysis.
                            </p>
                            <div className="pl-14 bg-slate-950 rounded p-3 border border-slate-800 relative">
                                <pre className="text-xs text-indigo-300 font-mono">
{`@router.post("/threats/report")
async def report_threat(
    threat: ThreatModel, 
    current_user: Annotated[User, Depends(get_current_device)]
):
    # 1. Store raw log
    await db.threats.insert_one(threat.dict())
    
    # 2. Trigger async ML analysis task (Celery/Redis)
    analyze_threat_task.delay(threat.id, threat.features)
    
    return {"status": "analyzing", "ticket_id": threat.id}`}
                                </pre>
                            </div>
                        </div>

                        {/* ML Inference Endpoint */}
                         <div className="p-4 hover:bg-slate-800/30 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded border border-blue-500/30">POST</span>
                                <code className="text-sm text-slate-200 font-mono">/api/v1/ml/classify-app</code>
                            </div>
                            <p className="text-xs text-slate-400 mb-3 pl-14">
                                Offloads heavy static analysis (APK decomposition) to cloud workers.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'schema' && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-hidden">
                    <div className="flex items-center gap-2 mb-6">
                        <Database className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-lg font-bold text-white">Database Schema (PostgreSQL + TimescaleDB)</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                        {/* Connecting Lines (Conceptual) */}
                        <div className="absolute top-1/2 left-1/2 w-8 h-0.5 bg-slate-700 -translate-x-1/2 hidden md:block"></div>

                        {/* Devices Table */}
                        <div className="border border-slate-700 rounded-lg bg-slate-950">
                            <div className="bg-slate-800 px-3 py-2 border-b border-slate-700 font-mono text-sm font-bold text-slate-200">
                                public.devices
                            </div>
                            <div className="p-3 space-y-2 text-xs font-mono">
                                <div className="flex justify-between border-b border-slate-800 pb-1">
                                    <span className="text-amber-400">device_id (PK)</span>
                                    <span className="text-slate-500">UUID</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-800 pb-1">
                                    <span className="text-slate-300">hw_model</span>
                                    <span className="text-slate-500">VARCHAR(50)</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-800 pb-1">
                                    <span className="text-slate-300">os_version</span>
                                    <span className="text-slate-500">VARCHAR(20)</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-800 pb-1">
                                    <span className="text-slate-300">last_seen</span>
                                    <span className="text-slate-500">TIMESTAMPTZ</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-300">trust_score</span>
                                    <span className="text-slate-500">FLOAT</span>
                                </div>
                            </div>
                        </div>

                        {/* Threat Events Table */}
                        <div className="border border-slate-700 rounded-lg bg-slate-950">
                            <div className="bg-slate-800 px-3 py-2 border-b border-slate-700 font-mono text-sm font-bold text-slate-200">
                                public.threat_events
                            </div>
                             <div className="p-3 space-y-2 text-xs font-mono">
                                <div className="flex justify-between border-b border-slate-800 pb-1">
                                    <span className="text-amber-400">event_id (PK)</span>
                                    <span className="text-slate-500">BIGSERIAL</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-800 pb-1">
                                    <span className="text-emerald-400">device_id (FK)</span>
                                    <span className="text-slate-500">UUID</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-800 pb-1">
                                    <span className="text-slate-300">threat_type</span>
                                    <span className="text-slate-500">ENUM</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-800 pb-1">
                                    <span className="text-slate-300">severity</span>
                                    <span className="text-slate-500">INT</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-300">payload_json</span>
                                    <span className="text-slate-500">JSONB</span>
                                </div>
                            </div>
                        </div>

                         {/* Telemetry Hypertable */}
                         <div className="border border-slate-700 rounded-lg bg-slate-950 md:col-span-2 md:mx-auto md:w-2/3 mt-4">
                            <div className="bg-slate-800 px-3 py-2 border-b border-slate-700 font-mono text-sm font-bold text-slate-200 flex justify-between">
                                <span>timescale.net_metrics</span>
                                <span className="text-[10px] bg-indigo-600 px-1 rounded text-white">HYPERTABLE</span>
                            </div>
                             <div className="p-3 space-y-2 text-xs font-mono">
                                <div className="flex justify-between border-b border-slate-800 pb-1">
                                    <span className="text-indigo-400">timestamp (PK)</span>
                                    <span className="text-slate-500">TIMESTAMPTZ</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-800 pb-1">
                                    <span className="text-indigo-400">device_id (PK)</span>
                                    <span className="text-slate-500">UUID</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-800 pb-1">
                                    <span className="text-slate-300">bytes_in</span>
                                    <span className="text-slate-500">BIGINT</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-800 pb-1">
                                    <span className="text-slate-300">bytes_out</span>
                                    <span className="text-slate-500">BIGINT</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-300">latency_ms</span>
                                    <span className="text-slate-500">INT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'infra' && (
                 <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Cloud className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-lg font-bold text-white">Cloud Infrastructure (AWS/GCP)</h3>
                    </div>

                    <div className="relative border border-slate-700 rounded-xl p-8 bg-slate-950/50">
                        {/* Flow Diagram */}
                        <div className="flex flex-col items-center gap-8">
                            
                            {/* Load Balancer */}
                            <div className="w-64 border border-indigo-500/50 bg-indigo-900/10 rounded-lg p-4 text-center relative">
                                <div className="text-sm font-bold text-indigo-300">Application Load Balancer</div>
                                <div className="text-xs text-indigo-400/70">TLS Termination & WAF</div>
                                <div className="absolute -bottom-6 left-1/2 w-0.5 h-6 bg-slate-600"></div>
                            </div>

                            {/* ECS Cluster */}
                            <div className="w-full border border-slate-700 border-dashed rounded-xl p-6 relative">
                                <div className="absolute -top-3 left-4 bg-slate-950 px-2 text-xs text-slate-500">Auto-Scaling Group</div>
                                
                                <div className="flex justify-center gap-6">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center border border-slate-700">
                                                <Server className="w-6 h-6 text-slate-300" />
                                            </div>
                                            <div className="text-[10px] text-slate-500">API Node {i}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute -bottom-6 left-1/3 w-0.5 h-6 bg-slate-600"></div>
                                <div className="absolute -bottom-6 right-1/3 w-0.5 h-6 bg-slate-600"></div>
                            </div>

                            {/* Data Layer */}
                            <div className="flex gap-8 w-full justify-center">
                                <div className="flex-1 max-w-xs border border-rose-500/30 bg-rose-900/10 rounded-lg p-4 flex items-center gap-3">
                                    <Box className="w-8 h-8 text-rose-500" />
                                    <div>
                                        <div className="text-sm font-bold text-rose-300">Redis Cluster</div>
                                        <div className="text-xs text-rose-400/70">Celery Queue & Cache</div>
                                    </div>
                                </div>
                                <div className="flex-1 max-w-xs border border-blue-500/30 bg-blue-900/10 rounded-lg p-4 flex items-center gap-3">
                                    <HardDrive className="w-8 h-8 text-blue-500" />
                                    <div>
                                        <div className="text-sm font-bold text-blue-300">PostgreSQL + Timescale</div>
                                        <div className="text-xs text-blue-400/70">Persistent Storage</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            )}
        </div>

        {/* Right Column: Key Features List */}
        <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-emerald-400" /> Security First
                </h3>
                <ul className="space-y-4">
                    <li className="flex gap-3">
                        <div className="mt-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div></div>
                        <div>
                            <h4 className="text-sm font-medium text-slate-200">Device Attestation</h4>
                            <p className="text-xs text-slate-400">
                                Requires hardware-backed KeyStore proof. Rejects rooted/emulator devices before issuing tokens.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-3">
                        <div className="mt-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div></div>
                        <div>
                            <h4 className="text-sm font-medium text-slate-200">Short-lived JWTs</h4>
                            <p className="text-xs text-slate-400">
                                Access tokens expire in 15 mins. Refresh tokens rotated daily with anomaly checks.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-3">
                        <div className="mt-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div></div>
                        <div>
                            <h4 className="text-sm font-medium text-slate-200">mTLS Encryption</h4>
                            <p className="text-xs text-slate-400">
                                Mutual TLS ensures only the official app binary can talk to the API gateway.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-amber-400" /> Scalability & ML
                </h3>
                <ul className="space-y-4">
                    <li className="flex gap-3">
                        <div className="mt-1"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div></div>
                        <div>
                            <h4 className="text-sm font-medium text-slate-200">Async Workers (Celery)</h4>
                            <p className="text-xs text-slate-400">
                                Decouples heavy ML inference (APK analysis) from the fast HTTP request loop.
                            </p>
                        </div>
                    </li>
                     <li className="flex gap-3">
                        <div className="mt-1"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div></div>
                        <div>
                            <h4 className="text-sm font-medium text-slate-200">TimescaleDB</h4>
                            <p className="text-xs text-slate-400">
                                Handles high-velocity network packet logs (10k+ ops/sec) with automatic partitioning.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-xl p-6">
                <h3 className="text-indigo-200 font-semibold mb-2">Cost Optimization</h3>
                <p className="text-xs text-indigo-300/80 mb-4">
                    Serverless approach for ML Inference reduces idle costs by 85%.
                </p>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-300">
                        <span>EC2 Spot Instances</span>
                        <span className="font-mono text-emerald-400">-60% Cost</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-300">
                        <span>S3 Tiering</span>
                        <span className="font-mono text-emerald-400">Auto-Archive</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BackendDesign;
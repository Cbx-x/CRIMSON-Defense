import React from 'react';
import { Shield, ShieldCheck, AlertTriangle } from 'lucide-react';

const ProjectSummary: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      
      {/* Header / Title Block */}
      <div className="border-b border-slate-800 pb-8">
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-rose-600 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-white">Crimson Defense</h1>
                <p className="text-rose-400 font-medium">AI-Powered Mobile Intrusion Detection System</p>
            </div>
        </div>
        <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">
            A privacy-preserving, ML-first security ecosystem designed to detect zero-day mobile threats, 
            sophisticated network attacks, and behavioral anomalies on Android devices using 
            on-device inference and cloud-based intelligence.
        </p>
      </div>

      {/* 1. Problem & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" /> Problem Statement
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
                Traditional mobile antivirus relies on signature matching, which fails against polymorphic malware and zero-day exploits. 
                Furthermore, deep packet inspection on mobile drains battery and compromises user privacy. 
                Enterprises lack real-time visibility into the "Evil Twin" WiFi attacks and MITM attempts targeting their remote workforce.
            </p>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" /> The Solution
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
                Crimson Defense utilizes a <strong>Split-Inference Architecture</strong>. Lightweight AI models run locally for blocking decisions (&lt;20ms), 
                ensuring privacy and offline capability. Heavy correlation analysis and explainability are offloaded to the cloud. 
                This provides enterprise-grade security with consumer-grade battery efficiency.
            </p>
        </div>
      </div>

      {/* 2. Security Capabilities */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Security Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <ModelCard 
                title="Malware Detection" 
                desc="Hybrid analysis of permissions and dynamic CPU/Network behavior."
                color="rose"
            />
            <ModelCard 
                title="Network Anomaly" 
                desc="Forecasting models to detect data exfiltration spikes vs. normal usage."
                color="indigo"
            />
            <ModelCard 
                title="MITM Detection" 
                desc="Outlier detection on SSL handshake latency and certificate entropy."
                color="amber"
            />
             <ModelCard 
                title="WiFi Security" 
                desc="Analysis of signal patterns to detect Evil Twin and Rogue Access Points."
                color="cyan"
            />
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ModelCard = ({ title, desc, color }: any) => {
    const colors: any = {
        rose: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
        indigo: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
        amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        cyan: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20'
    };

    return (
        <div className={`p-5 rounded-xl border ${colors[color].replace('text-', 'border-')} bg-slate-900/50`}>
            <h3 className={`font-bold mb-2 ${colors[color].split(' ')[1]}`}>{title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
        </div>
    );
};

export default ProjectSummary;
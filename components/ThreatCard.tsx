
import React, { useState } from 'react';
import { ThreatEvent, Severity } from '../types';
import { AlertTriangle, ShieldAlert, Radio, Activity, Smartphone, CheckCircle, BrainCircuit } from 'lucide-react';
import { analyzeThreat } from '../services/geminiService';

interface ThreatCardProps {
  threat: ThreatEvent;
  onResolve: (id: string) => void;
}

const ThreatCard: React.FC<ThreatCardProps> = ({ threat, onResolve }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const getIcon = () => {
    switch (threat.type) {
      case 'Suspicious WiFi': return <Radio className="w-5 h-5" />;
      case 'Rogue Access Point': return <ShieldAlert className="w-5 h-5" />;
      case 'MITM Attack': return <Activity className="w-5 h-5" />;
      case 'Malicious Application': return <Smartphone className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getColor = () => {
    switch (threat.severity) {
      case Severity.CRITICAL: return 'bg-crimson-900/20 border-crimson-500/50 text-crimson-500 shadow-[0_0_15px_rgba(225,29,72,0.15)]';
      case Severity.HIGH: return 'bg-orange-900/20 border-orange-500/50 text-orange-500';
      case Severity.MEDIUM: return 'bg-amber-900/20 border-amber-500/50 text-amber-500';
      case Severity.LOW: return 'bg-blue-900/20 border-blue-500/50 text-blue-500';
      default: return 'bg-zinc-800/50 border-zinc-700 text-zinc-400';
    }
  };

  const handleAnalysis = async () => {
    if (analysis) return; // Already analyzed
    setIsAnalyzing(true);
    const result = await analyzeThreat(threat);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className={`relative p-4 rounded-lg border bg-zinc-900/30 mb-4 transition-all hover:bg-zinc-900/50 backdrop-blur-sm ${getColor()}`}>
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className={`p-3 rounded-full h-fit bg-black/30 border border-current`}>
            {getIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold font-display tracking-wide text-zinc-100">{threat.type}</h3>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold border border-current opacity-80`}>
                {threat.severity}
              </span>
            </div>
            <p className="text-sm text-zinc-400 mb-2">{threat.description}</p>
            <div className="text-xs text-zinc-500 font-mono">
              Device: {threat.device} | ID: {threat.id.substring(0, 8)}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
           <button
            onClick={() => onResolve(threat.id)}
            className="text-emerald-500 hover:text-emerald-400 p-2 rounded-full hover:bg-emerald-500/10 transition-colors"
            title="Mark as Resolved"
          >
            <CheckCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Technical Details Preview */}
      <div className="mt-4 bg-black/50 p-3 rounded text-xs font-mono text-zinc-400 overflow-x-auto border border-white/5">
        {JSON.stringify(threat.details)}
      </div>

      {/* AI Analysis Section */}
      <div className="mt-4 border-t border-white/5 pt-3">
        {!analysis ? (
          <button
            onClick={handleAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-2 text-sm text-crimson-400 hover:text-crimson-300 disabled:opacity-50 transition-colors font-mono"
          >
            <BrainCircuit className="w-4 h-4" />
            {isAnalyzing ? "Analyzing Threat with Gemini..." : "Generate AI Analysis"}
          </button>
        ) : (
          <div className="bg-zinc-950/50 p-3 rounded border border-crimson-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-crimson-600"></div>
            <div className="flex items-center gap-2 mb-2 text-crimson-400 text-sm font-semibold font-display">
                <BrainCircuit className="w-4 h-4" /> Gemini Analysis
            </div>
            <div className="prose prose-invert prose-sm max-w-none text-zinc-300 text-xs">
               {/* Simple markdown rendering for the demo */}
               {analysis.split('\n').map((line, i) => (
                 <p key={i} className="mb-1">{line}</p>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatCard;

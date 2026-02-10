
import React from 'react';
import { AppScanResult } from '../types';
import { Smartphone, Shield, AlertCircle, Check } from 'lucide-react';

interface AppScannerProps {
  apps: AppScanResult[];
}

const AppScanner: React.FC<AppScannerProps> = ({ apps }) => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-display text-white mb-1">APP SCANNER</h1>
        <p className="text-zinc-400">Behavioral analysis and signature matching for installed applications</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-zinc-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                <h3 className="text-lg font-semibold text-white font-display tracking-wide">SCAN RESULTS</h3>
                <div className="flex gap-4 text-sm text-zinc-400 font-mono">
                    <span>SCANNED: {apps.length}</span>
                    <span className="text-crimson-500 font-bold">MALICIOUS: {apps.filter(a => a.isMalicious).length}</span>
                </div>
            </div>

            <div className="divide-y divide-white/5">
                {apps.map((app, index) => (
                    <div key={index} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${app.isMalicious ? 'bg-crimson-900/20 text-crimson-500 border-crimson-500/30' : 'bg-zinc-800 text-zinc-400 border-white/5'}`}>
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className={`font-medium font-display tracking-wide ${app.isMalicious ? 'text-crimson-400' : 'text-zinc-200'}`}>
                                    {app.appName}
                                </h4>
                                <p className="text-xs text-zinc-500 font-mono">{app.packageName}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="text-right hidden md:block">
                                <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider font-bold">Permissions</p>
                                <div className="flex gap-1 justify-end">
                                    {app.permissions.slice(0, 3).map((p, i) => (
                                        <span key={i} className="px-1.5 py-0.5 rounded bg-black/50 text-[10px] text-zinc-400 border border-white/10 font-mono">
                                            {p}
                                        </span>
                                    ))}
                                    {app.permissions.length > 3 && (
                                        <span className="px-1.5 py-0.5 rounded bg-black/50 text-[10px] text-zinc-400 border border-white/10 font-mono">
                                            +{app.permissions.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="w-24 text-right">
                                <p className="text-[10px] text-zinc-500 mb-1 uppercase tracking-wider font-bold">Risk Score</p>
                                <div className="flex items-center justify-end gap-2">
                                    <span className={`font-bold font-mono ${app.riskScore > 70 ? 'text-crimson-500' : app.riskScore > 30 ? 'text-amber-500' : 'text-emerald-500'}`}>
                                        {app.riskScore}/100
                                    </span>
                                </div>
                                <div className="w-full bg-black h-1.5 rounded-full mt-1 border border-white/5">
                                    <div 
                                        className={`h-full rounded-full ${app.riskScore > 70 ? 'bg-crimson-500 shadow-[0_0_8px_#e11d48]' : app.riskScore > 30 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                        style={{ width: `${app.riskScore}%` }}
                                    ></div>
                                </div>
                            </div>

                             <div className="w-8 flex justify-center">
                                {app.isMalicious ? (
                                    <AlertCircle className="w-5 h-5 text-crimson-500 animate-pulse" />
                                ) : (
                                    <Check className="w-5 h-5 text-emerald-500" />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AppScanner;

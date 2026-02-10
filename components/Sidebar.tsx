
import React from 'react';
import { UserProfile } from '../types';
import { Shield, Radio, Smartphone, LayoutDashboard, Settings, Layers, Brain, Router, Network, FileCode, Zap, Siren, X, Hexagon, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose, userProfile }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'defense', label: 'Auto Defense', icon: Siren },
    { id: 'wifi', label: 'WiFi Security', icon: Radio },
    { id: 'apps', label: 'App Scanner', icon: Smartphone },
    { id: 'ml-wifi', label: 'ML: WiFi Anomaly', icon: Brain },
    { id: 'ml-rogue', label: 'ML: Rogue AP', icon: Router },
    { id: 'ml-mitm', label: 'ML: MITM Defense', icon: Network },
    { id: 'ml-malware', label: 'ML: App Defense', icon: FileCode },
    { id: 'ml-network', label: 'ML: Net Anomaly', icon: Zap },
    { id: 'architecture', label: 'System Arch', icon: Layers },
    { id: 'settings', label: 'Configuration', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 bottom-0 z-50 w-64 bg-black border-r border-white/10
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
        shadow-[4px_0_24px_-4px_rgba(225,29,72,0.1)]
      `}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center relative overflow-hidden">
          {/* Decorative background accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-crimson-600 to-transparent"></div>

          <div className="flex items-center gap-3 z-10">
              <div className="relative">
                 <Hexagon className="w-8 h-8 text-crimson-600 fill-crimson-950/50" strokeWidth={1.5} />
                 <Shield className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="flex flex-col">
                  <span className="font-bold text-xl text-white tracking-widest font-display leading-none">CRIMSON</span>
                  <span className="text-[10px] text-crimson-500 font-mono tracking-widest uppercase">Defense Sys</span>
              </div>
          </div>
          <button onClick={onClose} className="md:hidden text-zinc-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Profile Mini-Card */}
        <div className="mx-4 mt-6 p-4 bg-zinc-900/50 rounded-lg border border-white/5 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-crimson-900/50 border border-crimson-500/30 flex items-center justify-center text-crimson-200 font-bold">
                 {userProfile.name.charAt(0)}
             </div>
             <div className="overflow-hidden">
                 <p className="text-sm font-bold text-white truncate font-display tracking-wide">{userProfile.name}</p>
                 <p className="text-[10px] text-zinc-500 font-mono truncate">{userProfile.role}</p>
             </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                onClose(); 
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-all duration-200 group relative
                ${activeTab === item.id 
                  ? 'text-white bg-white/5 border border-white/5' 
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'}`}
            >
              {activeTab === item.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-crimson-600 rounded-l"></div>
              )}
              <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-crimson-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 'group-hover:text-zinc-300'}`} />
              <span className="tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => window.location.reload()}
            className="w-full flex items-center gap-2 justify-center py-2 text-xs text-zinc-600 hover:text-rose-500 transition-colors"
          >
              <LogOut className="w-3 h-3" />
              TERMINATE SESSION
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

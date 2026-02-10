
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Save, User, UserCircle, Bell, Shield, Moon } from 'lucide-react';

interface SettingsProps {
  userProfile: UserProfile;
  onUpdateProfile: (p: UserProfile) => void;
}

const Settings: React.FC<SettingsProps> = ({ userProfile, onUpdateProfile }) => {
  const [name, setName] = useState(userProfile.name);
  const [role, setRole] = useState(userProfile.role);

  const handleSave = () => {
    onUpdateProfile({ ...userProfile, name, role });
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-display text-white mb-1 tracking-wide">SYSTEM CONFIGURATION</h1>
        <p className="text-zinc-400">Manage user profile and interface preferences</p>
      </div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-crimson-600"></div>
        
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-crimson-500" /> Profile Customization
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase font-bold">Display Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded py-2.5 pl-9 pr-4 text-zinc-200 text-sm focus:border-crimson-500 focus:outline-none transition-colors"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase font-bold">Designation / Role</label>
                    <div className="relative">
                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input 
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded py-2.5 pl-9 pr-4 text-zinc-200 text-sm focus:border-crimson-500 focus:outline-none transition-colors"
                        />
                    </div>
                </div>

                <button 
                    onClick={handleSave}
                    className="mt-4 px-6 py-2 bg-crimson-600 hover:bg-crimson-500 text-white text-sm font-bold rounded flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)]"
                >
                    <Save className="w-4 h-4" />
                    SAVE CHANGES
                </button>
            </div>

            <div className="flex items-center justify-center border-l border-white/5 pl-8">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-zinc-800 to-black rounded-full border-2 border-crimson-500 flex items-center justify-center mb-4 mx-auto shadow-[0_0_20px_rgba(225,29,72,0.2)]">
                        <span className="text-2xl font-bold text-white font-display">{name.charAt(0)}</span>
                    </div>
                    <p className="text-white font-bold">{name}</p>
                    <p className="text-crimson-500 text-xs font-mono uppercase mt-1">{role}</p>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-zinc-400" /> Notification Levels
              </h3>
              <div className="space-y-3">
                  {['Critical Alerts (Push)', 'Daily Summaries (Email)', 'System Health (In-App)'].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-black/50 rounded border border-white/5">
                          <span className="text-sm text-zinc-400">{item}</span>
                          <div className="w-10 h-5 bg-crimson-900/40 rounded-full relative cursor-pointer border border-crimson-500/30">
                              <div className="absolute right-1 top-1 w-3 h-3 bg-crimson-500 rounded-full shadow-[0_0_5px_#f43f5e]"></div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6">
               <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Moon className="w-4 h-4 text-zinc-400" /> Interface Theme
              </h3>
              <div className="space-y-2">
                  <div className="p-3 bg-zinc-950 border border-crimson-500/50 rounded flex justify-between items-center">
                      <span className="text-sm text-white">Crimson Dark (Active)</span>
                      <div className="w-2 h-2 bg-crimson-500 rounded-full animate-pulse"></div>
                  </div>
                   <div className="p-3 bg-black border border-white/5 rounded flex justify-between items-center opacity-50 cursor-not-allowed">
                      <span className="text-sm text-zinc-500">Midnight Blue (Locked)</span>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Settings;

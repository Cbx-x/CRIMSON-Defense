
import React, { useState } from 'react';
import { Shield, User, Lock, ArrowRight, Fingerprint, AlertCircle } from 'lucide-react';
import { authService } from '../services/authService';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Connect to the local FastAPI backend
      const data = await authService.login(username, password);
      
      // Store token (in a real app, use secure storage/context)
      localStorage.setItem('crimson_token', data.access_token);
      localStorage.setItem('crimson_user', JSON.stringify(data.user_profile));
      
      onLogin();
    } catch (err: any) {
      setError(err.message || "Failed to connect to backend. Is it running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
            backgroundImage: `linear-gradient(#18181b 1px, transparent 1px), linear-gradient(90deg, #18181b 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="w-full max-w-md bg-zinc-950/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-[0_0_50px_-12px_rgba(225,29,72,0.2)] relative z-10">
        <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-crimson-900 to-black border border-crimson-500/30 mb-4 shadow-[0_0_15px_rgba(225,29,72,0.3)]">
                <Shield className="w-8 h-8 text-crimson-500" />
            </div>
            <h2 className="text-3xl font-bold font-display text-white tracking-wide">ACCESS CONTROL</h2>
            <p className="text-zinc-500 text-sm mt-2">Identify yourself to access the mainframe</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-mono text-crimson-500 uppercase font-bold tracking-wider">Operator ID</label>
                <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-crimson-500 transition-colors" />
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-lg py-3 pl-10 pr-4 text-zinc-300 font-mono text-sm focus:outline-none focus:border-crimson-500/50 focus:ring-1 focus:ring-crimson-500/50 transition-all placeholder:text-zinc-700"
                        placeholder="ENTER ID"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-mono text-crimson-500 uppercase font-bold tracking-wider">Access Key</label>
                <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-crimson-500 transition-colors" />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-lg py-3 pl-10 pr-4 text-zinc-300 font-mono text-sm focus:outline-none focus:border-crimson-500/50 focus:ring-1 focus:ring-crimson-500/50 transition-all placeholder:text-zinc-700"
                        placeholder="••••••••••••"
                    />
                </div>
            </div>

            {error && (
              <div className="p-3 bg-red-900/20 border border-red-500/30 rounded text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-crimson-600 hover:bg-crimson-500 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)]"
            >
                {isLoading ? (
                    <>
                        <Fingerprint className="w-5 h-5 animate-pulse" />
                        <span className="font-mono tracking-widest">AUTHENTICATING...</span>
                    </>
                ) : (
                    <>
                        <span>INITIALIZE SESSION</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] text-zinc-600 font-mono">
            <span>BACKEND: LOCALHOST:8000</span>
            <span>SECURE LINK: NEGOTIATING</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


import React, { useEffect, useState } from 'react';
import { Shield, Hexagon } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center overflow-hidden">
      <div className="relative mb-8">
        {/* Pulsing Hexagon */}
        <div className="absolute inset-0 bg-crimson-600/20 blur-xl rounded-full animate-pulse"></div>
        <Hexagon className="w-24 h-24 text-crimson-600 animate-spin-slow duration-[10s]" strokeWidth={1} />
        <Shield className="w-10 h-10 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold font-display text-white tracking-[0.2em] mb-2 animate-pulse">
        CRIMSON <span className="text-crimson-600">DEFENSE</span>
      </h1>
      <p className="text-zinc-500 font-mono text-sm tracking-widest mb-12">MOBILE INTRUSION DETECTION SYSTEM</p>

      {/* Loading Bar */}
      <div className="w-64 h-1 bg-zinc-900 rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-crimson-600 shadow-[0_0_10px_#e11d48]"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        ></div>
      </div>
      
      <div className="mt-4 font-mono text-xs text-crimson-500">
        INITIALIZING CORE MODULES... {progress}%
      </div>

      <div className="absolute bottom-8 text-[10px] text-zinc-700 font-mono">
        SECURE CONNECTION ESTABLISHED
      </div>
    </div>
  );
};

export default SplashScreen;

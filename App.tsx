
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import SplashScreen from './components/SplashScreen';
import LoginPage from './pages/LoginPage';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import AppScanner from './pages/AppScanner';
import Architecture from './pages/Architecture';
import WifiDetectionModule from './pages/WifiDetectionModule';
import RogueApModule from './pages/RogueApModule';
import MitmDetectionModule from './pages/MitmDetectionModule';
import MalwareDetectionModule from './pages/MalwareDetectionModule';
import NetworkAnomalyModule from './pages/NetworkAnomalyModule';
import AutomatedDefenseModule from './pages/AutomatedDefenseModule';
import { ThreatEvent, DeviceStatus, UserProfile } from './types';
import { MOCK_THREATS, MOCK_DEVICES, MOCK_APPS } from './constants';
import { backendService } from './services/backendService';

const App: React.FC = () => {
  // App State
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Data State
  const [userProfile, setUserProfile] = useState<UserProfile>({
      name: 'ALEX RIDER',
      role: 'SENIOR SEC OPS',
      avatar: ''
  });
  const [threats, setThreats] = useState<ThreatEvent[]>(MOCK_THREATS);
  const [devices, setDevices] = useState<DeviceStatus[]>(MOCK_DEVICES);

  // Fetch data from backend when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const initData = async () => {
        try {
          const liveThreats = await backendService.getAlerts();
          // If backend returns data, use it. Otherwise fall back to mocks.
          if (liveThreats && liveThreats.length > 0) {
             setThreats(liveThreats);
          }
        } catch (e) {
          console.log("Backend offline or unreachable, using local cache.");
        }
      };
      initData();
    }
  }, [isAuthenticated]);

  const handleResolveThreat = (id: string) => {
    setThreats(prev => prev.map(t => t.id === id ? { ...t, status: 'resolved' } : t));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard threats={threats} devices={devices} onResolveThreat={handleResolveThreat} />;
      case 'wifi':
        return <WifiDetectionModule />;
      case 'apps':
        return <AppScanner apps={MOCK_APPS} />;
      case 'architecture':
        return <Architecture />;
      case 'defense':
        return <AutomatedDefenseModule />;
      case 'ml-wifi':
        return <WifiDetectionModule />;
      case 'ml-rogue':
        return <RogueApModule />;
      case 'ml-mitm':
        return <MitmDetectionModule />;
      case 'ml-malware':
        return <MalwareDetectionModule />;
      case 'ml-network':
        return <NetworkAnomalyModule />;
      case 'settings':
        return <Settings userProfile={userProfile} onUpdateProfile={setUserProfile} />;
      default:
        return <Dashboard threats={threats} devices={devices} onResolveThreat={handleResolveThreat} />;
    }
  };

  // Flow Control
  if (showSplash) {
      return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (!isAuthenticated) {
      return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-black flex font-sans text-zinc-300 relative selection:bg-crimson-500/30 overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userProfile={userProfile}
      />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md border-b border-white/10 z-30 flex items-center px-4 justify-between">
          <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 text-zinc-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <span className="font-bold font-display text-lg text-white tracking-wider">CRIMSON DEFENSE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-crimson-500">LIVE</span>
            <div className="w-1.5 h-1.5 rounded-full bg-crimson-500 animate-pulse shadow-[0_0_10px_#f43f5e]"></div>
          </div>
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 min-h-screen overflow-x-hidden bg-black">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;

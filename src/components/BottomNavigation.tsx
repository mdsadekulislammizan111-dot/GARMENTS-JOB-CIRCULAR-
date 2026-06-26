import React from 'react';
import { Briefcase, LayoutDashboard, Info, UserCheck } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
}

export default function BottomNavigation({
  activeTab,
  setActiveTab,
  onOpenAuth,
  isLoggedIn
}: BottomNavigationProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200/60 dark:border-slate-800/60 py-2.5 px-6 flex items-center justify-around shadow-lg">
      
      {/* 1. Job Circulars tab */}
      <button
        onClick={() => setActiveTab('jobs')}
        className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-all ${
          activeTab === 'jobs' 
            ? 'text-blue-600 dark:text-sky-400 scale-105' 
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
        }`}
      >
        <Briefcase className="h-5 w-5" />
        <span>Circulars feed</span>
      </button>

      {/* 2. Interactive Dashboard tab */}
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-all ${
          activeTab === 'dashboard' 
            ? 'text-blue-600 dark:text-sky-400 scale-105' 
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
        }`}
      >
        <LayoutDashboard className="h-5 w-5" />
        <span>My Console</span>
      </button>

      {/* 3. Auth Profile / Register toggle */}
      <button
        onClick={isLoggedIn ? () => setActiveTab('dashboard') : onOpenAuth}
        className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-all ${
          isLoggedIn && activeTab === 'dashboard'
            ? 'text-emerald-600'
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
        }`}
      >
        <UserCheck className="h-5 w-5" />
        <span>{isLoggedIn ? 'Active Account' : 'Sign In'}</span>
      </button>

      {/* 4. Factory Info guidelines tab */}
      <button
        onClick={() => setActiveTab('about')}
        className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-all ${
          activeTab === 'about' 
            ? 'text-blue-600 dark:text-sky-400 scale-105' 
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
        }`}
      >
        <Info className="h-5 w-5" />
        <span>Info Hub</span>
      </button>

    </nav>
  );
}

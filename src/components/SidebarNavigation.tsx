import React from 'react';
import { Briefcase, LayoutDashboard, Info, UserCheck, ShieldCheck, MapPin, Compass } from 'lucide-react';
import { ViewRole } from '../types';

interface SidebarNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentRole: ViewRole;
  isLoggedIn: boolean;
  onOpenAuth: () => void;
  userEmail?: string;
}

export default function SidebarNavigation({
  activeTab,
  setActiveTab,
  currentRole,
  isLoggedIn,
  onOpenAuth,
  userEmail
}: SidebarNavigationProps) {
  return (
    <aside className="hidden md:flex flex-col justify-between w-64 h-[calc(100vh-70px)] sticky top-[70px] bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800/60 p-5 shrink-0 transition-colors duration-200">
      
      {/* Upper Navigation Links Group */}
      <div className="space-y-6">
        
        {/* User Card inside Sidebar */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 text-white font-extrabold flex items-center justify-center text-sm shadow">
              {isLoggedIn && userEmail ? userEmail.substring(0, 2).toUpperCase() : '👤'}
            </div>
            <div className="text-left overflow-hidden">
              <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 truncate">
                {isLoggedIn ? (userEmail?.split('@')[0] || 'Registered User') : 'Guest Explorer'}
              </h4>
              <p className="text-[10px] text-slate-400 font-mono capitalize leading-none mt-1">
                Role: {currentRole}
              </p>
            </div>
          </div>
          
          {isLoggedIn ? (
            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>NID Identity Verified</span>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="mt-3 w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition-all text-center"
            >
              Sign In to Save Jobs
            </button>
          )}
        </div>

        {/* Menu Items */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono px-2 mb-2">Main Navigation</p>
          
          {/* Menu Link 1 */}
          <button
            onClick={() => setActiveTab('jobs')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all text-left ${
              activeTab === 'jobs'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Briefcase className="h-4.5 w-4.5" />
            <span>Job Circulars Feed</span>
          </button>

          {/* Menu Link 2 */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all text-left ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="h-4.5 w-4.5" />
            <span>My Dashboard Console</span>
          </button>

          {/* Menu Link 3 */}
          <button
            onClick={() => setActiveTab('about')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all text-left ${
              activeTab === 'about'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Info className="h-4.5 w-4.5" />
            <span>Ashulia Industrial Info</span>
          </button>

        </div>

      </div>

      {/* Lower compliance guidelines block / footer section */}
      <div className="space-y-4">
        
        {/* Compliance checklist reminder box */}
        <div className="p-3.5 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/50 text-left space-y-2">
          <div className="flex items-center gap-1 text-[11px] font-extrabold text-blue-700 dark:text-blue-300">
            <Compass className="h-4 w-4 animate-spin-slow text-blue-500" />
            <span>BGMEA Safety Standard</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-normal">
            All registered factories on our platform maintain legal monthly wages, safe working hostels, and overtime parameters mandated by the Bangladesh Labor Act.
          </p>
        </div>

        {/* Small version coordinates */}
        <div className="text-left px-2">
          <p className="text-[9px] font-mono text-slate-400">Ashulia Circular v1.2.0</p>
          <p className="text-[9px] text-slate-400 mt-0.5">© 2026 Savar Garments Portal</p>
        </div>

      </div>

    </aside>
  );
}

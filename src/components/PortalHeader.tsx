import React, { useState } from 'react';
import { Bell, Search, Sun, Moon, Briefcase, User, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';
import { Notification, ViewRole } from '../types';

interface PortalHeaderProps {
  currentRole: ViewRole;
  setCurrentRole: (role: ViewRole) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  onSearch: (query: string) => void;
  searchQuery: string;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  userEmail?: string;
  onNavigateToTab: (tab: string) => void;
}

export default function PortalHeader({
  currentRole,
  setCurrentRole,
  darkMode,
  setDarkMode,
  notifications,
  setNotifications,
  onSearch,
  searchQuery,
  onOpenAuth,
  isLoggedIn,
  onLogout,
  userEmail,
  onNavigateToTab
}: PortalHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const handleRoleChange = (role: ViewRole) => {
    setCurrentRole(role);
    setShowRoleSelector(false);
    onNavigateToTab('dashboard'); // Redirect to dashboard tab on switch
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200 py-3 px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigateToTab('jobs')}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-blue-500/10">
            {/* Custom SVG logo representing garments, textile yarn loops & industrial gear */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5.5 w-5.5 animate-spin-slow">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-sky-600 to-emerald-600 dark:from-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Ashulia Circular
            </h1>
            <p className="text-[10px] md:text-[11px] font-semibold text-slate-500 tracking-wider uppercase font-mono leading-none">
              Garments Job Portal
            </p>
          </div>
        </div>

        {/* Global Search - Hidden on Small Mobile, shown on tablet/desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-md relative">
          <div className="absolute left-3.5 text-slate-400">
            <Search className="h-4.5 w-4.5" />
          </div>
          <input
            type="text"
            placeholder="Search factories, positions (e.g., operator, QC, helper)..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 focus:bg-white dark:focus:bg-slate-900 border-0 focus:ring-2 focus:ring-blue-500 rounded-2xl transition-all outline-none text-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Dashboard Persona Selector Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleSelector(!showRoleSelector)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50 hover:bg-blue-100 transition-colors"
            >
              <span className="capitalize font-mono">{currentRole} View</span>
              <span className="text-[9px] text-blue-400">▼</span>
            </button>

            {showRoleSelector && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200/60 dark:border-slate-800/60 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1 font-mono">Select Portal Perspective</p>
                <button
                  onClick={() => handleRoleChange('candidate')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors ${currentRole === 'candidate' ? 'bg-blue-500 text-white font-medium' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'}`}
                >
                  <User className="h-4 w-4" />
                  <span>Candidate Dashboard</span>
                </button>
                <button
                  onClick={() => handleRoleChange('employer')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors ${currentRole === 'employer' ? 'bg-blue-500 text-white font-medium' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'}`}
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Employer Console</span>
                </button>
                <button
                  onClick={() => handleRoleChange('admin')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors ${currentRole === 'admin' ? 'bg-blue-500 text-white font-medium' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'}`}
                >
                  <ShieldAlert className="h-4 w-4" />
                  <span>Admin Panel UI</span>
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-indigo-700" />}
          </button>

          {/* Notification Icon & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors relative"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 md:w-96 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/60 dark:border-slate-800/60 z-50 overflow-hidden">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Live Garments Alerts</h3>
                    <p className="text-xs text-slate-400 font-medium">Ashulia industrial zone matching circulars</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={markAllRead}
                      className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Read All
                    </button>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <button
                      onClick={clearNotifications}
                      className="text-[10px] font-bold text-red-500 hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-400">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-30 text-slate-400" />
                      <p className="text-xs">No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${!notif.read ? 'bg-blue-50/40 dark:bg-blue-950/10' : ''}`}
                      >
                        <div className="flex gap-2.5 items-start">
                          <span className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                            notif.type === 'urgent' ? 'bg-red-500' :
                            notif.type === 'success' ? 'bg-emerald-500' :
                            notif.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="font-bold text-xs text-slate-700 dark:text-slate-200">
                                {notif.title}
                              </h4>
                              <span className="text-[9px] font-mono text-slate-400 shrink-0">
                                {notif.timestamp}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                              {notif.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/30 text-center border-t border-slate-100 dark:border-slate-800">
                  <button className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline" onClick={() => setShowNotifications(false)}>
                    Close Notification Panel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Logged In State / Auth trigger */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold shadow">
                {userEmail ? userEmail.substring(0, 2).toUpperCase() : 'US'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-none">Registered Worker</p>
                <p className="text-[9px] font-mono text-slate-400 truncate max-w-[120px]">{userEmail}</p>
              </div>
              <button
                onClick={onLogout}
                className="text-[10px] font-mono font-bold text-red-500 border border-red-200 dark:border-red-950 rounded-lg px-2 py-1 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/15 transition-all flex items-center gap-1"
            >
              <User className="h-3.5 w-3.5" />
              <span>Login / Register</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
}

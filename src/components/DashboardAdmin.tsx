import React, { useState } from 'react';
import { Company, Notification } from '../types';
import { ShieldCheck, Send, AlertTriangle, CheckSquare, PlusCircle, AlertCircle, Sparkles, Building, Key, ToggleLeft } from 'lucide-react';

interface DashboardAdminProps {
  companies: Company[];
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

export default function DashboardAdmin({
  companies,
  setCompanies,
  notifications,
  setNotifications
}: DashboardAdminProps) {
  
  // Notice Broadcaster State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastType, setBroadcastType] = useState<'info' | 'success' | 'warning' | 'urgent'>('info');

  // Verify factory logic (updates state)
  const handleVerifyFactory = (companyId: string) => {
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, isVerified: true } : c));
    
    // Auto broadcast a success notice to all workers
    const factory = companies.find(c => c.id === companyId);
    if (factory) {
      const newNotif: Notification = {
        id: `notif-${Date.now()}`,
        title: 'Factory Verified!',
        message: `${factory.name} in Ashulia has completed compliance audits and is now officially Verified.`,
        type: 'success',
        timestamp: 'Just now',
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  // Broadcaster notice submission
  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      title: broadcastTitle,
      message: broadcastMessage,
      type: broadcastType,
      timestamp: 'Just now',
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);
    setBroadcastTitle('');
    setBroadcastMessage('');
  };

  // Stats calculations
  const totalFactories = companies.length;
  const verifiedFactories = companies.filter(c => c.isVerified).length;
  const pendingVerifications = companies.filter(c => !c.isVerified);

  return (
    <div className="space-y-6 text-left">
      
      {/* Overview Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-700 via-purple-800 to-indigo-900 p-6 md:p-8 text-white shadow-xl shadow-purple-950/25 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/4 opacity-10 hidden md:block">
          <ShieldCheck className="w-full h-full text-slate-100" />
        </div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold font-mono text-pink-300">
            <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse" />
            Root Administration Terminal
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Compliance Moderation & Broadcast System
          </h2>
          <p className="text-sm text-indigo-100 font-medium max-w-xl">
            Grant verified manufacturing badges to export groups, moderate active compliance parameters, and broadcast critical updates to all garments workers instantly.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Platform Factories</span>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-slate-800 dark:text-slate-100 mt-1">{totalFactories}</p>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <span>{verifiedFactories} Verified Groups</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Pending Verifications</span>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-amber-600 mt-1">{pendingVerifications.length}</p>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <span>Requires compliance review</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Jobseekers Active</span>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-emerald-600 mt-1">45,210</p>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <span>Ashulia & Savar hubs</span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Uptime Status</span>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-blue-600 dark:text-blue-400 mt-1">99.98%</p>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <span>No lag reports</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Company Verifications Moderation panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight">Factory Compliance Verifications</h3>
            <p className="text-xs text-slate-400 font-medium">Verify export factories following on-site ILO safety and fire hazard audits.</p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {pendingVerifications.length === 0 ? (
              <div className="py-8 text-center text-slate-400 space-y-2">
                <CheckSquare className="h-8 w-8 mx-auto opacity-30 text-emerald-500" />
                <p className="text-xs font-bold">All factories verified!</p>
                <p className="text-[10px]">Every manufacturer in our system has passed the AQL audits.</p>
              </div>
            ) : (
              pendingVerifications.map((factory) => (
                <div key={factory.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center font-extrabold text-sm text-slate-600 dark:text-slate-300">
                      {factory.logo}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100">{factory.name}</h4>
                      <p className="text-[10px] text-slate-400 truncate max-w-[200px]">{factory.location}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleVerifyFactory(factory.id)}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-extrabold shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <ShieldCheck className="h-3 w-3" />
                    <span>Verify Factory</span>
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <h4 className="font-extrabold text-xs text-slate-500 uppercase tracking-wider font-mono mb-2">Verified Manufacturing Partners ({verifiedFactories})</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              {companies.filter(c => c.isVerified).map(c => (
                <div key={c.id} className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-xl">
                  <span className="text-blue-500 font-extrabold">✓</span>
                  <span className="truncate">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Notification Broadcaster */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 md:p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight">Push Notification Broadcaster</h3>
            <p className="text-xs text-slate-400 font-medium">Draft dynamic safety guidelines, weather alerts, or traffic news which flashes to all workers instantly.</p>
          </div>

          <form onSubmit={handleBroadcast} className="space-y-3.5">
            {/* Title */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Alert Headline Title</label>
              <input
                type="text"
                placeholder="e.g. Eid-ul-Adha Garments Holiday Notice"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Detailed Broadcast Message</label>
              <textarea
                placeholder="Write clear instructions for workers inside Baipail, Jamgora, DEPZ, and Nabinagar areas..."
                rows={3}
                required
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            {/* Type selector */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Alert Severity Type</label>
                <select
                  value={broadcastType}
                  onChange={(e) => setBroadcastType(e.target.value as any)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  <option value="info">🔵 Information (Normal)</option>
                  <option value="success">🟢 Green (Hiring/Verify)</option>
                  <option value="warning">🟡 Yellow (Traffic/Audit)</option>
                  <option value="urgent">🔴 Red (Urgent/Hazard)</option>
                </select>
              </div>

              {/* Submit Broadcaster Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Broadcast Alert Live</span>
                </button>
              </div>
            </div>
          </form>

          {/* Interactive instruction banner */}
          <div className="mt-4 p-3 bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl flex items-start gap-2.5">
            <span className="text-indigo-600 font-extrabold text-xs">💡</span>
            <p className="text-[11px] text-indigo-800 dark:text-indigo-300 font-medium">
              <strong>Interactive Demo Action:</strong> Click the &quot;Verify Factory&quot; button to grant Palmal Group its verified status, or type a custom alert notice and click &quot;Broadcast Alert Live&quot;. Check how the notifications bell at the header lights up immediately!
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

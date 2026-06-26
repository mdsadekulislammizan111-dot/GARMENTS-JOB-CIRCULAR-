import React from 'react';
import { Job, AppliedJob } from '../types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { FileText, CheckCircle2, Bookmark, Clock, Award, Star, ArrowUpRight, TrendingUp } from 'lucide-react';

interface DashboardCandidateProps {
  appliedJobs: AppliedJob[];
  savedJobsIds: string[];
  allJobs: Job[];
  onRemoveSaved: (jobId: string) => void;
  onApplyFromSaved: (job: Job) => void;
  onViewDetails: (job: Job) => void;
  userEmail?: string;
}

export default function DashboardCandidate({
  appliedJobs,
  savedJobsIds,
  allJobs,
  onRemoveSaved,
  onApplyFromSaved,
  onViewDetails,
  userEmail
}: DashboardCandidateProps) {
  
  // Aggregate stats
  const totalApplied = appliedJobs.length;
  const totalSaved = savedJobsIds.length;
  const shortlistedCount = appliedJobs.filter(j => j.status === 'Shortlisted').length;
  const selectedCount = appliedJobs.filter(j => j.status === 'Selected').length;

  // Prepare chart data for Salary Benchmark
  const salaryBenchmarkData = [
    { role: 'Helper', min: 9500, avg: 10500, max: 11500 },
    { role: 'Junior Sew', min: 11000, avg: 12500, max: 14000 },
    { role: 'Senior Sew', min: 14500, avg: 16500, max: 19000 },
    { role: 'Quality Insp', min: 18000, avg: 21000, max: 25000 },
    { role: 'Line Chief', min: 22000, avg: 26000, max: 32000 },
    { role: 'Merchandiser', min: 25000, avg: 30000, max: 40000 },
    { role: 'CAD Pattern', min: 35000, avg: 42500, max: 55000 },
  ];

  // Prepare chart data for application monthly history
  const applicationHistoryData = [
    { month: 'Jan', applications: 2, callbacks: 1 },
    { month: 'Feb', applications: 5, callbacks: 2 },
    { month: 'Mar', applications: 8, callbacks: 3 },
    { month: 'Apr', applications: 4, callbacks: 2 },
    { month: 'May', applications: 9, callbacks: 5 },
    { month: 'Jun', applications: totalApplied, callbacks: shortlistedCount + selectedCount },
  ];

  return (
    <div className="space-y-6 text-left">
      
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-700 p-6 md:p-8 text-white shadow-xl shadow-blue-500/15 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 hidden md:block">
          {/* Custom vector styling background representing garments weaves */}
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,40 70,60 100,0 L100,100 Z" fill="white" />
          </svg>
        </div>
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold font-mono text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Verified Candidate Account
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Assalamu Alaikum, {userEmail ? userEmail.split('@')[0] : 'Apparel Worker'}!
          </h2>
          <p className="text-sm text-blue-100 font-medium">
            Find and manage garments jobs inside the Ashulia industrial zone. Check active status reviews and view updated salary benchmarking charts below.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Applied Circulars</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-slate-800 dark:text-slate-100 mt-2">{totalApplied}</p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Active submission</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Shortlisted / Selected</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-slate-800 dark:text-slate-100 mt-2">
            {shortlistedCount + selectedCount}
          </p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 mt-1">
            <span>{shortlistedCount} Invited for test</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Saved Circulars</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
              <Bookmark className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-slate-800 dark:text-slate-100 mt-2">{totalSaved}</p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 mt-1">
            <span>Keep for review later</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Profile Completed</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Star className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-slate-800 dark:text-slate-100 mt-2">85%</p>
          <div className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '85%' }} />
          </div>
        </div>
      </div>

      {/* Analytics Charts section using Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Salary Benchmarking Bar Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight">Bangladesh Garments Salary Benchmark (৳)</h3>
              <p className="text-xs text-slate-400 font-medium">Standard monthly wage structures across roles in Ashulia industrial hubs</p>
            </div>
            <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-1 rounded-lg">2026 Scale</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryBenchmarkData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="role" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff' }}
                  labelStyle={{ fontWeight: 'bold', fontSize: '11px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', marginTop: '10px' }} />
                <Bar dataKey="min" name="Minimum (৳)" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avg" name="Average Wage (৳)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="max" name="Maximum (৳)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Monthly Applications Performance Trend Area Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight">Application Activity & Response</h3>
              <p className="text-xs text-slate-400 font-medium">Monthly submission metrics vs. employer shortlisted callbacks</p>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Live Tracking
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={applicationHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCallbacks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', marginTop: '10px' }} />
                <Area type="monotone" dataKey="applications" name="Circulars Applied" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorApplications)" />
                <Area type="monotone" dataKey="callbacks" name="Employer Shortlists" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCallbacks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Applied Jobs Tracker Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 md:p-6 shadow-sm">
        <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight mb-4">
          Applied Garments Circulars Tracker ({appliedJobs.length})
        </h3>

        {appliedJobs.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-20 text-slate-400" />
            <p className="text-xs font-semibold">You have not applied to any garments circulars yet.</p>
            <p className="text-[11px] text-slate-400 mt-1">Browse the main catalog list and click &quot;Apply Now&quot; to begin your submission!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-bold font-mono">
                  <th className="pb-3 pl-2">Apparel Position</th>
                  <th className="pb-3">Company Factory</th>
                  <th className="pb-3">Applied Date</th>
                  <th className="pb-3">Status Assessment</th>
                  <th className="pb-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {appliedJobs.map((applied) => {
                  const job = allJobs.find(j => j.id === applied.jobId);
                  if (!job) return null;
                  return (
                    <tr key={applied.jobId} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 pl-2">
                        <button
                          onClick={() => onViewDetails(job)}
                          className="font-extrabold text-blue-600 dark:text-blue-400 hover:underline text-left block"
                        >
                          {job.title}
                        </button>
                      </td>
                      <td className="py-3.5">
                        <span className="text-slate-700 dark:text-slate-200 font-semibold">{job.companyName}</span>
                      </td>
                      <td className="py-3.5 text-slate-400 font-mono">{applied.appliedAt}</td>
                      <td className="py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          applied.status === 'Pending' ? 'bg-amber-100/70 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' :
                          applied.status === 'Shortlisted' ? 'bg-blue-100/70 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 animate-pulse' :
                          applied.status === 'Selected' ? 'bg-emerald-100/70 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' :
                          'bg-red-100/70 text-red-700 dark:bg-red-950/30 dark:text-red-400'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            applied.status === 'Pending' ? 'bg-amber-500' :
                            applied.status === 'Shortlisted' ? 'bg-blue-500' :
                            applied.status === 'Selected' ? 'bg-emerald-500' : 'bg-red-500'
                          }`} />
                          {applied.status}
                        </span>
                        {applied.notes && (
                          <span className="block text-[10px] text-slate-400 font-normal mt-0.5 max-w-[200px] truncate" title={applied.notes}>
                            📝 {applied.notes}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 pr-2 text-right">
                        <button
                          onClick={() => onViewDetails(job)}
                          className="text-[11px] font-bold text-slate-500 hover:text-blue-600 hover:underline"
                        >
                          View Circular
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Saved Jobs Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 md:p-6 shadow-sm">
        <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight mb-4">
          Saved Garments Circulars ({savedJobsIds.length})
        </h3>

        {savedJobsIds.length === 0 ? (
          <div className="py-10 text-center text-slate-400">
            <Bookmark className="h-10 w-10 mx-auto mb-2 opacity-20 text-slate-400" />
            <p className="text-xs">No saved circulars.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedJobsIds.map((id) => {
              const job = allJobs.find(j => j.id === id);
              if (!job) return null;
              return (
                <div key={job.id} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20 flex flex-col justify-between gap-3 text-left">
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100 line-clamp-1">{job.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1">{job.companyName}</p>
                    <div className="flex gap-2 items-center text-[10px] text-slate-500 font-mono mt-2">
                      <span>৳{job.salaryMin.toLocaleString()}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 mt-1">
                    <button
                      onClick={() => onRemoveSaved(job.id)}
                      className="text-[10px] font-bold text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewDetails(job)}
                        className="text-[10px] font-bold text-slate-500 hover:underline"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => onApplyFromSaved(job)}
                        className="text-[10px] font-bold text-blue-600 hover:underline"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}

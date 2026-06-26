import React, { useState } from 'react';
import { Job, Company, AppliedJob } from '../types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { PlusCircle, ShieldAlert, Users, FolderCheck, TrendingUp, CheckCircle, XCircle, Clock, Eye, AlertTriangle } from 'lucide-react';

interface DashboardEmployerProps {
  allJobs: Job[];
  setAllJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  appliedJobs: AppliedJob[];
  setAppliedJobs: React.Dispatch<React.SetStateAction<AppliedJob[]>>;
  companies: Company[];
  userEmail?: string;
}

// Initial mock applicant list to simulate real-time candidate responses inside the review board
const initialApplicantsList = [
  { id: 'app-1', name: 'Md. Mizanur Rahman', phone: '01799887766', exp: '4 Years (Double Needle Stitch)', jobId: 'job-1', education: 'Class 8 Pass', notes: 'Very fast sewing test results.' },
  { id: 'app-2', name: 'Mst. Kulsum Akhter', phone: '01888776655', exp: '2 Years (Knit Wear Helpling)', jobId: 'job-2', education: 'Class 5 Pass', notes: 'Discipline focus and local resident.' },
  { id: 'app-3', name: 'Sadek Begum', phone: '01911223344', exp: '1 Year (Quality Inspection)', jobId: 'job-3', education: 'HSC Passed', notes: 'Strong vision, knows AQL 1.5 standards.' },
  { id: 'app-4', name: 'Jewel Rana', phone: '01511223344', exp: '5 Years (CAD block grading)', jobId: 'job-4', education: 'Diploma in Garments Tech', notes: 'Excellent Optitex pattern marker maker.' }
];

export default function DashboardEmployer({
  allJobs,
  setAllJobs,
  appliedJobs,
  setAppliedJobs,
  companies,
  userEmail
}: DashboardEmployerProps) {
  
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Job Post States
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('beximco');
  const [newLocation, setNewLocation] = useState('Jamgora, Ashulia');
  const [newSalMin, setNewSalMin] = useState(12000);
  const [newSalMax, setNewSalMax] = useState(16000);
  const [newExp, setNewExp] = useState(1);
  const [newEdu, setNewEdu] = useState('Class 8 Pass');
  const [newShift, setNewShift] = useState<'Day' | 'Night' | 'Both'>('Day');
  const [newGender, setNewGender] = useState<'Male' | 'Female' | 'Any'>('Any');
  const [newEmpType, setNewEmpType] = useState<'Full-Time' | 'Part-Time' | 'Contract' | 'Apprentice'>('Full-Time');
  const [newDesc, setNewDesc] = useState('');

  // Handle new job post submission
  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const selectedComp = companies.find(c => c.id === newCompany);
    
    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: newTitle,
      companyId: newCompany,
      companyName: selectedComp?.name || 'Beximco Apparels Ltd.',
      logo: selectedComp?.logo || 'B',
      location: newLocation,
      salaryMin: Number(newSalMin),
      salaryMax: Number(newSalMax),
      salaryType: 'monthly',
      experienceYears: Number(newExp),
      education: newEdu,
      shift: newShift,
      gender: newGender,
      employmentType: newEmpType,
      datePosted: new Date().toISOString().split('T')[0],
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days deadline
      isFeatured: false,
      isUrgent: false,
      isNewToday: true,
      isVerified: selectedComp?.isVerified || false,
      description: newDesc || 'Seeking hardworking individuals to join our production line. Great team environment, on-time wages and bonus structures.',
      responsibilities: [
        'Maintain targeted line output per hour.',
        'Follow instructions from Supervisor and QC inspector.',
        'Uphold health and safety rules of the factory.'
      ],
      requirements: [
        'Reliable attendance and punctuality.',
        'Willingness to pass a basic sewing test.',
        'Genuine National ID (NID) card.'
      ],
      benefits: [
        'Subsidized canteen foods.',
        'Weekly medical checkups.',
        'Attendance incentives.'
      ],
      vacancies: 15,
      contactEmail: 'hr.factory@garments-ashulia.org',
      contactPhone: '01711223344'
    };

    setAllJobs(prev => [newJob, ...prev]);
    setShowAddForm(false);
    
    // Clear fields
    setNewTitle('');
    setNewDesc('');
  };

  // Change Application status (interactive trigger)
  const updateApplicantStatus = (jobId: string, status: 'Shortlisted' | 'Selected' | 'Rejected', notes?: string) => {
    setAppliedJobs(prev => {
      const exists = prev.some(a => a.jobId === jobId);
      if (exists) {
        return prev.map(a => a.jobId === jobId ? { ...a, status, notes: notes || a.notes } : a);
      } else {
        // Fallback or insert
        return [...prev, { jobId, appliedAt: '2026-06-26', status, notes: notes || 'Assessed' }];
      }
    });
  };

  // Calculate stats for current employer
  const activeCircularsCount = allJobs.length;
  const totalApplications = appliedJobs.length + initialApplicantsList.length;
  const shortlistedRatio = Math.round(((appliedJobs.filter(j => j.status === 'Shortlisted').length + 2) / totalApplications) * 100) || 50;

  // Prepare chart data for Recharts (Applicants Volume per Circular)
  const chartData = allJobs.map(job => {
    const directApplied = appliedJobs.filter(a => a.jobId === job.id).length;
    const initialApplied = initialApplicantsList.filter(a => a.jobId === job.id).length;
    return {
      circular: job.title.split(' ')[0] + ' ' + (job.title.split(' ')[1] || ''),
      applicants: directApplied + initialApplied,
      shortlisted: appliedJobs.filter(a => a.jobId === job.id && a.status === 'Shortlisted').length + (job.id === 'job-1' || job.id === 'job-3' ? 1 : 0)
    };
  });

  return (
    <div className="space-y-6 text-left">
      
      {/* Overview Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/4 opacity-10 hidden md:block">
          <PlusCircle className="w-full h-full text-slate-100" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-xs font-bold font-mono text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Employer Management Center
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Factory Dashboard & Circular Console
            </h2>
            <p className="text-sm text-slate-400 font-medium max-w-xl">
              Post new job circulars, manage sewing candidate profiles, and track compliance metrics for Ashulia factory sites.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 shrink-0"
          >
            <PlusCircle className="h-4.5 w-4.5" />
            <span>Post New Circular (নতুন নিয়োগ বিজ্ঞপ্তি)</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Active Circulars</span>
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <PlusCircle className="h-5 w-5" />
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-slate-800 dark:text-slate-100 mt-2">{activeCircularsCount}</p>
          <p className="text-[11px] text-slate-500 mt-1">Live listings in main portal</p>
        </div>

        {/* Stat 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Total Applications</span>
            <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <Users className="h-5 w-5" />
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-slate-800 dark:text-slate-100 mt-2">{totalApplications}</p>
          <p className="text-[11px] text-slate-500 mt-1">All candidates reviewed</p>
        </div>

        {/* Stat 3 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Shortlist Success Rate</span>
            <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
              <FolderCheck className="h-5 w-5" />
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-slate-800 dark:text-slate-100 mt-2">{shortlistedRatio}%</p>
          <p className="text-[11px] text-slate-500 mt-1">High conversion rating</p>
        </div>

        {/* Stat 4 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Factory Audit Compliance</span>
            <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="h-5 w-5" />
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-emerald-600 mt-2">A+ Rating</p>
          <p className="text-[11px] text-slate-500 mt-1">BSCI Audit Verified</p>
        </div>

      </div>

      {/* Add Circular Form (Collapsible Panel) */}
      {showAddForm && (
        <form onSubmit={handlePostJob} className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900 rounded-3xl p-5 md:p-6 shadow-xl space-y-4 animate-in slide-in-from-top duration-200">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">Post a New Garments Circular (নিয়োগ বিজ্ঞপ্তি তৈরি করুন)</h3>
            <p className="text-xs text-slate-400">Publish active hiring posts instantly to the local worker feed.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Title */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Circular Job Title *</label>
              <input
                type="text"
                placeholder="e.g. Senior Double Needle Sewing Operator"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Company selection */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Factory Manufacturer</label>
              <select
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Location Area */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Industrial Zone Area</label>
              <input
                type="text"
                placeholder="e.g. DEPZ Gate 1, Ashulia"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Salary Min */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Min Monthly Wage (৳)</label>
              <input
                type="number"
                value={newSalMin}
                onChange={(e) => setNewSalMin(Number(e.target.value))}
                className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Salary Max */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Max Monthly Wage (৳)</label>
              <input
                type="number"
                value={newSalMax}
                onChange={(e) => setNewSalMax(Number(e.target.value))}
                className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Exp */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Experience Required (Years)</label>
              <input
                type="number"
                value={newExp}
                onChange={(e) => setNewExp(Number(e.target.value))}
                className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Education */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Required Education</label>
              <select
                value={newEdu}
                onChange={(e) => setNewEdu(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="None">None / Primary</option>
                <option value="Class 8 Pass">Class 8 Pass</option>
                <option value="HSC Passed">HSC Passed</option>
                <option value="Graduate">Graduate / Diploma</option>
              </select>
            </div>

            {/* Shift */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Shift Period</label>
              <select
                value={newShift}
                onChange={(e) => setNewShift(e.target.value as any)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="Day">Day Shift</option>
                <option value="Night">Night Shift</option>
                <option value="Both">Both Shifts Allowed</option>
              </select>
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Gender Rule</label>
              <select
                value={newGender}
                onChange={(e) => setNewGender(e.target.value as any)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="Any">Any Gender</option>
                <option value="Female">Female Only</option>
                <option value="Male">Male Only</option>
              </select>
            </div>

          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Hiring Details & Description</label>
            <textarea
              placeholder="Detail responsibilities, stitching tools, line rates, and benefit bonuses here..."
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4.5 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10"
            >
              Publish Circular Live (প্রকাশ করুন)
            </button>
          </div>
        </form>
      )}

      {/* Analytics chart and Review Board section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Analytics bar chart (Applicants Volume) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 md:p-6 shadow-sm lg:col-span-1">
          <div className="mb-4">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight">Hiring Success Analysis</h3>
            <p className="text-xs text-slate-400 font-medium">Applicants volume compared per published circular</p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="circular" stroke="#94a3b8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="applicants" name="Candidates" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="shortlisted" name="Shortlisted" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Applicants Review Table board */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 md:p-6 shadow-sm lg:col-span-2 space-y-4">
          <div>
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight">Active Applicants Review Board</h3>
            <p className="text-xs text-slate-400 font-medium">Verify sewing skills credentials and adjust statuses in real-time.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase font-bold font-mono">
                  <th className="pb-2 pl-1">Worker Candidate</th>
                  <th className="pb-2">Circular Target</th>
                  <th className="pb-2">Details / Phone</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2 pr-1 text-center">Interactive Decision Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {/* Seed initial applicants */}
                {initialApplicantsList.map((app) => {
                  const job = allJobs.find(j => j.id === app.jobId);
                  const currentStatusObj = appliedJobs.find(a => a.jobId === app.jobId);
                  const currentStatus = currentStatusObj?.status || 'Pending';
                  
                  return (
                    <tr key={app.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 pl-1">
                        <p className="font-extrabold text-slate-800 dark:text-slate-100">{app.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{app.education}</p>
                      </td>
                      <td className="py-3 text-slate-600 dark:text-slate-300 max-w-[120px] truncate" title={job?.title || 'Sewing'}>
                        {job?.title || 'Garments Worker'}
                      </td>
                      <td className="py-3 text-slate-500">
                        <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{app.exp}</p>
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5">{app.phone}</p>
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold ${
                          currentStatus === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400' :
                          currentStatus === 'Shortlisted' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400' :
                          currentStatus === 'Selected' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400' :
                          'bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400'
                        }`}>
                          {currentStatus}
                        </span>
                      </td>
                      <td className="py-3 pr-1 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => updateApplicantStatus(app.jobId, 'Shortlisted', 'Invited to physical sewing test')}
                            className="p-1 px-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[10px] font-extrabold transition-all"
                            title="Invite to physical sewing test at factory gate"
                          >
                            Shortlist
                          </button>
                          <button
                            onClick={() => updateApplicantStatus(app.jobId, 'Selected', 'Passed sewing test & joined the production line')}
                            className="p-1 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-extrabold transition-all"
                            title="Hire and activate worker contract"
                          >
                            Hire
                          </button>
                          <button
                            onClick={() => updateApplicantStatus(app.jobId, 'Rejected', 'Sewing test speed did not match quota')}
                            className="p-1 px-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg text-[10px] font-extrabold transition-all"
                            title="Decline applicant"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {/* Direct submissions from live search page */}
                {appliedJobs.filter(a => !initialApplicantsList.some(ia => ia.jobId === a.jobId)).map((applied) => {
                  const job = allJobs.find(j => j.id === applied.jobId);
                  if (!job) return null;
                  return (
                    <tr key={applied.jobId} className="bg-blue-50/20 dark:bg-blue-950/10 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 pl-1">
                        <p className="font-extrabold text-blue-600 dark:text-blue-400">Live Applied Candidate</p>
                        <p className="text-[10px] text-slate-400 font-mono">Interactive Portal User</p>
                      </td>
                      <td className="py-3 text-slate-600 dark:text-slate-300 max-w-[120px] truncate">
                        {job.title}
                      </td>
                      <td className="py-3 text-slate-500">
                        <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Experience Checked</p>
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5">Online Applicant</p>
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold ${
                          applied.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400' :
                          applied.status === 'Shortlisted' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400' :
                          applied.status === 'Selected' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400' :
                          'bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400'
                        }`}>
                          {applied.status}
                        </span>
                      </td>
                      <td className="py-3 pr-1 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => updateApplicantStatus(job.id, 'Shortlisted', 'Invited to online or phone interview')}
                            className="p-1 px-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[10px] font-extrabold transition-all"
                          >
                            Shortlist
                          </button>
                          <button
                            onClick={() => updateApplicantStatus(job.id, 'Selected', 'Offer letter sent')}
                            className="p-1 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-extrabold transition-all"
                          >
                            Hire
                          </button>
                          <button
                            onClick={() => updateApplicantStatus(job.id, 'Rejected', 'Qualifications did not match')}
                            className="p-1 px-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg text-[10px] font-extrabold transition-all"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/50 rounded-2xl flex items-start gap-2.5">
            <span className="text-blue-600 font-extrabold text-xs">💡</span>
            <p className="text-[11px] text-blue-800 dark:text-blue-300 font-medium">
              <strong>Interactive Demo Action:</strong> Click the &quot;Shortlist&quot;, &quot;Hire&quot;, or &quot;Reject&quot; buttons above. Then switch back to the **Candidate Dashboard** to see the worker&apos;s application state update in real-time!
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

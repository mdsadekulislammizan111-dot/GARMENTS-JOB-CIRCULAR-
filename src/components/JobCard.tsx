import React from 'react';
import { Job } from '../types';
import { MapPin, Calendar, Clock, Award, ShieldCheck, Heart, Share2, Sparkles, AlertTriangle } from 'lucide-react';

interface JobCardProps {
  key?: React.Key;
  job: Job;
  isSaved: boolean;
  onSaveToggle: (jobId: string) => void;
  onShare: (job: Job) => void;
  onApply: (job: Job) => void;
  onViewDetails: (job: Job) => void;
}

export default function JobCard({
  job,
  isSaved,
  onSaveToggle,
  onShare,
  onApply,
  onViewDetails
}: JobCardProps) {
  
  // Calculate remaining days
  const getRemainingDays = (deadlineStr: string) => {
    const deadline = new Date(deadlineStr);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const remainingDays = getRemainingDays(job.deadline);

  // Logo colors based on first letter to make placeholder logo circulars look premium
  const getLogoBg = (char: string) => {
    const code = char.charCodeAt(0) || 0;
    const colors = [
      'bg-blue-600 text-white',
      'bg-emerald-600 text-white',
      'bg-indigo-600 text-white',
      'bg-sky-600 text-white',
      'bg-purple-600 text-white',
      'bg-teal-600 text-white',
    ];
    return colors[code % colors.length];
  };

  return (
    <div 
      className={`relative rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        job.isUrgent 
          ? 'border-red-500/60 dark:border-red-800 shadow-sm shadow-red-500/5 hover:border-red-500 bg-red-50/10 dark:bg-red-950/5' 
          : 'border-slate-200/60 dark:border-slate-800/60'
      }`}
    >
      {/* Visual highlights top strip */}
      {job.isUrgent && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 rounded-t-3xl" />
      )}
      {job.isFeatured && !job.isUrgent && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-t-3xl" />
      )}

      {/* Main card body */}
      <div className="p-5 md:p-6 space-y-4">
        
        {/* Row 1: Header (Logo, Company details, Badges, Saved icon) */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Logo box */}
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-extrabold text-lg shadow-sm shrink-0 ${getLogoBg(job.logo)}`}>
              {job.logo}
            </div>
            
            {/* Company metadata */}
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 hover:underline cursor-pointer">
                  {job.companyName}
                </h4>
                {job.isVerified && (
                  <span className="text-blue-500" title="Verified Garments Manufacturer">
                    <ShieldCheck className="h-4 w-4 fill-blue-500/10" />
                  </span>
                )}
              </div>
              <h3 
                onClick={() => onViewDetails(job)}
                className="text-sm md:text-base font-extrabold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer line-clamp-1 transition-colors mt-0.5"
              >
                {job.title}
              </h3>
            </div>
          </div>

          {/* Save Heart Button */}
          <button
            onClick={() => onSaveToggle(job.id)}
            className={`p-2 rounded-xl transition-all ${
              isSaved 
                ? 'bg-red-50 dark:bg-red-950/30 text-red-500 scale-110' 
                : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
            title={isSaved ? "Saved to Favorites" : "Save Job Circular"}
          >
            <Heart className={`h-4.5 w-4.5 ${isSaved ? 'fill-red-500' : ''}`} />
          </button>
        </div>

        {/* Badges container */}
        <div className="flex flex-wrap gap-1.5 items-center">
          {job.isNewToday && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono">
              <Sparkles className="h-3 w-3 animate-spin-slow" />
              New Today
            </span>
          )}
          {job.isUrgent && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-extrabold bg-red-500/10 text-red-600 dark:text-red-400 uppercase tracking-wider font-mono animate-pulse">
              <AlertTriangle className="h-3 w-3" />
              Urgent Hiring
            </span>
          )}
          {job.isFeatured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-extrabold bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase tracking-wider font-mono">
              Featured Job
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono">
            {job.employmentType}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono">
            {job.shift} Shift
          </span>
        </div>

        {/* Card Metadata / Grid Info (Salary, Location, Exp) */}
        <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-slate-100 dark:border-slate-800/60 text-slate-600 dark:text-slate-300">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Salary (মাসিক)</span>
            <p className="text-xs md:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              {job.salaryType === 'negotiable' ? 'Negotiable' : `৳${job.salaryMin.toLocaleString()}`}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Area Location</span>
            <p className="text-xs font-semibold truncate flex items-center gap-1">
              <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
              {job.location}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Experience</span>
            <p className="text-xs font-semibold flex items-center gap-1">
              <Award className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              {job.experienceYears === 0 ? 'Helper / Fresher' : `${job.experienceYears}+ Years`}
            </p>
          </div>
        </div>

        {/* Footer actions of the card */}
        <div className="flex items-center justify-between gap-2.5">
          {/* Deadline details */}
          <div className="flex items-center gap-1.5 text-xs">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-400 font-mono leading-none">Apply Before</p>
              <p className={`text-[11px] font-bold mt-0.5 ${remainingDays <= 5 ? 'text-red-500 animate-pulse' : 'text-slate-600 dark:text-slate-300'}`}>
                {job.deadline} <span className="font-mono text-[9px]">({remainingDays}d left)</span>
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onShare(job)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
              title="Share Job"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewDetails(job)}
              className="px-3 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all"
            >
              Details
            </button>
            <button
              onClick={() => onApply(job)}
              className="px-4.5 py-2.5 text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all"
            >
              Apply Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

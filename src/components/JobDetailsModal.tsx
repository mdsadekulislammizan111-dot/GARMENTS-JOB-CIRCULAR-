import React from 'react';
import { Job, Company } from '../types';
import { ShieldCheck, MapPin, Calendar, Users, Award, GraduationCap, Clock, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';

interface JobDetailsModalProps {
  job: Job;
  company?: Company;
  onClose: () => void;
  onApply: (job: Job) => void;
  onShare: (job: Job) => void;
}

export default function JobDetailsModal({
  job,
  company,
  onClose,
  onApply,
  onShare
}: JobDetailsModalProps) {
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/40 backdrop-blur-sm p-0 md:p-4">
      
      {/* Drawer Card coming from right side */}
      <div className="w-full max-w-2xl h-full md:h-[90vh] bg-white dark:bg-slate-950 rounded-l-3xl md:rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Header Block with banner image */}
        <div className="relative h-40 bg-slate-100 shrink-0">
          <img 
            src={company?.banner || 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=800&q=80'} 
            alt="Factory banner"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/20 to-transparent" />
          
          {/* Back button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 h-9 w-9 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all flex items-center justify-center font-bold"
          >
            ←
          </button>

          {/* Core metadata overlaid on banner */}
          <div className="absolute bottom-4 left-5 right-5 text-left text-white space-y-1.5">
            <p className="text-[10px] font-bold text-sky-300 uppercase tracking-wider font-mono flex items-center gap-1 leading-none">
              {job.employmentType} • {job.shift} Shift
            </p>
            <h2 className="text-lg md:text-xl font-extrabold tracking-tight leading-snug line-clamp-1">{job.title}</h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-200">
              <span className="font-bold">{job.companyName}</span>
              {job.isVerified && <ShieldCheck className="h-4.5 w-4.5 fill-blue-500/20 text-blue-400" />}
            </div>
          </div>
        </div>

        {/* Scrollable details area */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 text-left">
          
          {/* Factory Info Widget */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Monthly Salary</span>
              <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                {job.salaryType === 'negotiable' ? 'Negotiable' : `৳${job.salaryMin.toLocaleString()}`}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Job Experience</span>
              <p className="text-xs font-semibold flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <Award className="h-4 w-4 text-slate-400 shrink-0" />
                {job.experienceYears === 0 ? 'Fresher Helper' : `${job.experienceYears}+ Years`}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Education Rule</span>
              <p className="text-xs font-semibold flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <GraduationCap className="h-4 w-4 text-slate-400 shrink-0" />
                {job.education}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Total Vacancies</span>
              <p className="text-xs font-semibold flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <Users className="h-4 w-4 text-slate-400 shrink-0" />
                {job.vacancies} Positions
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 border-l-3 border-blue-600 pl-2 leading-none">
              Hiring Overview (চাকরির বিবরণ)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 border-l-3 border-blue-600 pl-2 leading-none">
              Key Responsibilities (দায়িত্বসমূহ)
            </h3>
            <ul className="space-y-1.5">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex gap-2 text-xs text-slate-600 dark:text-slate-400 items-start">
                  <span className="text-blue-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 border-l-3 border-blue-600 pl-2 leading-none">
              Job Requirements (যোগ্যতাসমূহ)
            </h3>
            <ul className="space-y-1.5">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex gap-2 text-xs text-slate-600 dark:text-slate-400 items-start">
                  <span className="text-blue-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 border-l-3 border-blue-600 pl-2 leading-none">
              Employee Benefits (সুবিধাসমূহ)
            </h3>
            <ul className="space-y-1.5">
              {job.benefits.map((benefit, idx) => (
                <li key={idx} className="flex gap-2 text-xs text-slate-600 dark:text-slate-400 items-start">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60">
            <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100">Factory HR Recruitment Office</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs text-slate-500">
              <p className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                <span>Phone: {job.contactPhone}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <span>Email: {job.contactEmail}</span>
              </p>
            </div>
          </div>

          {/* Company Profile Quick view */}
          {company && (
            <div className="border-t border-slate-100 dark:border-slate-800 pt-5 space-y-2">
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">About the Employer (কোম্পানী পরিচিতি)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{company.description}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-400 font-semibold pt-2">
                <span>🏭 Industry: {company.industry}</span>
                <span>👥 Size: {company.size}</span>
                <span>📅 Founded: {company.founded}</span>
                <span>🌐 Site: <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{company.website.replace('https://', '')}</a></span>
              </div>
            </div>
          )}

        </div>

        {/* Footer CTAs of details panel */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => onShare(job)}
            className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5"
          >
            <span>Share Circular</span>
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-3 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Close
            </button>
            <button
              onClick={() => onApply(job)}
              className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl shadow-lg shadow-blue-500/10 transition-all"
            >
              Apply Online Now (আবেদন করুন)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

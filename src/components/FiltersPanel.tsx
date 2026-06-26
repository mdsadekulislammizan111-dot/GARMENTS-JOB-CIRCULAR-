import React from 'react';
import { FilterState } from '../types';
import { Filter, SlidersHorizontal, RefreshCw, MapPin, Briefcase, Award, GraduationCap, Calendar, Users, ShieldAlert } from 'lucide-react';

interface FiltersPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableLocations: string[];
  availablePositions: string[];
  availableCompanies: string[];
  totalJobsCount: number;
  filteredJobsCount: number;
}

export default function FiltersPanel({
  filters,
  setFilters,
  availableLocations,
  availablePositions,
  availableCompanies,
  totalJobsCount,
  filteredJobsCount
}: FiltersPanelProps) {
  
  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      companyName: 'all',
      location: 'all',
      position: 'all',
      salaryRange: 60000,
      experience: 'all',
      education: 'all',
      shift: 'all',
      gender: 'all',
      employmentType: 'all',
      datePosted: 'all'
    });
  };

  const handleSelectChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-5 md:p-6 shadow-sm transition-colors duration-200">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
            <SlidersHorizontal className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight">Advanced Search Filters</h2>
            <p className="text-[11px] text-slate-400 font-medium">Narrow down garments job circulars</p>
          </div>
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 px-2.5 py-1.5 rounded-lg transition-all border border-slate-100 dark:border-slate-800"
        >
          <RefreshCw className="h-3 w-3" />
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Factory Location Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
            <MapPin className="h-3.5 w-3.5 text-blue-500" />
            Factory Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleSelectChange('location', e.target.value)}
            className="w-full text-xs font-semibold py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="all">📍 All Locations</option>
            {availableLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Job Position Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
            <Briefcase className="h-3.5 w-3.5 text-blue-500" />
            Job Position
          </label>
          <select
            value={filters.position}
            onChange={(e) => handleSelectChange('position', e.target.value)}
            className="w-full text-xs font-semibold py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="all">🧵 All Sewing & Staff</option>
            {availablePositions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </div>

        {/* Company Name Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
            <ShieldAlert className="h-3.5 w-3.5 text-blue-500" />
            Company Name
          </label>
          <select
            value={filters.companyName}
            onChange={(e) => handleSelectChange('companyName', e.target.value)}
            className="w-full text-xs font-semibold py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="all">🏢 All Factory Groups</option>
            {availableCompanies.map(comp => (
              <option key={comp} value={comp}>{comp}</option>
            ))}
          </select>
        </div>

        {/* Experience Required Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
            <Award className="h-3.5 w-3.5 text-blue-500" />
            Experience
          </label>
          <select
            value={filters.experience}
            onChange={(e) => handleSelectChange('experience', e.target.value)}
            className="w-full text-xs font-semibold py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="all">⚡ All Experience Levels</option>
            <option value="0">👶 Helper / Fresher (0 Years)</option>
            <option value="1-3">🔰 1 - 3 Years (Junior)</option>
            <option value="3-5">🎖️ 3 - 5 Years (Mid Senior)</option>
            <option value="5+">🏆 5+ Years (Line Chief/Manager)</option>
          </select>
        </div>

        {/* Education Required Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
            <GraduationCap className="h-3.5 w-3.5 text-blue-500" />
            Education
          </label>
          <select
            value={filters.education}
            onChange={(e) => handleSelectChange('education', e.target.value)}
            className="w-full text-xs font-semibold py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="all">🎓 Any Education</option>
            <option value="None">❌ Primary / No Degree</option>
            <option value="Class 8 Pass">🏫 Class 8 Pass</option>
            <option value="HSC Passed">📜 HSC / High School</option>
            <option value="Graduate">🏛️ Graduate / Diploma</option>
          </select>
        </div>

        {/* Shift Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
            ☀️ Shift Type
          </label>
          <div className="flex gap-1.5 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            {['all', 'Day', 'Night'].map((shiftOpt) => (
              <button
                key={shiftOpt}
                type="button"
                onClick={() => handleSelectChange('shift', shiftOpt)}
                className={`flex-1 text-[10px] font-bold py-1.5 rounded-lg transition-all ${
                  filters.shift === shiftOpt
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800'
                }`}
              >
                {shiftOpt === 'all' ? 'All' : shiftOpt}
              </button>
            ))}
          </div>
        </div>

        {/* Gender Requirement Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
            <Users className="h-3.5 w-3.5 text-blue-500" />
            Gender Rule
          </label>
          <select
            value={filters.gender}
            onChange={(e) => handleSelectChange('gender', e.target.value)}
            className="w-full text-xs font-semibold py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="all">⚤ Any Gender</option>
            <option value="Female">👩 Female Only</option>
            <option value="Male">👨 Male Only</option>
            <option value="Any">🤝 Both / Any</option>
          </select>
        </div>

        {/* Employment Type Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
            🕰️ Contract Type
          </label>
          <select
            value={filters.employmentType}
            onChange={(e) => handleSelectChange('employmentType', e.target.value)}
            className="w-full text-xs font-semibold py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="all">💼 All Types</option>
            <option value="Full-Time">Full-Time (স্থায়ী)</option>
            <option value="Apprentice">Apprentice (শিক্ষানবিশ)</option>
            <option value="Contract">Contract (চুক্তিভিত্তিক)</option>
          </select>
        </div>

        {/* Date Posted Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
            <Calendar className="h-3.5 w-3.5 text-blue-500" />
            Date Published
          </label>
          <select
            value={filters.datePosted}
            onChange={(e) => handleSelectChange('datePosted', e.target.value)}
            className="w-full text-xs font-semibold py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="all">📅 Anytime</option>
            <option value="today">⚡ Posted Today</option>
            <option value="3days">📆 Last 3 Days</option>
            <option value="7days">🗓️ Last 7 Days</option>
          </select>
        </div>

        {/* Maximum Salary Filter Slider */}
        <div className="space-y-1.5 col-span-1">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
              Max Salary (৳)
            </label>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
              ৳{filters.salaryRange.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="60000"
            step="1000"
            value={filters.salaryRange}
            onChange={(e) => handleSelectChange('salaryRange', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="flex justify-between text-[9px] text-slate-400 font-bold font-mono">
            <span>৳10k</span>
            <span>৳35k</span>
            <span>৳60k</span>
          </div>
        </div>

      </div>

      <div className="mt-4 flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Showing <span className="text-blue-600 dark:text-blue-400 font-extrabold">{filteredJobsCount}</span> active circulars out of <span className="font-extrabold">{totalJobsCount}</span> total listings.
        </p>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Matched Real-Time</span>
        </div>
      </div>
    </div>
  );
}

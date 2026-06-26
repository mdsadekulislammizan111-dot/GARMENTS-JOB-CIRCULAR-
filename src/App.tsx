import React, { useState, useEffect, useMemo } from 'react';
import { jobsData, companiesData, initialNotifications } from './data';
import { Job, Company, Notification, FilterState, ViewRole, SavedJob, AppliedJob } from './types';

// Importing premium sub-components
import PortalHeader from './components/PortalHeader';
import FiltersPanel from './components/FiltersPanel';
import JobCard from './components/JobCard';
import DashboardCandidate from './components/DashboardCandidate';
import DashboardEmployer from './components/DashboardEmployer';
import DashboardAdmin from './components/DashboardAdmin';
import AuthModals from './components/AuthModals';
import JobDetailsModal from './components/JobDetailsModal';
import ApplicationFormModal from './components/ApplicationFormModal';
import ShareModal from './components/ShareModal';
import BottomNavigation from './components/BottomNavigation';
import SidebarNavigation from './components/SidebarNavigation';
import InfoHub from './components/InfoHub';

import { Search, Sparkles, AlertTriangle, HelpCircle, ArrowRight, RefreshCw, Layers } from 'lucide-react';

export default function App() {
  // Global Shared States
  const [allJobs, setAllJobs] = useState<Job[]>(jobsData);
  const [companies, setCompanies] = useState<Company[]>(companiesData);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  
  // Navigation & Perspective States
  const [activeTab, setActiveTab] = useState<string>('jobs');
  const [currentRole, setCurrentRole] = useState<ViewRole>('candidate');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // default logged in to show seamless dashboards on load!
  const [userEmail, setUserEmail] = useState<string>('mizanur.textiles@gmail.com');

  // Search, Filters & Skeletons State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage = 4;

  const [filters, setFilters] = useState<FilterState>({
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

  // User Actions (Saved and Applied job states)
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1', 'job-3']);
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([
    { jobId: 'job-1', appliedAt: '2026-06-25', status: 'Pending', notes: 'Reviewing sewing credentials.' },
    { jobId: 'job-3', appliedAt: '2026-06-24', status: 'Shortlisted', notes: 'Invited to physical sewing test on Saturday at 9:00 AM.' }
  ]);

  // Modal View States
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<Job | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [selectedJobForShare, setSelectedJobForShare] = useState<Job | null>(null);

  // Bind Dark Mode CSS Class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Simulate premium search loading skeleton on filter change
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => setIsSearching(false), 350);
    return () => clearTimeout(timer);
  }, [searchQuery, filters]);

  // Derive Filter Metadata
  const availableLocations = useMemo(() => {
    const locs = allJobs.map(j => j.location);
    return Array.from(new Set(locs));
  }, [allJobs]);

  const availablePositions = useMemo(() => {
    // Standardize keywords for filter options
    return ['Sewing Machine Operator', 'Quality Control (QC)', 'Pattern Maker', 'Assistant Merchandiser', 'Line Chief', 'Garments Helper', 'Compliance Officer'];
  }, []);

  const availableCompanies = useMemo(() => {
    return companies.map(c => c.name);
  }, [companies]);

  // Core Filtering Logic
  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      // 1. Text Search query (Checks company, title, description)
      const q = searchQuery.toLowerCase() || filters.searchQuery.toLowerCase();
      if (q) {
        const matchesQuery = 
          job.title.toLowerCase().includes(q) || 
          job.companyName.toLowerCase().includes(q) || 
          job.description.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. Company Name filter
      if (filters.companyName !== 'all') {
        if (job.companyName !== filters.companyName) return false;
      }

      // 3. Location filter
      if (filters.location !== 'all') {
        if (job.location !== filters.location) return false;
      }

      // 4. Job Position filter
      if (filters.position !== 'all') {
        const p = filters.position.toLowerCase();
        // check keyword inclusion
        const titleLower = job.title.toLowerCase();
        if (p.includes('operator') && !titleLower.includes('operator')) return false;
        if (p.includes('quality') && !titleLower.includes('qc') && !titleLower.includes('quality')) return false;
        if (p.includes('pattern') && !titleLower.includes('pattern')) return false;
        if (p.includes('merchandiser') && !titleLower.includes('merchandiser')) return false;
        if (p.includes('chief') && !titleLower.includes('chief') && !titleLower.includes('supervisor')) return false;
        if (p.includes('helper') && !titleLower.includes('helper') && !titleLower.includes('apprentice')) return false;
        if (p.includes('compliance') && !titleLower.includes('compliance')) return false;
      }

      // 5. Salary range filter (Checks maximum slider bound)
      if (job.salaryMin > filters.salaryRange) return false;

      // 6. Experience filter
      if (filters.experience !== 'all') {
        if (filters.experience === '0' && job.experienceYears !== 0) return false;
        if (filters.experience === '1-3' && (job.experienceYears < 1 || job.experienceYears > 3)) return false;
        if (filters.experience === '3-5' && (job.experienceYears < 3 || job.experienceYears > 5)) return false;
        if (filters.experience === '5+' && job.experienceYears < 5) return false;
      }

      // 7. Education filter
      if (filters.education !== 'all') {
        if (filters.education === 'None' && job.education !== 'None / Primary' && job.education !== 'None') return false;
        if (filters.education === 'Class 8 Pass' && !job.education.includes('Class 8')) return false;
        if (filters.education === 'HSC Passed' && !job.education.includes('HSC')) return false;
        if (filters.education === 'Graduate' && !job.education.includes('Graduate') && !job.education.includes('Diploma')) return false;
      }

      // 8. Shift Day/Night filter
      if (filters.shift !== 'all') {
        if (job.shift !== filters.shift && job.shift !== 'Both') return false;
      }

      // 9. Gender filter
      if (filters.gender !== 'all') {
        if (job.gender !== filters.gender && job.gender !== 'Any') return false;
      }

      // 10. Employment contract type
      if (filters.employmentType !== 'all') {
        if (job.employmentType !== filters.employmentType) return false;
      }

      // 11. Date Posted filter
      if (filters.datePosted !== 'all') {
        const postedDate = new Date(job.datePosted);
        const diffDays = (Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24);
        if (filters.datePosted === 'today' && diffDays > 1) return false;
        if (filters.datePosted === '3days' && diffDays > 3) return false;
        if (filters.datePosted === '7days' && diffDays > 7) return false;
      }

      return true;
    });
  }, [allJobs, searchQuery, filters]);

  // Paginated listings
  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * jobsPerPage;
    return filteredJobs.slice(startIndex, startIndex + jobsPerPage);
  }, [filteredJobs, currentPage]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage) || 1;

  // Extract separate urgent list for highlights panel
  const urgentJobs = useMemo(() => {
    return allJobs.filter(j => j.isUrgent);
  }, [allJobs]);

  // Save/Unsave Circular handler
  const handleSaveToggle = (jobId: string) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setSavedJobIds(prev => {
      const exists = prev.includes(jobId);
      if (exists) {
        return prev.filter(id => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  };

  // Submit Application handler (from Modal form)
  const handleApplySuccess = (jobId: string) => {
    setAppliedJobs(prev => {
      const exists = prev.some(a => a.jobId === jobId);
      if (exists) return prev;
      return [...prev, { jobId, appliedAt: '2026-06-26', status: 'Pending', notes: 'Submitted via online portal. Directing to factory screening.' }];
    });

    // Auto append a success notification
    const job = allJobs.find(j => j.id === jobId);
    if (job) {
      const newNotif: Notification = {
        id: `notif-${Date.now()}`,
        title: 'Application Received!',
        message: `Your credentials were successfully transmitted to ${job.companyName} for the ${job.title} circular. Visit their DEPZ room for test.`,
        type: 'success',
        timestamp: 'Just now',
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  const handleApplyTrigger = (job: Job) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setSelectedJobForApply(job);
  };

  const handleShareTrigger = (job: Job) => {
    setSelectedJobForShare(job);
  };

  const handleViewDetailsTrigger = (job: Job) => {
    setSelectedJobForDetails(job);
  };

  const handleLoginSuccess = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setSavedJobIds([]);
    setAppliedJobs([]);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 bg-[#f8fafc] text-[#0f172a] dark:bg-slate-950 dark:text-slate-100 ${darkMode ? 'dark' : ''}`}>
      
      {/* Header component */}
      <PortalHeader
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        notifications={notifications}
        setNotifications={setNotifications}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        onOpenAuth={() => setShowAuthModal(true)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        userEmail={userEmail}
        onNavigateToTab={setActiveTab}
      />

      {/* Main Container Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        
        {/* Desktop Sidebar navigation */}
        <SidebarNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentRole={currentRole}
          isLoggedIn={isLoggedIn}
          onOpenAuth={() => setShowAuthModal(true)}
          userEmail={userEmail}
        />

        {/* Content canvas area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8 pb-20 md:pb-8 overflow-x-hidden">
          
          {/* TAB 1: MAIN JOB CIRCULAR SEARCH FEED */}
          {activeTab === 'jobs' && (
            <div className="space-y-6">
              
              {/* Hero Circular section */}
              <div className="rounded-3xl bg-gradient-to-tr from-sky-950 via-slate-900 to-emerald-950 p-6 md:p-10 text-white shadow-xl shadow-sky-950/15 text-left relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 hidden lg:block">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="2" />
                    <line x1="100" y1="0" x2="0" y2="100" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
                <div className="max-w-2xl space-y-3.5 relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Bangladesh apparel industry jobs matching platform
                  </span>
                  <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent">
                    Latest Ashulia Garments Job Circulars
                  </h1>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                    Connecting operators, quality inspectors, merchandisers, pattern makers and helpers with verified export garments manufacturers inside DEPZ, Jamgora, Savar, Gazipur and surrounding areas.
                  </p>
                </div>
              </div>

              {/* Advanced search filters panel */}
              <FiltersPanel
                filters={filters}
                setFilters={setFilters}
                availableLocations={availableLocations}
                availablePositions={availablePositions}
                availableCompanies={availableCompanies}
                totalJobsCount={allJobs.length}
                filteredJobsCount={filteredJobs.length}
              />

              {/* Main Feed Row split with urgent sidebar on desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left side: Circular Cards list */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex justify-between items-center text-left">
                    <div>
                      <h2 className="font-extrabold text-sm md:text-base text-slate-800 dark:text-slate-100 tracking-tight">Active Recruitment Circulars</h2>
                      <p className="text-[11px] text-slate-400 font-medium">Direct factory applications with compliance wage structures</p>
                    </div>
                    {isSearching && (
                      <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 flex items-center gap-1.5 font-bold animate-pulse">
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Matching...
                      </span>
                    )}
                  </div>

                  {/* LOADING SKELETON SIMULATION */}
                  {isSearching ? (
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="rounded-3xl border border-slate-200/50 dark:border-slate-800 p-5 bg-white dark:bg-slate-900 space-y-4 animate-pulse">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
                            <div className="flex-1 space-y-2">
                              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-md w-1/3" />
                              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-md w-3/4" />
                            </div>
                          </div>
                          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-md w-full" />
                          <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-md w-1/4" />
                            <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded-xl w-1/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : filteredJobs.length === 0 ? (
                    
                    /* EMPTY STATE ILLUSTRATION */
                    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-10 text-center space-y-4">
                      <div className="h-16 w-16 bg-blue-50 dark:bg-blue-950/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto text-2xl">
                        🔍
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-extrabold text-sm md:text-base text-slate-800 dark:text-slate-100 tracking-tight">No Matching Garments Circulars</h3>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">None of our current listings inside Ashulia or Savar hubs match your exact criteria.</p>
                      </div>
                      <button
                        onClick={() => setFilters({
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
                        })}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                      >
                        Clear All Filter Selection
                      </button>
                    </div>
                  ) : (
                    
                    /* POPULATED JOBS LIST */
                    <div className="space-y-4">
                      {paginatedJobs.map((job) => (
                        <JobCard
                          key={job.id}
                          job={job}
                          isSaved={savedJobIds.includes(job.id)}
                          onSaveToggle={handleSaveToggle}
                          onShare={handleShareTrigger}
                          onApply={handleApplyTrigger}
                          onViewDetails={handleViewDetailsTrigger}
                        />
                      ))}

                      {/* Pagination Section */}
                      {totalPages > 1 && (
                        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 text-xs font-bold text-slate-500">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-100'}`}
                          >
                            ← Previous
                          </button>
                          <span className="font-mono">Page {currentPage} of {totalPages}</span>
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-100'}`}
                          >
                            Next →
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Right side: Urgent Hiring sidebar panel */}
                <div className="space-y-4">
                  <div className="text-left">
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                      Urgent Openings (জরুরী নিয়োগ)
                    </h3>
                    <p className="text-[10px] text-slate-400 font-medium">Factories seeking candidates for immediate physical sewing trials</p>
                  </div>

                  <div className="space-y-3">
                    {urgentJobs.map((job) => (
                      <div 
                        key={job.id}
                        onClick={() => handleViewDetailsTrigger(job)}
                        className="bg-red-50/20 dark:bg-red-950/5 border border-red-200/60 dark:border-red-900 p-4 rounded-2xl flex flex-col justify-between gap-3 text-left cursor-pointer hover:border-red-500 transition-all shadow-sm shadow-red-500/5"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded-md text-[8px] font-extrabold bg-red-500/10 text-red-600 uppercase font-mono animate-pulse">Urgent Hire</span>
                            <span className="text-[9px] font-mono text-slate-400">{job.location}</span>
                          </div>
                          <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100 mt-1 line-clamp-1">{job.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{job.companyName}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-2 text-[10px] text-slate-500">
                          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">৳{job.salaryMin.toLocaleString()} BDT</span>
                          <span className="text-blue-500 font-bold flex items-center gap-0.5">Apply Now <span className="font-mono">→</span></span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* BGMEA Info Block */}
                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/60 text-left space-y-2">
                    <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1 font-mono">
                      <span>✓</span> Compliance Standards
                    </h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      All circulars are validated against Bangladesh Garments Manufacturers and Exporters Association (BGMEA) wage Grade structures to prevent worker exploitation.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: INTERACTIVE DASHBOARD SECTION */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Render Dashboard based on selected Perspective */}
              {currentRole === 'candidate' && (
                <DashboardCandidate
                  appliedJobs={appliedJobs}
                  savedJobsIds={savedJobIds}
                  allJobs={allJobs}
                  onRemoveSaved={(id) => setSavedJobIds(prev => prev.filter(x => x !== id))}
                  onApplyFromSaved={handleApplyTrigger}
                  onViewDetails={handleViewDetailsTrigger}
                  userEmail={userEmail}
                />
              )}

              {currentRole === 'employer' && (
                <DashboardEmployer
                  allJobs={allJobs}
                  setAllJobs={setAllJobs}
                  appliedJobs={appliedJobs}
                  setAppliedJobs={setAppliedJobs}
                  companies={companies}
                  userEmail={userEmail}
                />
              )}

              {currentRole === 'admin' && (
                <DashboardAdmin
                  companies={companies}
                  setCompanies={setCompanies}
                  notifications={notifications}
                  setNotifications={setNotifications}
                />
              )}
            </div>
          )}

          {/* TAB 3: ASHULIA INDUSTRIAL RESOURCES HUB INFO */}
          {activeTab === 'about' && (
            <InfoHub />
          )}

        </main>
      </div>

      {/* MODAL OVERLAYS (GLASSMORPHIC DESIGNS) */}

      {/* 1. Auth Login/Register Modal */}
      {showAuthModal && (
        <AuthModals
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* 2. Job Circular Details Modal Sheet */}
      {selectedJobForDetails && (
        <JobDetailsModal
          job={selectedJobForDetails}
          company={companies.find(c => c.id === selectedJobForDetails.companyId)}
          onClose={() => setSelectedJobForDetails(null)}
          onApply={(job) => {
            setSelectedJobForDetails(null);
            handleApplyTrigger(job);
          }}
          onShare={(job) => {
            setSelectedJobForDetails(null);
            handleShareTrigger(job);
          }}
        />
      )}

      {/* 3. Multi-Step Apply Online Wizard Form */}
      {selectedJobForApply && (
        <ApplicationFormModal
          job={selectedJobForApply}
          onClose={() => setSelectedJobForApply(null)}
          onSubmitSuccess={handleApplySuccess}
        />
      )}

      {/* 4. Social Sharing & Gate QR Copy Modal */}
      {selectedJobForShare && (
        <ShareModal
          job={selectedJobForShare}
          onClose={() => setSelectedJobForShare(null)}
        />
      )}

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setShowAuthModal(true)}
        isLoggedIn={isLoggedIn}
      />

      {/* Premium Desktop Footer Section */}
      <footer className="w-full bg-slate-900 border-t border-slate-800 p-6 md:p-8 text-slate-400 text-left mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-white">Ashulia Garments Circular</h4>
            <p className="text-slate-400 font-medium">Bangladesh&apos;s leading tech portal for verified apparel sector hiring and compliance reporting.</p>
            <p className="text-[10px] text-slate-500 font-mono">Build ID: e584e845-8c6d-4505-a189-d03e0bf3b5f4</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-white text-left">Industrial Locations Supported</h4>
            <ul className="space-y-1 font-semibold">
              <li>📍 Dhaka Export Processing Zone (DEPZ), Ashulia</li>
              <li>📍 Jamgora, Narayonpur, Nabinagar, Savar</li>
              <li>📍 Gazipur Chowrasta, Mawna, Konabari</li>
              <li>📍 Tongi Industrial Area, Boardbazar</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-white text-left">Corporate Partnerships</h4>
            <p className="text-slate-400 font-medium">We collaborate with BGMEA factory owners, ILO safety standards committees, and local worker unions to deliver secure on-time monthly wage assurances.</p>
            <div className="flex gap-4 pt-1 text-slate-500">
              <a href="#" className="hover:text-blue-500 transition-colors">Welfare Rules</a>
              <span>•</span>
              <a href="#" className="hover:text-blue-500 transition-colors">Employer Logins</a>
              <span>•</span>
              <a href="#" className="hover:text-blue-500 transition-colors">Report Violation</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-6 pt-4 text-center text-[11px] text-slate-500">
          <p>© 2026 Ashulia Garments Circular. Made under the joint patronage of Bangladesh Garments Sourcing Alliances. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

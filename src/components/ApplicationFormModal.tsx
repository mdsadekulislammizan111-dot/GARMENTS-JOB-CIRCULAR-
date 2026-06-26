import React, { useState } from 'react';
import { Job } from '../types';
import { User, Phone, Briefcase, Award, Key, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface ApplicationFormModalProps {
  job: Job;
  onClose: () => void;
  onSubmitSuccess: (jobId: string) => void;
}

type ApplyStep = 1 | 2 | 3 | 4;

export default function ApplicationFormModal({
  job,
  onClose,
  onSubmitSuccess
}: ApplicationFormModalProps) {
  
  const [step, setStep] = useState<ApplyStep>(1);

  // Form Field States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [locationZone, setLocationZone] = useState('Jamgora, Ashulia');
  const [experience, setExperience] = useState('2');
  const [primarySkill, setPrimarySkill] = useState('Sewing Machine Operator (Single Needle)');
  const [lastFactory, setLastFactory] = useState('');
  const [otpCode, setOtpCode] = useState('');

  // Handle step transitions
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!name || !phone) return;
      setStep(2);
    } else if (step === 2) {
      setStep(3); // Go to SMS OTP Verification
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;
    
    // Success: add to global list
    onSubmitSuccess(job.id);
    setStep(4); // Success screen
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/45 backdrop-blur-md">
      
      {/* Centered Modal Content Card */}
      <div className="w-full max-w-lg bg-white dark:bg-slate-950 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-2xl overflow-hidden text-left relative transition-all">
        
        {/* Progress header strip */}
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-900">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Card Header */}
        <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-800/80 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/30">
          <div>
            <span className="text-[9px] font-mono font-bold text-blue-600 dark:text-sky-400 uppercase tracking-wider">Online Job Submission</span>
            <h3 className="text-sm md:text-base font-extrabold text-slate-800 dark:text-slate-100 leading-none mt-1">
              Applying for: {job.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1">{job.companyName} • {job.location}</p>
          </div>
          <button 
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-400 hover:text-slate-600 text-xs font-bold transition-all flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Dynamic Wizard Step views */}
        <div className="p-5 md:p-6">
          
          {/* STEP 1: Personal Contact details */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-extrabold text-xs text-slate-700 dark:text-slate-200 uppercase tracking-wider font-mono">Step 1: Contact Verification</h4>
                <span className="text-[10px] font-bold text-blue-600 font-mono">1 of 3</span>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Your Full Name (NID matching)</label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Md. Sadekul Islam"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Mobile Phone */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Bangladesh Mobile Number</label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 01799887766"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <p className="text-[9px] text-slate-400">We will send a 6-digit verification code to this phone number.</p>
              </div>

              {/* Residential Zone in Ashulia */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Current Living Area in Ashulia</label>
                <select
                  value={locationZone}
                  onChange={(e) => setLocationZone(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  <option value="Jamgora, Ashulia">Jamgora, Ashulia</option>
                  <option value="DEPZ Area, Ashulia">DEPZ Area, Ashulia</option>
                  <option value="Baipail, Ashulia">Baipail, Ashulia</option>
                  <option value="Nabinagar, Savar">Nabinagar, Savar</option>
                  <option value="Zirani Bazar, Ashulia">Zirani Bazar, Ashulia</option>
                  <option value="Tongi, Gazipur">Tongi, Gazipur</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/10 flex items-center gap-1 transition-all"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Garments sewing expertise */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-extrabold text-xs text-slate-700 dark:text-slate-200 uppercase tracking-wider font-mono">Step 2: Apparel Skills & History</h4>
                <span className="text-[10px] font-bold text-blue-600 font-mono">2 of 3</span>
              </div>

              {/* Skills checklist */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Primary Manufacturing Skill</label>
                <select
                  value={primarySkill}
                  onChange={(e) => setPrimarySkill(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  <option value="Sewing Machine Operator (Single Needle)">Sewing Machine Operator (Single Needle)</option>
                  <option value="Sewing Machine Operator (Overlock/Flatlock)">Sewing Machine Operator (Overlock/Flatlock)</option>
                  <option value="Production Helper / Apprentice">Production Helper / Apprentice</option>
                  <option value="Quality Inspector (QC)">Quality Inspector (QC)</option>
                  <option value="Pattern CAD Drafter">Pattern CAD Drafter</option>
                  <option value="Line Supervisor / Chief">Line Supervisor / Chief</option>
                </select>
              </div>

              {/* Years of Experience */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Years in Garments Industry</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Last Factory */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Last Garments Factory Worked At</label>
                <div className="relative flex items-center">
                  <Briefcase className="absolute left-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. DBL Group, Savar, or None (Fresher)"
                    value={lastFactory}
                    onChange={(e) => setLastFactory(e.target.value)}
                    className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 text-xs font-bold hover:bg-slate-100 flex items-center gap-1 transition-all"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/10 flex items-center gap-1 transition-all"
                >
                  <span>Verify Identity</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: OTP Verification Screen */}
          {step === 3 && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-extrabold text-xs text-slate-700 dark:text-slate-200 uppercase tracking-wider font-mono">Step 3: Verification Check</h4>
                <span className="text-[10px] font-bold text-blue-600 font-mono">3 of 3</span>
              </div>

              <p className="text-xs text-slate-400">An authorization OTP code was texted to <strong className="font-mono">{phone || 'your phone'}</strong>. Provide it below to complete submission compliance.</p>

              {/* OTP */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">6-Digit Verification Code</label>
                <div className="relative flex items-center">
                  <Key className="absolute left-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 524103"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full text-center tracking-widest text-base font-extrabold py-2.5 pl-10 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 text-xs font-bold hover:bg-slate-100 flex items-center gap-1 transition-all"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/10 flex items-center gap-1 transition-all"
                >
                  <span>Submit Application</span>
                  <CheckCircle2 className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Submit Success checkmark page */}
          {step === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-950/40 rounded-full flex items-center justify-center text-emerald-500 text-3xl mx-auto shadow-md">
                ✓
              </div>
              
              <div className="space-y-1">
                <h4 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Application Submitted!</h4>
                <p className="text-xs text-slate-400">Your profile details were logged with {job.companyName}.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-left space-y-2.5 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Next Compliance Steps</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  1. Visit the factory recruitment room at <strong>{job.location}</strong> on any workday between 8:00 AM - 10:00 AM.<br />
                  2. Bring your original <strong>National ID (NID) card</strong>, birth certificate, and educational papers.<br />
                  3. Be prepared to pass a short physical machine sewing trial on-site.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all hover:bg-slate-800"
                >
                  Close & View Dashboard
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

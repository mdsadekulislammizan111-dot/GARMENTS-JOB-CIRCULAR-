import React from 'react';
import { ShieldCheck, PhoneCall, MapPin, Compass, AlertCircle, Sparkles, Building, HeartPulse, Bus, BookOpen } from 'lucide-react';

export default function InfoHub() {
  
  const zones = [
    { name: 'Dhaka EPZ (DEPZ)', description: 'Gate 1 & Gate 2 area. Features top compliance multinational export manufacturers with high wages.', busRoutes: 'DEPZ Local, Hanif, Baipail Express' },
    { name: 'Jamgora, Ashulia', description: 'Dense cluster of major knitting and denim groups including Ha-Meem Group and Mohammadi. High rental hostels.', busRoutes: 'Abdullahpur-Ashulia Highway local buses' },
    { name: 'Nabinagar Circle', description: 'Central connector for Savar and Aricha. Highly populated with finishing units and washing plants.', busRoutes: 'Gabtoli-Savar transit, Nabinagar local' },
    { name: 'Zirani Bazar', description: 'Denim weaving mills. Located along the outer bypass connecting to Gazipur industrial zones.', busRoutes: 'Chandra Express, Gazipur local transit' }
  ];

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      
      {/* Brand banner */}
      <div className="rounded-3xl bg-gradient-to-tr from-emerald-700 via-teal-600 to-sky-700 p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <span className="absolute right-4 top-4 h-16 w-16 opacity-10 font-extrabold text-5xl">ℹ</span>
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold font-mono text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Worker Guidelines & Compliance
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Ashulia Garments Worker Resource Hub</h2>
          <p className="text-xs md:text-sm text-emerald-100 font-medium">
            Learn about Bangladesh labor law wage rates, locate transport routes along Ashulia-Baipail highway, and browse local factory emergency hotlines.
          </p>
        </div>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Box 1: Wage Rules */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 md:p-6 shadow-sm space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight">Standard Wage Scales (BD Labor Act)</h3>
              <p className="text-xs text-slate-400 font-medium">Official compliance wages structured per grade level</p>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            The Bangladesh Ministry of Labour regulates garments pay under multiple Grades. Export-oriented garments factories inside Ashulia, Savar, and DEPZ strictly adhere to or exceed these minimum baseline structures:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/60 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Helper / Apprentice</span>
              <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1">৳10,000 - ৳11,500</p>
              <p className="text-[9px] text-slate-400 mt-1">No prior experience needed. Grade 7 entry-level.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/60 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Junior Sewing Operator</span>
              <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1">৳12,000 - ৳14,500</p>
              <p className="text-[9px] text-slate-400 mt-1">Basic sewing loops. Grade 5 & 6 rating.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/60 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Senior Sewing Operator</span>
              <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1">৳14,500 - ৳19,000</p>
              <p className="text-[9px] text-slate-400 mt-1">Flatlock, double-needle expertise. Grade 3 & 4.</p>
            </div>
          </div>
        </div>

        {/* Box 2: Emergency Hotlines */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl">
              <PhoneCall className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight">Emergency Hotlines</h3>
              <p className="text-xs text-slate-400 font-medium">Direct factory and welfare support calls</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800/60">
              <div>
                <p className="font-extrabold text-slate-700 dark:text-slate-200">National Help Desk</p>
                <p className="text-[10px] text-slate-400">Police, Fire, Ambulance</p>
              </div>
              <span className="text-sm font-extrabold text-blue-600 font-mono">999</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800/60">
              <div>
                <p className="font-extrabold text-slate-700 dark:text-slate-200">BGMEA Worker Union</p>
                <p className="text-[10px] text-slate-400">Labor welfare helpline</p>
              </div>
              <span className="text-sm font-extrabold text-blue-600 font-mono">16124</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800/60">
              <div>
                <p className="font-extrabold text-slate-700 dark:text-slate-200">Ashulia Police Station</p>
                <p className="text-[10px] text-slate-400">Local police security</p>
              </div>
              <span className="text-sm font-extrabold text-blue-600 font-mono">01713373125</span>
            </div>
          </div>
        </div>

        {/* Box 3: Industrial Zones details */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 md:p-6 shadow-sm space-y-4 md:col-span-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-sky-400 rounded-xl">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight">Ashulia-Savar Industrial Zone Hubs</h3>
              <p className="text-xs text-slate-400 font-medium">Navigating factory density and transit access routes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {zones.map((z, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40 flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100 flex items-center gap-1">
                    <span className="text-blue-500">•</span>
                    {z.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-normal">{z.description}</p>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-2 text-[10px] text-slate-400">
                  <span className="font-extrabold block text-[8px] uppercase tracking-wider font-mono">Highway Bus Routes:</span>
                  <span className="mt-0.5 block">{z.busRoutes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Box 4: Standard Shifts */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 md:p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Bus className="h-4.5 w-4.5" />
            </div>
            <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100">Factory Bus Networks</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Major groups like <strong>Beximco Apparels</strong> and <strong>DBL</strong> offer free daily shuttle buses picking up operators along Baipail highway points at 7:15 AM and dropping off after overtime shifts.
          </p>
        </div>

        {/* Box 5: Health & Clinics */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 md:p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-lg">
              <HeartPulse className="h-4.5 w-4.5" />
            </div>
            <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100">Welfare & Medical Care</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Under compliance laws, export garments factories feature dedicated on-site medical rooms with certified nurses providing free treatment, medicines, and annual eye checkups for operators.
          </p>
        </div>

        {/* Box 6: NID Requirement */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-5 md:p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-lg">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100">Why NID Card is Vital</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            NID (National Identification Card) or Union birth certificates are absolutely required during recruitment gates to prevent underage labor, secure legal provident funds, and authenticate bank wage payments.
          </p>
        </div>

      </div>

    </div>
  );
}

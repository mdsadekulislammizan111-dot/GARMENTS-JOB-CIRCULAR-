import React, { useState } from 'react';
import { Job } from '../types';
import { Copy, Check, QrCode, Facebook, MessageSquare, PhoneCall } from 'lucide-react';

interface ShareModalProps {
  job: Job;
  onClose: () => void;
}

export default function ShareModal({ job, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://ashulia-circular.org/jobs/${job.id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white dark:bg-slate-950 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-5 md:p-6 shadow-2xl relative text-left">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xs font-bold font-mono"
        >
          ✕
        </button>

        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Spread the word</span>
        <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 mt-1 mb-4">Share Job Circular</h3>

        <div className="space-y-4">
          
          {/* Quick link copying input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Job Circular Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-[11px] font-mono font-medium text-slate-500 outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center transition-all shadow-sm"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            {copied && <p className="text-[10px] font-bold text-emerald-500 font-mono">✓ Link copied successfully!</p>}
          </div>

          {/* Social shares */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
            <button
              onClick={() => alert('Sharing to Facebook is simulated!')}
              className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 flex flex-col items-center gap-1.5 font-bold transition-all"
            >
              <Facebook className="h-4.5 w-4.5" />
              <span className="text-[10px]">Facebook</span>
            </button>
            <button
              onClick={() => alert('Sharing to IMO Messenger is simulated!')}
              className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex flex-col items-center gap-1.5 font-bold transition-all"
            >
              <MessageSquare className="h-4.5 w-4.5" />
              <span className="text-[10px]">IMO / Messenger</span>
            </button>
            <button
              onClick={() => alert('Simulating SMS copy broadcast!')}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex flex-col items-center gap-1.5 font-bold transition-all"
            >
              <PhoneCall className="h-4.5 w-4.5" />
              <span className="text-[10px]">Direct SMS</span>
            </button>
          </div>

          {/* QR Code section (Saves time at gates!) */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center gap-4">
            {/* Visual simulation of QR Code */}
            <div className="h-16 w-16 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-1 shrink-0">
              <QrCode className="h-10 w-10 text-slate-800 dark:text-slate-200" />
              <span className="text-[7px] font-bold font-mono text-slate-400">SCAN LIVE</span>
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100">Factory Gate QR Code</h4>
              <p className="text-[11px] text-slate-400 mt-1">Workers at Ashulia gates can scan this barcode on their mobile phone cameras to view compliance circulars instantly.</p>
            </div>
          </div>

        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
}

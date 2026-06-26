import React, { useState } from 'react';
import { Lock, Mail, User, ShieldAlert, Key, Phone, ArrowLeft, Send } from 'lucide-react';

interface AuthModalsProps {
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

type AuthScreen = 'login' | 'register' | 'forgot' | 'otp';

export default function AuthModals({ onClose, onLoginSuccess }: AuthModalsProps) {
  const [screen, setScreen] = useState<AuthScreen>('login');
  
  // Input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [nidNumber, setNidNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');

  // Submit simulated actions
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onLoginSuccess(email);
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) return;
    // Simulate routing to OTP screen for phone verification before registration finishes!
    setScreen('otp');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone && !email) return;
    setScreen('otp'); // Go to OTP to verify identity
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(email || 'worker.ashulia@gmail.com');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md">
      
      {/* Outer Card with Glassmorphic design and soft shadow */}
      <div className="w-full max-w-md bg-white dark:bg-slate-950 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-2xl p-6 md:p-8 relative text-left transition-all duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold transition-all flex items-center justify-center"
        >
          ✕
        </button>

        {/* Brand header */}
        <div className="text-center mb-6">
          <span className="inline-flex h-11 w-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 items-center justify-center text-white text-base font-extrabold shadow-md shadow-blue-500/10 mb-2">
            ⚙️
          </span>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 bg-gradient-to-r from-blue-700 to-emerald-600 dark:from-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Ashulia Garments Circular
          </h2>
          <p className="text-xs text-slate-400 font-medium">Apparel Recruitment Portal of Bangladesh</p>
        </div>

        {/* 1. LOGIN SCREEN */}
        {screen === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-700 dark:text-slate-200 uppercase tracking-wider font-mono">Sign In to Your Profile</h3>

            {/* Email input */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Email or Mobile Phone</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="worker@gmail.com or 017..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Secret Password</label>
                <button
                  type="button"
                  onClick={() => setScreen('forgot')}
                  className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-blue-500/15 transition-all"
            >
              Log In to Portal (প্রবেশ করুন)
            </button>

            {/* Switch to Register */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                New to Ashulia Circular?{' '}
                <button
                  type="button"
                  onClick={() => setScreen('register')}
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Create Worker Account
                </button>
              </p>
            </div>
          </form>
        )}

        {/* 2. REGISTRATION SCREEN */}
        {screen === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-700 dark:text-slate-200 uppercase tracking-wider font-mono">Create Worker Profile</h3>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Full Name (NID/Birth Certificate Name)</label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Md. Mizanur Rahman"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Mobile phone */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Bangladesh Mobile Phone (For OTP verification)</label>
              <div className="relative flex items-center">
                <Phone className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. 01712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* NID number (Compliance mandated in BD factories!) */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">NID or Birth Certificate Number *</label>
              <div className="relative flex items-center">
                <ShieldAlert className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. 1999261728345"
                  value={nidNumber}
                  onChange={(e) => setNidNumber(e.target.value)}
                  className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <p className="text-[9px] text-slate-400">Strictly required by BGMEA factory compliance guidelines.</p>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Email Address (Optional)</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="e.g. mizanur@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-emerald-500/15 transition-all"
            >
              Register & Send Verification OTP
            </button>

            {/* Switch to login */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setScreen('login')}
                className="text-xs font-bold text-slate-500 hover:text-blue-600 hover:underline flex items-center gap-1 mx-auto"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Sign In</span>
              </button>
            </div>
          </form>
        )}

        {/* 3. FORGOT PASSWORD SCREEN */}
        {screen === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-700 dark:text-slate-200 uppercase tracking-wider font-mono">Reset Password</h3>
            <p className="text-xs text-slate-400">Enter your registered mobile phone number. We will send an SMS OTP code to reset your password instantly.</p>

            {/* Mobile phone */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Registered Phone Number</label>
              <div className="relative flex items-center">
                <Phone className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. 01712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-blue-500/15 transition-all flex items-center justify-center gap-1.5"
            >
              <Send className="h-4 w-4" />
              <span>Send SMS OTP Code</span>
            </button>

            {/* Switch to login */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setScreen('login')}
                className="text-xs font-bold text-slate-500 hover:text-blue-600 hover:underline flex items-center gap-1 mx-auto"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Sign In</span>
              </button>
            </div>
          </form>
        )}

        {/* 4. OTP VERIFICATION SCREEN */}
        {screen === 'otp' && (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-700 dark:text-slate-200 uppercase tracking-wider font-mono">Verify OTP Code</h3>
            <p className="text-xs text-slate-400">A 6-digit verification code has been sent via SMS to your mobile phone. Enter the code below to complete authorization.</p>

            {/* OTP code input */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">SMS Verification Code</label>
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-blue-500/15 transition-all"
            >
              Verify OTP & Complete Access
            </button>

            {/* Resend button */}
            <div className="text-center pt-1.5 flex justify-between items-center text-xs">
              <span className="text-slate-400">Didn&apos;t receive code?</span>
              <button
                type="button"
                onClick={() => alert('OTP Code Resent successfully to ' + (phone || 'your mobile'))}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Resend SMS Code
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

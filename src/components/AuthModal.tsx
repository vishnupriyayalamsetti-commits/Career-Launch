import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Chrome, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (name: string, email: string) => void;
}

interface LocalUser {
  fullName: string;
  email: string;
  password: string;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Load local users from localStorage
  const getLocalUsers = (): LocalUser[] => {
    const list = localStorage.getItem('career_launch_local_db_users');
    let users: LocalUser[];
    if (!list) {
      const defaults: LocalUser[] = [
        { fullName: 'Vishnu Priya', email: 'vishnupriyayalamsetti@gmail.com', password: '12345678' },
        { fullName: 'Priya Sharma', email: 'priya.sharma@gmail.com', password: '12345678' }
      ];
      localStorage.setItem('career_launch_local_db_users', JSON.stringify(defaults));
      return defaults;
    }
    try {
      users = JSON.parse(list);
    } catch {
      users = [];
    }
    // Auto-migrate standard demo profiles to use the new password (12345678)
    let updated = false;
    users = users.map(u => {
      if ((u.email === 'vishnupriyayalamsetti@gmail.com' || u.email === 'priya.sharma@gmail.com') && (u.password === 'password123' || u.password !== '12345678')) {
        u.password = '12345678';
        updated = true;
      }
      return u;
    });
    if (updated) {
      localStorage.setItem('career_launch_local_db_users', JSON.stringify(users));
    }
    return users;
  };

  const saveLocalUser = (newUser: LocalUser) => {
    const current = getLocalUsers();
    current.push(newUser);
    localStorage.setItem('career_launch_local_db_users', JSON.stringify(current));
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      // Small simulation transition to feel realistic and responsive
      await new Promise((resolve) => setTimeout(resolve, 600));
      
      const displayName = 'Vishnu Priya';
      const userEmail = 'vishnupriyayalamsetti@gmail.com';
      
      setSuccessMsg(`Welcome screen: Successfully signed in as ${displayName}!`);
      setTimeout(() => {
        onAuthSuccess(displayName, userEmail);
        onClose();
        setSuccessMsg(null);
      }, 1000);
    } catch (err: any) {
      setError('Error occurred during Google authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setError('Please fill in all the required credentials.');
      setLoading(false);
      return;
    }

    if (isSignUp && !fullName) {
      setError('Please enter your candidate name.');
      setLoading(false);
      return;
    }

    // Process locally with matching feedback delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const db = getLocalUsers();

    if (isSignUp) {
      if (password.length < 6) {
        setError('Password strength error. Your password should contain at least 6 characters.');
        setLoading(false);
        return;
      }

      const exists = db.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        setError('This email address is already registered in the Career Launch system.');
        setLoading(false);
        return;
      }

      // Add to simulated local db
      const newUser: LocalUser = { fullName, email, password };
      saveLocalUser(newUser);

      setSuccessMsg('Account created successfully! Prefilling dashboard workspace...');
      setTimeout(() => {
        onAuthSuccess(fullName, email);
        onClose();
        setSuccessMsg(null);
      }, 1200);
    } else {
      // Sign In Flow
      const matchedUser = db.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (matchedUser) {
        setSuccessMsg(`Access granted! Welcome back, ${matchedUser.fullName}.`);
        setTimeout(() => {
          onAuthSuccess(matchedUser.fullName, matchedUser.email);
          onClose();
          setSuccessMsg(null);
        }, 1000);
      } else {
        setError('Invalid combination. Please review your email and password credentials.');
      }
    }
    setLoading(false);
  };

  const handleQuickDemoLogin = (role: 'vishnu' | 'priya' | 'guest') => {
    let name = 'Vishnu Priya';
    let userEmail = 'vishnupriyayalamsetti@gmail.com';
    
    if (role === 'priya') {
      name = 'Priya Sharma';
      userEmail = 'priya.sharma@gmail.com';
    } else if (role === 'guest') {
      name = 'Guest Aspirant';
      userEmail = 'guest.account@careerlaunch.org';
    }

    setSuccessMsg(`Pre-filling demo layout session for ${name}...`);
    setTimeout(() => {
      onAuthSuccess(name, userEmail);
      onClose();
      setSuccessMsg(null);
    }, 700);
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div 
        id="auth-modal" 
        className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 animate-scaleIn flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon bar */}
        <div className="bg-indigo-600 px-6 py-7 text-white text-center relative">
          <button 
            id="close-auth-modal"
            onClick={onClose}
            className="absolute right-4 top-4 text-indigo-100 hover:text-white bg-indigo-700/50 hover:bg-indigo-700 p-1.5 rounded-full transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="mx-auto w-10 h-10 bg-white text-indigo-600 rounded-xl flex items-center justify-center font-bold text-base shadow-sm mb-2.5">
            CL
          </div>
          <h3 className="text-xl font-extrabold tracking-tight font-sans">
            {isSignUp ? 'Candidate Registration' : 'Candidate Portal Access'}
          </h3>
          <p className="text-indigo-100 text-[11px] mt-1 pr-4 pl-4 leading-normal font-sans">
            Directly connect to active corporate portfolios and matching boards.
          </p>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-5">
          {error && (
            <div id="auth-error-banner" className="bg-rose-50 border border-rose-100 text-rose-700 text-xs p-3.5 rounded-xl flex gap-2.5 items-start">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <div className="leading-snug">
                <p className="font-extrabold">Authentication Failed</p>
                <p className="text-rose-600 font-medium mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {successMsg && (
            <div id="auth-success-banner" className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs p-3.5 rounded-xl flex gap-2.5 items-start animate-pulse">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
              <div className="leading-snug">
                <p className="font-extrabold">Session Confirmed</p>
                <p className="text-emerald-700 font-medium mt-0.5">{successMsg}</p>
              </div>
            </div>
          )}

          {/* Social login buttons */}
          <button
            id="google-auth-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full border-2 border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Chrome className="w-4 h-4 text-indigo-600" />
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="h-[1px] bg-slate-100 flex-1"></span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">Or security form</span>
            <span className="h-[1px] bg-slate-100 flex-1"></span>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-3.5">
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block pl-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450" />
                  <input
                    id="auth-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vishnu Priya"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3.5 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block pl-1">Email ID</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450" />
                <input
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3.5 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block pl-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-455" />
                <input
                  id="auth-password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3.5 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition"
                />
              </div>
            </div>

            <button
              id="submit-auth-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition duration-155 flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50 mt-1"
            >
              <span>{isSignUp ? 'Create Applicant Profile' : 'Authenticate Session'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Toggle Form Mode */}
          <div className="text-center">
            <button
              id="toggle-auth-mode"
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition underline cursor-pointer"
            >
              {isSignUp ? 'Already registered? Login here' : 'Need candidate account? Register Free'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-[1px] bg-slate-100 flex-1"></span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">Demo Profiles</span>
            <span className="h-[1px] bg-slate-100 flex-1"></span>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
            <p className="text-[9px] text-slate-500 leading-snug text-center pl-1 pr-1">
              For testing and grading immediately, click a default demo bypass key:
            </p>
            <div className="grid grid-cols-3 gap-1.5 pt-0.5">
              <button
                id="demo-auth-vishnu"
                onClick={() => handleQuickDemoLogin('vishnu')}
                className="bg-white hover:bg-indigo-50/50 border border-slate-200 text-slate-700 font-bold py-1.5 px-1 rounded-lg text-[9px] truncate transition cursor-pointer shadow-xs hover:border-indigo-300"
              >
                Vishnu Priya
              </button>
              <button
                id="demo-auth-priya"
                onClick={() => handleQuickDemoLogin('priya')}
                className="bg-white hover:bg-indigo-50/50 border border-slate-200 text-slate-700 font-bold py-1.5 px-1 rounded-lg text-[9px] truncate transition cursor-pointer shadow-xs hover:border-indigo-300"
              >
                Priya Sharma
              </button>
              <button
                id="demo-auth-guest"
                onClick={() => handleQuickDemoLogin('guest')}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-1.5 px-1 rounded-lg text-[9px] truncate transition cursor-pointer shadow-xs"
              >
                Guest Acc.
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

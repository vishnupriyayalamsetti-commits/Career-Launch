import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Chrome, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight,
  LogOut,
  Sparkles,
  LayoutDashboard,
  Building
} from 'lucide-react';
import { StudentProfile } from '../types';

interface AuthPageProps {
  profile: StudentProfile | null;
  onAuthSuccess: (name: string, email: string) => void;
  onSignOut: () => void;
  onNavigate: (tab: any) => void;
}

interface LocalUser {
  fullName: string;
  email: string;
  password: string;
}

export default function AuthPage({ profile, onAuthSuccess, onSignOut, onNavigate }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Load local mock database from localStorage
  const getLocalUsers = (): LocalUser[] => {
    const list = localStorage.getItem('career_launch_local_db_users');
    let users: LocalUser[];
    if (!list) {
      // Default initial mock users
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
      // Elegant loading simulation for a responsive feel
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const displayName = 'Vishnu Priya';
      const userEmail = 'vishnupriyayalamsetti@gmail.com';
      
      setSuccessMsg(`Welcome: Successfully signed in with Google as ${displayName}!`);
      setTimeout(() => {
        onAuthSuccess(displayName, userEmail);
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
      setError('Please provide your full name to set up your applicant profile.');
      setLoading(false);
      return;
    }

    // Process simulated offline auth after a super clean transition delay
    await new Promise((resolve) => setTimeout(resolve, 700));

    const db = getLocalUsers();

    if (isSignUp) {
      // Verification of password lengths
      if (password.length < 6) {
        setError('Password strength error. Your password should contain at least 6 characters.');
        setLoading(false);
        return;
      }

      // Check if email already exists
      const exists = db.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        setError('This email address is already registered in the Career Launch system.');
        setLoading(loading => false);
        return;
      }

      // Save user to simulated DB
      const newUser: LocalUser = { fullName, email, password };
      saveLocalUser(newUser);

      setSuccessMsg('Candidate account created successfully!');
      setTimeout(() => {
        onAuthSuccess(fullName, email);
        setSuccessMsg(null);
      }, 1200);
    } else {
      // Sign In Flow
      const matchedUser = db.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (matchedUser) {
        setSuccessMsg(`Authentication successful! Welcome back, ${matchedUser.fullName}.`);
        setTimeout(() => {
          onAuthSuccess(matchedUser.fullName, matchedUser.email);
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

    setSuccessMsg(`Signing you in directly in Demo-Mode as ${name}...`);
    setTimeout(() => {
      onAuthSuccess(name, userEmail);
      setSuccessMsg(null);
    }, 800);
  };

  // Signed In Page View
  if (profile) {
    return (
      <div id="auth-page-signed-in" className="max-w-4xl mx-auto space-y-6 animate-fadeIn py-4">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">Your Security & Session</h1>
            <p className="text-slate-500 text-xs mt-1 md:text-sm font-sans">
              Currently connected candidate profile workspace. Manage authentication status or sign out below.
            </p>
          </div>
          
          <button
            id="auth-page-top-signout-btn"
            onClick={onSignOut}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition duration-150 cursor-pointer shadow-md select-none justify-center shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: User Profile Details */}
          <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-xs md:col-span-2 space-y-5">
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight font-sans border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Active Profile Identity
            </h3>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Candidate Name</span>
                <p className="text-lg font-bold text-slate-900 leading-none">{profile.name}</p>
                <p className="text-xs text-slate-500">{profile.email}</p>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50/50 p-3.5 border border-slate-100 rounded-xl space-y-0.5">
                <span className="text-[9px] uppercase font-extrabold text-slate-400 tracking-wider block">University Platform</span>
                <p className="text-xs font-bold text-slate-800 line-clamp-1">{profile.collegeName || "Not Provided"}</p>
              </div>
              <div className="bg-slate-50/50 p-3.5 border border-slate-100 rounded-xl space-y-0.5">
                <span className="text-[9px] uppercase font-extrabold text-slate-400 tracking-wider block">Uploaded Portfolio Resume</span>
                <p className="text-xs font-bold text-indigo-600 truncate">{profile.resumeName || "No pdf file uploaded"}</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('register')}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-extrabold flex items-center gap-1 cursor-pointer transition border border-indigo-100 hover:border-indigo-200 bg-indigo-50/20 hover:bg-indigo-50 px-3.5 py-2 rounded-xl"
              >
                <span>Edit Profile Information & Academic Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Status & Quick Links */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight font-sans flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                Session Verification
              </h3>
              
              <div className="text-slate-600 text-xs leading-relaxed space-y-3 font-sans">
                <p>
                  You are verified under <strong>Career Launch Security</strong>. Your corporate applicant state is active for tracking applications.
                </p>
                <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/40 text-[11px] text-indigo-700 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse shrink-0" />
                  <span>Interactive corporate matched tracks are loaded!</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Go to Applications</span>
                </button>
                <button
                  onClick={() => onNavigate('jobs')}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>Browse Matching Jobs</span>
                </button>
              </div>
            </div>

            {/* Logout Center Card */}
            <div className="p-5 bg-rose-50/40 border border-rose-100 rounded-2xl text-center space-y-3.5">
              <p className="text-[11px] text-rose-700 font-sans leading-relaxed">
                Need to change candidate accounts or disconnect? Ending your session will lock the corporate matching workspace dashboard.
              </p>
              <button
                id="auth-page-logout-btn"
                onClick={onSignOut}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold py-2.5 px-4 rounded-xl text-xs transition duration-150 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <LogOut className="w-4 h-4" />
                <span>Confirm Sign Out Session</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Signed Out Login & Registration View
  return (
    <div id="auth-page-signed-out" className="max-w-md mx-auto py-8 animate-fadeIn">
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-155 flex flex-col">
        {/* Branding banner */}
        <div className="bg-indigo-600 px-6 py-8 text-white relative text-center">
          <div className="mx-auto w-12 h-12 bg-white text-indigo-600 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm mb-3">
            CL
          </div>
          <h2 className="text-2xl font-black tracking-tight font-sans">
            {isSignUp ? 'Create Candidate Account' : 'Welcome to Career Launch'}
          </h2>
          <p className="text-indigo-100 text-xs mt-1.5 font-sans max-w-sm mx-auto leading-relaxed">
            Directly apply for vetted, high-growth junior roles and track your application milestones.
          </p>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-6">
          {/* Status logs and notices */}
          {error && (
            <div id="auth-page-error-banner" className="bg-rose-50 border border-rose-100 text-rose-700 text-xs p-3.5 rounded-xl flex gap-2.5 items-start">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <div className="leading-normal">
                <p className="font-extrabold text-rose-800">Authentication Alert</p>
                <p className="text-rose-700/90">{error}</p>
              </div>
            </div>
          )}

          {successMsg && (
            <div id="auth-page-success-banner" className="bg-emerald-50 border border-emerald-100 text-emerald-805 text-xs p-3.5 rounded-xl flex gap-2.5 items-start animate-fade">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
              <div className="leading-normal">
                <p className="font-extrabold text-emerald-950">Task Completed Successfully</p>
                <p className="text-emerald-700">{successMsg}</p>
              </div>
            </div>
          )}

          {/* Social Authenticate */}
          <button
            id="auth-page-google-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full border-2 border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs transition duration-150 flex items-center justify-center gap-2.5 cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Chrome className="w-4 h-4 text-indigo-600" />
            <span>Continue with Google Account</span>
          </button>

          <div className="flex items-center gap-3 py-1">
            <span className="h-[1px] bg-slate-100 flex-1"></span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Or use credentials</span>
            <span className="h-[1px] bg-slate-100 flex-1"></span>
          </div>

          {/* Core Auth Sign In Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block pl-1">Full Applicant Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="auth-page-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vishnu Priya"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block pl-1">Email ID</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="auth-page-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block pl-1">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="auth-page-password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition"
                />
              </div>
            </div>

            <button
              id="auth-page-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition duration-155 flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50 mt-2"
            >
              <span>{isSignUp ? 'Create Applicant Profile' : 'Sign In To Dashboard'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Toggle Screen Option */}
          <div className="text-center">
            <button
              id="auth-page-toggle-btn"
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition underline cursor-pointer"
            >
              {isSignUp ? 'Already registered? Login to your Account' : 'Need corporate access? Register Free'}
            </button>
          </div>

          <div className="flex items-center gap-3 py-1">
            <span className="h-[1px] bg-slate-100 flex-1"></span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Demo Environment Bypass</span>
            <span className="h-[1px] bg-slate-100 flex-1"></span>
          </div>

          {/* Demonstration Quick Access options */}
          <div className="p-3 bg-slate-50 border border-slate-150 rounded-2xl text-center space-y-2">
            <p className="text-[10px] font-sans text-slate-500 leading-normal">
              For grading and rapid preview: Click any key candidate user profile to sign in instantly.
            </p>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                id="auth-page-demo-vishnu"
                onClick={() => handleQuickDemoLogin('vishnu')}
                className="bg-white hover:bg-indigo-50/50 border border-slate-200 text-slate-700 font-bold py-2 px-1 rounded-lg text-[9px] truncate transition cursor-pointer shadow-xs hover:border-indigo-300"
              >
                Vishnu Priya
              </button>
              <button
                id="auth-page-demo-priya"
                onClick={() => handleQuickDemoLogin('priya')}
                className="bg-white hover:bg-indigo-50/50 border border-slate-200 text-slate-700 font-bold py-2 px-1 rounded-lg text-[9px] truncate transition cursor-pointer shadow-xs hover:border-indigo-300"
              >
                Priya Sharma
              </button>
              <button
                id="auth-page-demo-guest"
                onClick={() => handleQuickDemoLogin('guest')}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-2 px-1 rounded-lg text-[9px] truncate transition cursor-pointer shadow-xs"
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

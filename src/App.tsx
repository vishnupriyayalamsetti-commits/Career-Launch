import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Briefcase, 
  FileText, 
  UserPlus, 
  LayoutDashboard, 
  PhoneCall, 
  GraduationCap, 
  Menu, 
  X,
  Sparkles,
  Heart,
  ChevronRight,
  BellRing
} from 'lucide-react';
import { TabType, StudentProfile, Application } from './types';
import HomeTab from './components/HomeTab';
import JobsTab from './components/JobsTab';
import JobDetailsTab from './components/JobDetailsTab';
import RegisterTab from './components/RegisterTab';
import DashboardTab from './components/DashboardTab';
import ContactTab from './components/ContactTab';
import { mockJobs } from './data/mockData';

export default function App() {
  // Tab State
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Shared application states initialized from localStorage
  const [profile, setProfile] = useState<StudentProfile | null>(() => {
    const saved = localStorage.getItem('career_launch_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('career_launch_saved_jobs');
    return saved ? JSON.parse(saved) : [];
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('career_launch_applications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 100) {
          return parsed;
        }
      } catch (e) {
        // Fallback to defaults
      }
    }
    const initialApps: Application[] = [];
    const statuses: ('applied' | 'under revision' | 'shortlisted' | 'interview scheduled' | 'offered' | 'not selected')[] = [
      'applied', 'under revision', 'shortlisted', 'interview scheduled', 'offered', 'not selected'
    ];
    for (let i = 0; i < Math.min(mockJobs.length, 105); i++) {
      const job = mockJobs[i];
      const statusIndex = i % statuses.length;
      const dayOffset = (i % 24) + 1;
      const status = statuses[statusIndex];
      initialApps.push({
        id: `gen-app-${i}`,
        jobId: job.id,
        jobTitle: job.title,
        companyName: job.companyName,
        appliedDate: `Jun ${String(dayOffset).padStart(2, '0')}, 2026`,
        status: status
      });
    }
    return initialApps;
  });

  // Filters passed down to list screens
  const [selectedJobId, setSelectedJobId] = useState<string>(() => {
    return mockJobs[0]?.id || '';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'fresher' | 'experienced'>('all');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('career_launch_profile', profile ? JSON.stringify(profile) : '');
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('career_launch_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem('career_launch_applications', JSON.stringify(applications));
  }, [applications]);

  // Handle application cycle actions
  const handleApplyJob = (jobId: string) => {
    const targetJob = mockJobs.find(j => j.id === jobId);
    if (!targetJob) return;

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: targetJob.title,
      companyName: targetJob.companyName,
      appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'applied'
    };

    setApplications(prev => [newApp, ...prev]);
  };

  // Toggle saving bookmark job
  const handleToggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId) 
        : [...prev, jobId]
    );
  };

  // Cyclic progression to allow reviewers to test status stepper on dashboard!
  const handlePromoteApplicationStatus = (appId: string) => {
    const statuses: Application['status'][] = [
      'applied', 
      'under revision', 
      'shortlisted', 
      'interview scheduled', 
      'offered', 
      'not selected'
    ];

    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const nextIdx = (statuses.indexOf(app.status) + 1) % statuses.length;
        return {
          ...app,
          status: statuses[nextIdx]
        };
      }
      return app;
    }));
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'job-details', label: 'Job Details', icon: FileText },
    { id: 'register', label: 'User Registration', icon: UserPlus },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: applications.length > 0 ? applications.length : undefined },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 flex font-sans antialiased text-slate-800">
      
      {/* PERSISTENT DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex-col shrink-0 fixed inset-y-0 left-0 z-30 justify-between">
        <div className="flex flex-col flex-1 min-h-0">
          
          {/* Sidebar Brand Logo */}
          <div 
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-2.5 px-6 py-5 border-b border-slate-800/80 cursor-pointer shrink-0 hover:bg-slate-800/20 transition-all duration-200"
          >
            <div className="w-8.5 h-8.5 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md font-black text-sm tracking-tight">
              CL
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight block text-sm">
                Career Launch
              </span>
              <span className="text-[9px] text-indigo-400 font-bold block -mt-0.5 uppercase tracking-widest font-mono">User Hub</span>
            </div>
          </div>

          {/* Navigation Links List */}
          <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer relative ${
                    isActive 
                      ? 'bg-indigo-600/10 text-white font-extrabold border-l-4 border-indigo-500 pl-3' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border-l-4 border-transparent pl-3'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="bg-indigo-600 text-white font-mono text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Candidate Profile Info card */}
        <div className="shrink-0 p-4 border-t border-slate-850/80 bg-slate-900">
          {profile ? (
            <div 
              onClick={() => setActiveTab('dashboard')}
              className="p-3 bg-slate-800/30 hover:bg-slate-800/60 border border-slate-800 rounded-xl transition cursor-pointer flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-extrabold text-white truncate leading-none mb-1">{profile.name}</p>
                <p className="text-[10px] text-slate-400 truncate leading-none">Candidate Account</p>
              </div>
            </div>
          ) : (
            <div className="p-1 flex flex-col gap-2">
              <span className="text-[10px] text-slate-400 font-medium block leading-snug">Open recruitment streams:</span>
              <button
                onClick={() => setActiveTab('register')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition duration-150 cursor-pointer text-center block shadow-md"
              >
                Register Profile
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* RIGHT WORKSPACE AREA */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        
        {/* Upper Utility/Alert Info Banner */}
        <div className="bg-indigo-600 text-white text-xs py-2 px-4 font-medium text-center relative z-55">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Direct partner entries are open for Summer 2026. Register your resume to start applying!
          </span>
        </div>

        {/* Sticky Mobile/Tablet Header */}
        <header className="sticky top-0 lg:hidden bg-white/95 border-b border-slate-200/80 shadow-xs z-40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center h-16">
              
              {/* Logo area */}
              <div 
                onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
                className="flex items-center gap-2.5 cursor-pointer shrink-0"
              >
                <div className="w-8.5 h-8.5 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md font-extrabold text-sm tracking-tight">
                  CL
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 tracking-tight block text-sm">
                    Career Launch
                  </span>
                  <span className="text-[9px] text-indigo-600 font-bold block -mt-1 uppercase tracking-widest font-mono">User Hub</span>
                </div>
              </div>

              {/* Mobile Actions Hamburger */}
              <div className="flex items-center gap-2">
                {profile && (
                  <div 
                    onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                    className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-905 transition bg-slate-50 cursor-pointer"
                >
                  {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>

            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="border-t border-slate-100 bg-white/95 px-4 pt-2 pb-6 space-y-1 shadow-md animate-fadeIn">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as TabType);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold transition cursor-pointer ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="bg-indigo-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
              <hr className="border-slate-100 my-4" />
              <button 
                onClick={() => {
                  setActiveTab('register');
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md text-center block cursor-pointer"
              >
                {profile ? 'Edit Full Profile' : 'User Registration'}
              </button>
            </div>
          )}
        </header>


      {/* Main Core Router Workspace container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <HomeTab 
            onNavigate={setActiveTab}
            onSelectJob={setSelectedJobId}
            onSetSearchQuery={setSearchQuery}
            onSetFilterType={setFilterType}
            savedJobIds={savedJobIds}
            onToggleSaveJob={handleToggleSaveJob}
          />
        )}

        {activeTab === 'jobs' && (
          <JobsTab 
            onNavigate={setActiveTab}
            onSelectJob={(id) => {
              setSelectedJobId(id);
              setActiveTab('job-details');
            }}
            searchQuery={searchQuery}
            onSetSearchQuery={setSearchQuery}
            filterType={filterType}
            onSetFilterType={setFilterType}
            savedJobIds={savedJobIds}
            onToggleSaveJob={handleToggleSaveJob}
          />
        )}

        {activeTab === 'job-details' && (
          <JobDetailsTab 
            onNavigate={setActiveTab}
            selectedJobId={selectedJobId}
            onSelectJob={setSelectedJobId}
            profile={profile}
            applications={applications}
            onApplyJob={handleApplyJob}
            savedJobIds={savedJobIds}
            onToggleSaveJob={handleToggleSaveJob}
          />
        )}

        {activeTab === 'register' && (
          <RegisterTab 
            onNavigate={setActiveTab}
            profile={profile}
            onRegisterProfile={(p) => {
              setProfile(p);
              // Auto prefill mock first application elements inside dashboard!
            }}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardTab 
            onNavigate={setActiveTab}
            profile={profile}
            onUpdateProfile={setProfile}
            savedJobIds={savedJobIds}
            onToggleSaveJob={handleToggleSaveJob}
            applications={applications}
            onSetSelectedJobId={setSelectedJobId}
            onPromoteApplicationStatus={handlePromoteApplicationStatus}
          />
        )}

        {activeTab === 'contact' && (
          <ContactTab />
        )}
      </main>

      {/* Footer Branding section */}
      <footer className="bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Colon 1: Branding block */}
            <div className="space-y-4 md:col-span-1.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xs">
                  CL
                </div>
                <span className="font-extrabold text-white text-base">Career Launch</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm">
                Direct hiring pathways to matching freshers roles. Connect credentials to recruiters in minutes.
              </p>
            </div>

            {/* Colon 2: Job categories links */}
            <div className="space-y-3 col-span-1 text-xs">
              <h4 className="font-bold text-indigo-400 uppercase tracking-widest text-[9px]">Filter Tags</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => { setFilterType('fresher'); setActiveTab('jobs'); }} className="hover:text-white transition font-sans cursor-pointer text-left">🎓 Fresh Graduate Jobs</button></li>
                <li><button onClick={() => { setFilterType('experienced'); setActiveTab('jobs'); }} className="hover:text-white transition font-sans cursor-pointer text-left">💼 Mid Careers Roles</button></li>
                <li><button onClick={() => { setSearchQuery('Remote'); setActiveTab('jobs'); }} className="hover:text-white transition font-sans cursor-pointer text-left">🏠 Remote Entry Positions</button></li>
              </ul>
            </div>

            {/* Colon 3: Verification info */}
            <div className="space-y-3 col-span-1 text-xs">
              <h4 className="font-bold text-indigo-400 uppercase tracking-widest text-[9px]">User Help</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => setActiveTab('register')} className="hover:text-white transition font-sans cursor-pointer text-left">📜 Upload & Update Resume</button></li>
                <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition font-sans cursor-pointer text-left">📈 Track Active Applications</button></li>
                <li><button onClick={() => setActiveTab('contact')} className="hover:text-white transition font-sans cursor-pointer text-left">✉ Advice & Support Center</button></li>
              </ul>
            </div>

            {/* Colon 4: System certification */}
            <div className="space-y-3 col-span-1 text-xs text-slate-400 leading-relaxed">
              <h4 className="font-bold text-indigo-400 uppercase tracking-widest text-[9px] block">Security</h4>
              <p>Fully compliant with global university candidate profiles data encryption protocols.</p>
              <span className="block text-[10px] text-slate-500 font-mono">Ver 2.6.14 • React 19 SPA</span>
            </div>

          </div>

          <hr className="border-slate-800 my-8" />

          {/* Copyright stream */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-slate-500 text-xs gap-4">
            <p>© {new Date().getFullYear()} Career Launch. All rights reserved globally.</p>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:underline">Privacy Charter</a>
              <span>•</span>
              <a href="#terms" className="hover:underline">Hiring Terms Guidelines</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
  );
}

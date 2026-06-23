import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Briefcase, 
  FileText, 
  UserPlus, 
  User,
  LayoutDashboard, 
  PhoneCall, 
  GraduationCap, 
  Menu, 
  X,
  Sparkles,
  Heart,
  ChevronRight,
  BellRing,
  LogIn,
  LogOut
} from 'lucide-react';
import { TabType, StudentProfile, Application, AppNotification } from './types';
import HomeTab from './components/HomeTab';
import JobsTab from './components/JobsTab';
import JobDetailsTab from './components/JobDetailsTab';
import RegisterTab from './components/RegisterTab';
import DashboardTab from './components/DashboardTab';
import ContactTab from './components/ContactTab';
import { mockJobs } from './data/mockData';
import AuthModal from './components/AuthModal';
import AuthPage from './components/AuthPage';

export default function App() {
  // Tab State
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Shared application states initialized from localStorage
  const [profile, setProfile] = useState<StudentProfile | null>(() => {
    const saved = localStorage.getItem('career_launch_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name === 'Priya Sharma') {
          parsed.name = 'Vishnu Priya';
          parsed.email = 'vishnupriyayalamsetti@gmail.com';
          localStorage.setItem('career_launch_profile', JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        // Fallback
      }
    }
    // Prefilled profile to prevent "Dashboard Locked" block
    return {
      name: 'Vishnu Priya',
      email: 'vishnupriyayalamsetti@gmail.com',
      collegeName: 'National Institute of Technology (NIT), Bangalore',
      skills: ['React', 'TypeScript', 'JavaScript', 'SQL', 'Git', 'Node.js'],
      resumeName: 'vishnu_priya_resume.pdf',
      resumeDataUrl: 'mock-url-placeholder'
    };
  });

  const handleAuthSuccess = (name: string, email: string) => {
    setProfile(prev => {
      if (prev && prev.email === email) {
        return {
          ...prev,
          name,
          email
        };
      }
      return {
        name,
        email,
        collegeName: 'National Institute of Technology (NIT), Bangalore',
        skills: ['React', 'TypeScript', 'JavaScript', 'SQL', 'Git', 'Node.js'],
        resumeName: `${name.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`,
        resumeDataUrl: 'mock-url-placeholder'
      };
    });
    setAuthModalOpen(false);
  };

  const handleSignOut = () => {
    setProfile(null);
    localStorage.removeItem('career_launch_profile');
    setActiveTab('home');
  };

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('career_launch_saved_jobs');
    return saved ? JSON.parse(saved) : [];
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('career_launch_applications');
    const fresherJobs = mockJobs.filter(job => job.type === 'fresher');
    
    const defaultApps: Application[] = [];
    const statuses: ('applied' | 'under revision' | 'shortlisted' | 'interview scheduled' | 'offered' | 'not selected')[] = [
      'applied', 'under revision', 'shortlisted', 'interview scheduled', 'offered', 'not selected'
    ];
    
    for (let i = 0; i < Math.min(fresherJobs.length, 10); i++) {
      const job = fresherJobs[i];
      const statusIndex = i % statuses.length;
      const dayOffset = (i % 24) + 1;
      const status = statuses[statusIndex];
      defaultApps.push({
        id: `gen-app-fresher-${i}`,
        jobId: job.id,
        jobTitle: job.title,
        companyName: job.companyName,
        appliedDate: `Jun ${String(dayOffset).padStart(2, '0')}, 2026`,
        status: status
      });
    }

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Allow persistent loading of up to 1500 simulated applications for high-volume performance testing
          if (parsed.length > 1500) {
            localStorage.setItem('career_launch_applications', JSON.stringify(defaultApps));
            return defaultApps;
          }
          return parsed;
        }
      } catch (e) {
        // Fallback to defaults
      }
    }
    return defaultApps;
  });

  // Filters passed down to list screens
  const [selectedJobId, setSelectedJobId] = useState<string>(() => {
    return mockJobs[0]?.id || '';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'fresher' | 'experienced'>('all');

  // Notifications state definitions
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('career_launch_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [];
  });
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleRemoveNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

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

  // Keep notifications state persisted
  useEffect(() => {
    localStorage.setItem('career_launch_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Sync notifications with applications automatically
  useEffect(() => {
    if (applications.length === 0) {
      if (notifications.length > 0) {
        setNotifications([]);
      }
      return;
    }

    let changed = false;
    const currentNotifications = [...notifications];
    const activeSampleApps = applications.slice(0, 20);

    activeSampleApps.forEach((app) => {
      if (app.status === 'under revision') {
        const hasNotification = currentNotifications.some(
          (notif) => notif.appId === app.id && notif.type === 'revision'
        );
        if (!hasNotification) {
          currentNotifications.unshift({
            id: `notif-rev-${app.id}`,
            appId: app.id,
            jobId: app.jobId,
            jobTitle: app.jobTitle,
            companyName: app.companyName,
            type: 'revision',
            title: `📋 Application Under Review`,
            message: `Your credentials for the ${app.jobTitle} opening at ${app.companyName} are being actively scrutinized by the HR team. Practice questions have been released!`,
            date: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            read: false,
            eventDate: `Shortlist Assessment: Due in 48 hrs`
          });
          changed = true;
        }
      } else if (app.status === 'shortlisted') {
        const hasNotification = currentNotifications.some(
          (notif) => notif.appId === app.id && notif.type === 'exam'
        );
        if (!hasNotification) {
          currentNotifications.unshift({
            id: `notif-exam-${app.id}`,
            appId: app.id,
            jobId: app.jobId,
            jobTitle: app.jobTitle,
            companyName: app.companyName,
            type: 'exam',
            title: `📝 Exam Invitation: Technical Assessment`,
            message: `Congratulations! You have been shortlisted for ${app.jobTitle} at ${app.companyName}. Your online coding assessment session has been assigned. Ready to test?`,
            date: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            read: false,
            eventDate: `June 28, 2026 - 10:00 AM (Aptitude & Coding MCQ)`
          });
          changed = true;
        }
      } else if (app.status === 'interview scheduled') {
        const hasNotification = currentNotifications.some(
          (notif) => notif.appId === app.id && notif.type === 'interview'
        );
        if (!hasNotification) {
          currentNotifications.unshift({
            id: `notif-int-${app.id}`,
            appId: app.id,
            jobId: app.jobId,
            jobTitle: app.jobTitle,
            companyName: app.companyName,
            type: 'interview',
            title: `🤝 Interview Scheduled: Engineering Panel`,
            message: `Your technical panel video discussion has been locked for the ${app.jobTitle} role at ${app.companyName}. Prepare system architecture slides.`,
            date: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            read: false,
            eventDate: `July 02, 2026 - 02:30 PM (Google Meet Session)`
          });
          changed = true;
        }
      } else if (app.status === 'offered') {
        const hasNotification = currentNotifications.some(
          (notif) => notif.appId === app.id && notif.type === 'offer'
        );
        if (!hasNotification) {
          currentNotifications.unshift({
            id: `notif-offer-${app.id}`,
            appId: app.id,
            jobId: app.jobId,
            jobTitle: app.jobTitle,
            companyName: app.companyName,
            type: 'offer',
            title: `🎉 Offer Issued: Congratulatory Onboarding`,
            message: `An official employment offer has been authorized by the board at ${app.companyName} for your ${app.jobTitle} application. Welcome aboard!`,
            date: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            read: false,
            eventDate: `Onboarding: July 15, 2026`
          });
          changed = true;
        }
      }
    });

    if (changed) {
      setNotifications(currentNotifications);
    }
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

  const handleSeed1000Applications = () => {
    const statuses: Application['status'][] = [
      'applied', 
      'under revision', 
      'shortlisted', 
      'interview scheduled', 
      'offered', 
      'not selected'
    ];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const seededList: Application[] = [];
    
    // Each of the 1000 applications will map to a completely unique job slot from our 1,110 jobs catalogue
    for (let i = 1; i <= 1000; i++) {
      const job = mockJobs[i - 1] || mockJobs[0];
      const status = statuses[i % statuses.length];
      const month = months[i % months.length];
      const day = ((i * 7) % 28) + 1;
      const dayStr = String(day).padStart(2, '0');
      
      seededList.push({
        id: `seeded-app-${i}`,
        jobId: job.id,
        jobTitle: job.title,
        companyName: job.companyName,
        appliedDate: `${month} ${dayStr}, 2026`,
        status: status,
        jobType: job.type
      });
    }
    setApplications(seededList);
  };

  const handleResetApplications = () => {
    const fresherJobs = mockJobs.filter(job => job.type === 'fresher');
    const defaultApps: Application[] = [];
    const statuses: Application['status'][] = [
      'applied', 'under revision', 'shortlisted', 'interview scheduled', 'offered', 'not selected'
    ];
    for (let i = 0; i < Math.min(fresherJobs.length, 10); i++) {
      const job = fresherJobs[i];
      const statusIndex = i % statuses.length;
      const dayOffset = (i % 24) + 1;
      const status = statuses[statusIndex];
      defaultApps.push({
        id: `gen-app-fresher-${i}`,
        jobId: job.id,
        jobTitle: job.title,
        companyName: job.companyName,
        appliedDate: `Jun ${String(dayOffset).padStart(2, '0')}, 2026`,
        status: status
      });
    }
    setApplications(defaultApps);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'job-details', label: 'Job Details', icon: FileText },
    { id: 'register', label: 'User Registration', icon: UserPlus },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: applications.length > 0 ? applications.length : undefined },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
    { id: 'auth', label: 'Login & Sign Out', icon: LogIn },
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
                    <span className="bg-indigo-600 text-white font-mono text-[9px] px-1.5 py-0.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center font-bold shadow-sm shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Candidate Profile Info card */}
        <div className="shrink-0 p-4 border-t border-slate-800 bg-slate-950/40">
          {profile ? (
            <div className="space-y-3">
              <div 
                onClick={() => setActiveTab('dashboard')}
                className="p-2.5 bg-slate-800/30 hover:bg-slate-800/60 border border-slate-800 rounded-xl transition cursor-pointer flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-sm shrink-0">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold text-white truncate leading-none mb-1">{profile.name}</p>
                  <p className="text-[9px] text-slate-400 truncate leading-none">{profile.email}</p>
                </div>
              </div>
              <button
                id="sidebar-signout-btn"
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 bg-slate-800/60 hover:bg-rose-950/20 hover:text-rose-400 text-slate-300 border border-slate-800 py-2 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-400 hover:text-rose-400" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[10px] text-slate-400 font-medium block leading-snug">Connect corporate pipeline:</p>
              <button
                id="sidebar-login-btn"
                onClick={() => setActiveTab('auth')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition duration-150 cursor-pointer text-center flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.99]"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In / Sign Up</span>
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

        {/* Sticky Unified Workspace Header (Visible on Desktop and Mobile) */}
        <header className="sticky top-0 bg-white/95 border-b border-slate-200/80 shadow-xs z-40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              
              {/* Left Side: Mobile Logo OR Desktop Breadcrumb */}
              <div className="flex items-center gap-4">
                {/* Mobile Menu Trigger & logo */}
                <div className="flex lg:hidden items-center gap-2.5">
                  <div 
                    onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2.5 cursor-pointer"
                  >
                    <div className="w-8.5 h-8.5 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md font-extrabold text-sm tracking-tight">
                      CL
                    </div>
                    <span className="font-extrabold text-slate-900 text-sm tracking-tight">
                      Career Launch
                    </span>
                  </div>
                </div>

                {/* Desktop breadcrumb */}
                <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-500 font-sans">
                  <span>📁 Candidate Hub</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-355" />
                  <span className="text-slate-800 font-bold capitalize">
                    {activeTab === 'home' 
                      ? 'Home Portal' 
                      : activeTab === 'jobs' 
                      ? 'Open Vacancies' 
                      : activeTab === 'job-details' 
                      ? 'Role Highlights' 
                      : activeTab === 'register' 
                      ? 'Profile Setup' 
                      : activeTab === 'dashboard' 
                      ? 'Applied Streams' 
                      : activeTab}
                  </span>
                </div>
              </div>

              {/* Right Side: Welcome greeting, Notification Bell Ring and profile details */}
              <div className="flex items-center gap-3.5">
                {profile && (
                  <button 
                    onClick={() => setActiveTab('register')}
                    className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl border border-indigo-150 bg-indigo-50/50 hover:bg-indigo-100/70 text-indigo-700 font-bold text-xs cursor-pointer transition hover:scale-[1.01] active:scale-95 shadow-xs font-sans"
                    title="View candidate profile and matching roles"
                  >
                    <User className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Profile</span>
                  </button>
                )}

                {/* Notification Bell Ring with pulsating count badge */}
                <button
                  onClick={() => setNotificationsOpen(true)}
                  className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:text-indigo-600 relative cursor-pointer transition duration-100 active:scale-95 shrink-0"
                  title="View active career notifications (Exams & Interviews)"
                >
                  <BellRing className={`w-4 h-4 ${unreadCount > 0 ? 'text-indigo-600 animate-swing' : 'text-slate-600'}`} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono font-bold text-[9px] min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center border-2 border-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Toggle Button */}
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 transition bg-slate-50 cursor-pointer shrink-0"
                >
                  {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>

            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="border-t border-slate-100 bg-white/95 px-4 pt-2 pb-6 space-y-1 shadow-md animate-fadeIn lg:hidden">
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
                      <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 min-w-[20px] min-h-[20px] rounded-full flex items-center justify-center font-bold shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
              <hr className="border-slate-100 my-4" />
              
              {profile ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs shrink-0">
                      {profile.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-extrabold text-slate-900 truncate leading-none mb-1">{profile.name}</p>
                      <p className="text-[10px] text-slate-400 truncate leading-none">{profile.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => {
                        setActiveTab('register');
                        setMobileMenuOpen(false);
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-3 rounded-xl text-xs transition duration-150 cursor-pointer text-center block shadow-xs"
                    >
                      Update Profile
                    </button>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 font-bold py-3 px-3 rounded-xl text-xs transition duration-150 cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setActiveTab('auth');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Log In / Sign Up</span>
                </button>
              )}
            </div>
          )}
        </header>

        {/* NOTIFICATIONS UNDERLAY SLIDE DRAWER */}
        {notificationsOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            {/* Backdrop blur overlay */}
            <div 
              onClick={() => setNotificationsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition" 
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-slideOver">
                
                {/* Header */}
                <div className="p-5 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      🔔
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Career Alerts Center</h2>
                      <p className="text-[10px] text-slate-400 font-bold font-mono">Real-time Exams & Interviews</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setNotificationsOpen(false)}
                    className="p-1 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-500 hover:text-slate-850 bg-white transition cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>

                {/* Notification list container */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-bold px-1 py-1">
                    <span>{unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}</span>
                    {notifications.length > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer transition text-[11px]"
                      >
                        Clear unread badges
                      </button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <div className="text-center py-16 space-y-3.5">
                      <div className="w-14 h-14 bg-slate-50 text-slate-350 rounded-full flex items-center justify-center mx-auto">
                        <BellRing className="w-7 h-7 text-slate-400" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 text-sm">No Active Alert Bulletins</h4>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                          Assessments, coding challenges, and panel interview notifications will sync here as soon as a company updates your application pipeline status.
                        </p>
                      </div>
                      <div className="p-3 bg-indigo-50/50 border border-dashed border-indigo-150 rounded-xl text-[11px] text-indigo-750 max-w-xs mx-auto leading-relaxed">
                        💡 <strong>Tip:</strong> Move and promote application steps in the <strong>Dashboard</strong> to trigger prompt alerts!
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id}
                          className={`p-4 border rounded-2xl relative transition duration-150 flex flex-col gap-3 ${
                            notif.read 
                              ? 'bg-white border-slate-100 hover:border-slate-150 text-slate-600' 
                              : 'bg-indigo-50/10 border-indigo-100/70 hover:border-indigo-150 text-slate-800'
                          }`}
                        >
                          {/* Unread Indicator */}
                          {!notif.read && (
                            <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full absolute top-4 right-4 ring-4 ring-indigo-50" />
                          )}

                          <div className="space-y-1 min-w-0 pr-5">
                            <span className={`text-[9.5px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-md font-extrabold inline-block mb-1.5 ${
                              notif.type === 'exam' 
                                ? 'bg-amber-100 text-amber-850' 
                                : notif.type === 'interview' 
                                ? 'bg-emerald-105 text-emerald-850' 
                                : notif.type === 'revision'
                                ? 'bg-indigo-150 text-indigo-850'
                                : 'bg-rose-100 text-rose-850'
                            }`}>
                              {notif.type === 'exam' ? '📝 Tech Exam Invitation' : notif.type === 'interview' ? '🤝 Interview Lineup' : notif.type === 'revision' ? '📋 assessment review' : '🎉 job offer issued'}
                            </span>
                            
                            <h4 className="font-extrabold text-sm text-slate-900 tracking-tight leading-snug">{notif.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed pt-0.5">{notif.message}</p>
                          </div>

                          {/* Date info context cards */}
                          {notif.eventDate && (
                            <div className={`p-3 rounded-xl border flex flex-col gap-1.5 ${
                              notif.type === 'exam' 
                                ? 'bg-amber-50/40 border-amber-100' 
                                : notif.type === 'interview'
                                ? 'bg-emerald-50/40 border-emerald-110'
                                : 'bg-indigo-50/30 border-indigo-110'
                            }`}>
                              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none font-mono">📅 Timetable Block:</span>
                              <span className={`text-xs font-bold leading-none ${
                                notif.type === 'exam' ? 'text-amber-850' : notif.type === 'interview' ? 'text-emerald-850' : 'text-indigo-850'
                              }`}>{notif.eventDate}</span>
                            </div>
                          )}

                          {/* Notification Actions Footer line */}
                          <div className="flex items-center justify-between pt-1 border-t border-slate-100/70 text-[10px] text-slate-400">
                            <span className="font-medium font-sans">{notif.date}</span>
                            
                            <div className="flex items-center gap-2">
                              {!notif.read && (
                                <button
                                  onClick={() => handleMarkAsRead(notif.id)}
                                  className="text-indigo-600 hover:text-indigo-800 hover:underline font-bold transition cursor-pointer"
                                >
                                  Mark Read
                                </button>
                              )}
                              <button
                                onClick={() => handleRemoveNotification(notif.id)}
                                className="text-slate-400 hover:text-rose-500 font-bold transition cursor-pointer"
                              >
                                Dismiss
                              </button>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Drawer footer controls */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/20 flex gap-2.5">
                  <button
                    onClick={handleClearNotifications}
                    disabled={notifications.length === 0}
                    className="w-full text-center bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-bold py-2 px-4 rounded-xl text-xs transition cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed select-none"
                  >
                    Dismiss All Notifications
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}


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
            profile={profile}
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
            applications={applications}
            onSeed1000Applications={handleSeed1000Applications}
            onResetApplications={handleResetApplications}
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

        {activeTab === 'auth' && (
          <AuthPage 
            profile={profile}
            onAuthSuccess={handleAuthSuccess}
            onSignOut={handleSignOut}
            onNavigate={setActiveTab}
          />
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

      {/* Login / Auth Overlay Panel */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onAuthSuccess={handleAuthSuccess} 
      />
    </div>
  </div>
  );
}

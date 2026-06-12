import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  IndianRupee, 
  GraduationCap, 
  Heart, 
  FileText, 
  CheckCircle, 
  Clock, 
  RefreshCcw, 
  AlertCircle,
  Activity,
  UserCheck,
  Building2,
  Trash2,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { StudentProfile, Application, TabType, Job } from '../types';
import { mockJobs } from '../data/mockData';

interface DashboardTabProps {
  onNavigate: (tab: TabType) => void;
  profile: StudentProfile | null;
  onUpdateProfile: (profile: StudentProfile) => void;
  savedJobIds: string[];
  onToggleSaveJob: (jobId: string) => void;
  applications: Application[];
  onSetSelectedJobId: (jobId: string) => void;
  onPromoteApplicationStatus: (appId: string) => void; // Interactively cycle status for testing!
}

export default function DashboardTab({
  onNavigate,
  profile,
  onUpdateProfile,
  savedJobIds,
  onToggleSaveJob,
  applications,
  onSetSelectedJobId,
  onPromoteApplicationStatus
}: DashboardTabProps) {
  const [dragActive, setDragActive] = useState(false);
  const [isUpdatingResume, setIsUpdatingResume] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Fetch full details of saved jobs
  const savedJobs = mockJobs.filter(job => savedJobIds.includes(job.id));

  // Handle Drag & Drop updates
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (profile && e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      triggerResumeUpdate(file.name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (profile && e.target.files && e.target.files[0]) {
      triggerResumeUpdate(e.target.files[0].name);
    }
  };

  const triggerResumeUpdate = (filename: string) => {
    if (!profile) return;
    setIsUpdatingResume(true);
    
    // Simulate cloud storage upload
    setTimeout(() => {
      const updatedProfile: StudentProfile = {
        ...profile,
        resumeName: filename,
        resumeDataUrl: 'new-uploaded-placeholder-url'
      };
      onUpdateProfile(updatedProfile);
      setIsUpdatingResume(false);
      setSuccessMsg(`Resume successfully replaced with: ${filename}`);
      setTimeout(() => setSuccessMsg(null), 4000);
    }, 1000);
  };

  // Helper to get status color classes
  const getStatusClasses = (status: Application['status']) => {
    switch (status) {
      case 'applied': 
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'under revision': 
        return 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse';
      case 'shortlisted': 
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'interview scheduled': 
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'offered': 
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold';
      case 'not selected': 
        return 'bg-rose-50 text-rose-600 border-rose-200';
      default: 
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  // Switch to Details view
  const handleViewDetails = (jobId: string) => {
    onSetSelectedJobId(jobId);
    onNavigate('job-details');
  };

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto py-16 px-6 text-center bg-white border border-slate-100 rounded-3xl shadow-xl space-y-6">
        <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto border border-amber-100 dark:bg-amber-500/10">
          <ShieldAlert className="w-10 h-10 text-amber-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 font-sans">
            Dashboard Locked
          </h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
            Please register your credentials to unlock application statuses tracking, resume updater, and target matching jobs records.
          </p>
        </div>

        <div className="pt-2">
          <button 
            onClick={() => onNavigate('register')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl text-sm transition shadow-md hover:scale-[1.01] cursor-pointer"
          >
            Create Your Profile Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
            Student Dashboard
          </h1>
          <p className="text-slate-500 text-sm font-sans mt-0.5">
            Monitor real-time corporate applications, manage your metadata profiles, and overwrite documents.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Live Recruiter Pipelines</span>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex gap-2.5 items-start">
          <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Row Left: Profile Credentials Panel & Resume Overwriter */}
        <section className="lg:col-span-1 space-y-6">
          
          {/* Visual Profile Board card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 font-sans text-base leading-snug">{profile.name}</h3>
                <p className="text-xs text-slate-400 truncate">{profile.email}</p>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Current Institution:</span>
                <p className="font-bold text-slate-700">{profile.collegeName}</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Registered Skills:</span>
                <div className="flex flex-wrap gap-1">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="bg-slate-50 border border-slate-150 text-slate-600 px-2 py-0.5 rounded text-[10px] font-medium font-sans">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="pt-1 flex justify-between">
              <button 
                onClick={() => onNavigate('register')}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 transition-all cursor-pointer"
              >
                Edit Profile Details
              </button>
            </div>
          </div>

          {/* Overwrite Resume Widget card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm font-sans flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" /> Resume Document Update
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Replacing your resume overwrites your active file instantly. Verified partner recruitment agencies will access your updated version automatically.
            </p>

            <div className="p-3 bg-indigo-50/50 border border-indigo-100 text-indigo-900 rounded-xl flex items-center gap-3">
              <FileText className="w-8 h-8 text-indigo-500 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold truncate text-slate-800">{profile.resumeName || 'No resume uploaded'}</p>
                <span className="text-[10px] text-slate-400">PDF Document</span>
              </div>
            </div>

            {/* Resume update dragging canvas */}
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-4 text-center transition ${
                dragActive 
                  ? 'border-indigo-500 bg-indigo-50/50' 
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
              }`}
            >
              <input 
                type="file" 
                id="dashboard-resume-file"
                className="hidden" 
                accept=".pdf,.docx,.doc"
                onChange={handleFileChange}
              />
              <label htmlFor="dashboard-resume-file" className="cursor-pointer space-y-1 block">
                {isUpdatingResume ? (
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500 py-2">
                    <svg className="animate-spin h-4.5 w-4.5 text-indigo-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Uploading new resume...</span>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-semibold text-indigo-600 hover:underline">Click to upload brand new document</p>
                    <p className="text-[10px] text-slate-400">Drag & drop overwrites existing file</p>
                  </>
                )}
              </label>
            </div>
          </div>

        </section>

        {/* Row Right 2 Columns: Application Statuses & Saved Jobs list */}
        <section className="lg:col-span-2 space-y-6">
          
          {/* Section: Live Application Progress Logs */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm sm:text-base font-sans flex items-center gap-2">
                <Activity className="w-4.5 h-4.5 text-indigo-600 animate-pulse" /> Live Applications State ({applications.length})
              </h3>
              {applications.length > 0 && (
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-full">
                  Click status trigger to test stepper progression
                </span>
              )}
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-10 px-4 space-y-3">
                <Briefcase className="w-10 h-10 text-slate-350 mx-auto" />
                <div className="space-y-1">
                  <h4 className="font-semibold text-slate-800 text-sm">No active submissions found</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    You haven’t submitted credentials to any openings yet. Check matching fresher tags.
                  </p>
                </div>
                <button 
                  onClick={() => onNavigate('jobs')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 px-4 rounded-xl shadow-sm transition cursor-pointer"
                >
                  Explore Vacancies →
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-1">
                {applications.map((app) => (
                  <div 
                    key={app.id}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-150 transition-all space-y-3.5"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2.5">
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-800 truncate text-sm sm:text-base font-sans">{app.jobTitle}</h4>
                        <p className="text-[11px] text-slate-400 font-sans block">{app.companyName} • Applied on {app.appliedDate}</p>
                      </div>

                      {/* Interactive cycle button */}
                      <button 
                        onClick={() => onPromoteApplicationStatus(app.id)}
                        className={`text-xs px-3 py-1.5 rounded-xl border font-semibold shrink-0 transition flex items-center gap-1 cursor-pointer hover:shadow-xs active:scale-95 ${getStatusClasses(app.status)}`}
                        title="Click to cycle status for testing purposes"
                      >
                        <span>{app.status.toUpperCase()}</span>
                        <RefreshCcw className="w-3 h-3 text-slate-400 hover:text-indigo-600 shrink-0" />
                      </button>
                    </div>

                    {/* Progress tracking Stepper */}
                    <div className="pt-2">
                      <div className="grid grid-cols-4 gap-1.5 relative">
                        {/* Horizontal joiner bar */}
                        <div className="absolute top-1.5 left-0 right-0 h-0.5 bg-slate-200 -z-1" />
                        
                        {/* Steps */}
                        {['applied', 'under revision', 'shortlisted', 'interview scheduled / offered'].map((step, idx) => {
                          let isPastOrCurrent = false;
                          const currentStat = app.status;

                          if (currentStat === 'not selected') {
                            // special case
                          } else {
                            if (currentStat === 'applied') {
                              isPastOrCurrent = idx === 0;
                            } else if (currentStat === 'under revision') {
                              isPastOrCurrent = idx <= 1;
                            } else if (currentStat === 'shortlisted') {
                              isPastOrCurrent = idx <= 2;
                            } else if (currentStat === 'interview scheduled' || currentStat === 'offered') {
                              isPastOrCurrent = idx <= 3;
                            }
                          }

                          return (
                            <div key={idx} className="text-center space-y-1">
                              <div className={`w-3.5 h-3.5 rounded-full mx-auto border flex items-center justify-center transition ${
                                isPastOrCurrent 
                                  ? 'bg-indigo-600 border-indigo-600 text-white' 
                                  : 'bg-white border-slate-300'
                              }`} />
                              <span className={`block text-[9px] uppercase font-bold tracking-tight px-1 font-mono truncate ${
                                isPastOrCurrent ? 'text-indigo-600 font-semibold' : 'text-slate-400'
                              }`}>
                                {idx === 0 ? 'Applied' : idx === 1 ? 'Review' : idx === 2 ? 'Shortlist' : 'Interview'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Bookmarked / Saved Jobs */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm sm:text-base font-sans flex items-center gap-2 pb-2 border-b border-slate-100">
              <Heart className="w-4.5 h-4.5 text-rose-500 fill-rose-500" /> Bookmarked Opportunities ({savedJobs.length})
            </h3>

            {savedJobs.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <Heart className="w-8 h-8 text-slate-200 mx-auto" />
                <p className="text-xs text-slate-400">No bookmarks recorded. Browse fresh jobs to save candidates.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedJobs.map((job) => (
                  <div 
                    key={job.id}
                    className="p-4 rounded-xl border border-slate-100 bg-white/50 hover:bg-slate-50 hover:border-slate-200 transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-[10px] text-slate-400 font-bold font-sans uppercase truncate">{job.companyName}</span>
                        <button 
                          onClick={() => onToggleSaveJob(job.id)}
                          className="text-slate-350 hover:text-rose-500 transition-all p-1 cursor-pointer"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-bold text-slate-800 text-xs sm:text-sm truncate font-sans group-hover:text-indigo-600">
                        {job.title}
                      </h4>

                      <div className="flex flex-col gap-1 text-[11px] text-slate-500 pt-2 leading-tight">
                        <span className="truncate">📍 {job.location}</span>
                        <span className="truncate">💰 {job.salary}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleViewDetails(job.id)}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-1.5 px-2 rounded-lg text-xs transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Read full details <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </section>

      </div>
    </div>
  );
}

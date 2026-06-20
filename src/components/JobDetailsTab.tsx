import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  IndianRupee, 
  Briefcase, 
  ChevronRight, 
  CheckCircle, 
  ArrowLeft, 
  FileText, 
  Heart, 
  AlertCircle, 
  Clock,
  ExternalLink,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Job, StudentProfile, Application, TabType } from '../types';
import { mockJobs } from '../data/mockData';

interface JobDetailsTabProps {
  onNavigate: (tab: TabType) => void;
  selectedJobId: string;
  onSelectJob: (jobId: string) => void;
  profile: StudentProfile | null;
  applications: Application[];
  onApplyJob: (jobId: string) => void;
  savedJobIds: string[];
  onToggleSaveJob: (jobId: string) => void;
}

export default function JobDetailsTab({
  onNavigate,
  selectedJobId,
  onSelectJob,
  profile,
  applications,
  onApplyJob,
  savedJobIds,
  onToggleSaveJob
}: JobDetailsTabProps) {
  // Find current job, fallback to first job if none selected
  const job = mockJobs.find(j => j.id === selectedJobId) || mockJobs[0];
  const [isApplying, setIsApplying] = useState(false);
  const [showApplySuccess, setShowApplySuccess] = useState(false);

  // Check if student has already applied to this specific job
  const hasApplied = applications.some(app => app.jobId === job.id);

  const handleApplyClick = () => {
    if (!profile) {
      // Not registered yet, prompt to register
      onNavigate('register');
      return;
    }

    if (hasApplied) return;

    setIsApplying(true);
    // Mimic real API network submission delay
    setTimeout(() => {
      onApplyJob(job.id);
      setIsApplying(false);
      setShowApplySuccess(true);
      // Auto close success notification after 3 seconds
      setTimeout(() => setShowApplySuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Tiny breadcrumb/back navigations */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button 
          onClick={() => onNavigate('jobs')} 
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Jobs Listing
        </button>

        {/* Quick job selection bar for interactive discovery */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
          <span className="text-[11px] text-slate-400 shrink-0 font-medium uppercase font-mono">Quick Switch:</span>
          {mockJobs.map(j => (
            <button 
              key={j.id} 
              onClick={() => { onSelectJob(j.id); setShowApplySuccess(false); }}
              className={`px-3 py-1 rounded-full text-xs font-medium border shrink-0 transition cursor-pointer ${
                j.id === job.id 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              {j.companyName} ({j.type === 'fresher' ? 'Fresher' : 'Exp'})
            </button>
          ))}
        </div>
      </div>

      {/* Main Core Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Structured Details info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Hero Header Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-950 font-black text-2xl text-white flex items-center justify-center shrink-0">
                  {job.logo}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-indigo-600 hover:underline cursor-pointer">{job.companyName}</span>
                    <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 font-medium px-2 py-0.5 rounded-full">
                      Rating: 4.7 ★
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight font-sans">
                    {job.title}
                  </h1>
                </div>
              </div>

              {/* Badges and short pill */}
              <div className="flex sm:flex-col items-start gap-2 self-start">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                  job.type === 'fresher' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                    : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                }`}>
                  {job.type === 'fresher' ? '🎓 Fresher' : '💼 Experienced'}
                </span>
                <span className="text-xs text-slate-400 font-mono pl-1">ID: {job.id}</span>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Crucial Parameters Stream */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="space-y-1 p-3 rounded-xl bg-slate-50 border border-slate-100/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <IndianRupee className="w-3 h-3 text-slate-400" /> Salary Package
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{job.salary}</p>
              </div>

              <div className="space-y-1 p-3 rounded-xl bg-slate-50 border border-slate-100/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Office Location</span>
                <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{job.location}</p>
              </div>

              <div className="space-y-1 p-3 rounded-xl bg-slate-50 border border-slate-100/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Experience Term</span>
                <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{job.experienceRequired}</p>
              </div>

              <div className="space-y-1 p-3 rounded-xl bg-slate-50 border border-slate-100/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Job Category</span>
                <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{job.category}</p>
              </div>
            </div>
          </div>

          {/* Job Description Information Box */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-sans">
              Job Description
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
              {job.description}
            </p>
          </div>

          {/* Core Requirements */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-sans">
              Qualifications & Core Requirements
            </h2>
            <ul className="space-y-3">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex gap-3 text-sm sm:text-sm text-slate-600 font-sans">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Skills Required section */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-sans">
              Target Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2 pt-1">
              {job.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 font-medium font-sans text-xs bg-indigo-50 border border-indigo-100 text-indigo-800 rounded-xl shadow-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Column: Apply Panel Drawer & Company Background summary */}
        <aside className="lg:col-span-1 space-y-6">
          
          {/* Real-time Apply widget board */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-6">
            <div className="space-y-1.5">
              <h3 className="text-base font-bold font-sans">Job Verification</h3>
              <p className="text-xs text-slate-400">Successfully validated. Resume direct apply enabled.</p>
            </div>

            <hr className="border-slate-800" />

            {/* Dynamic Status Display Notification popup */}
            {showApplySuccess && (
              <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs flex gap-2 items-start">
                <UserCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <div>
                  <strong className="block font-bold text-white">Application Recorded!</strong>
                  Monitor interview timelines in your student dashboard.
                </div>
              </div>
            )}

            {/* Check Profile to dictate application status layout */}
            <div className="space-y-4">
              {hasApplied ? (
                <div className="space-y-3">
                  <div className="w-full bg-slate-800 text-slate-300 font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 border border-slate-700/80">
                    <CheckCircle className="w-5 h-5 text-emerald-400" /> Already Applied
                  </div>
                  <button 
                    onClick={() => onNavigate('dashboard')}
                    className="w-full hover:underline text-xs text-indigo-400 hover:text-indigo-300 font-semibold text-center mt-2 cursor-pointer"
                  >
                    Check Application Status →
                  </button>
                </div>
              ) : !profile ? (
                /* Registration Banner callout */
                <div className="space-y-4">
                  <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-200 rounded-xl text-xs space-y-2">
                    <div className="flex gap-1.5 items-center font-bold text-amber-400">
                      <AlertCircle className="w-4 h-4" /> Guest Profile Detected
                    </div>
                    <p className="leading-relaxed">To submit your portfolio and apply to this job, please register your profile credentials and resume.</p>
                  </div>

                  <button 
                    onClick={() => onNavigate('register')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.01] text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-md active:scale-[0.99] cursor-pointer"
                  >
                    Complete User Registration
                  </button>
                </div>
              ) : (
                /* Fully Registered user, show 1-click apply */
                <div className="space-y-3">
                  <div className="rounded-xl bg-slate-800/80 p-3.5 border border-slate-800 space-y-2.5 text-xs text-slate-300">
                    <span className="font-bold text-slate-200 block text-[11px] uppercase tracking-wider font-mono">Applying as:</span>
                    <div className="space-y-1">
                      <p className="font-bold text-white truncate">{profile.name}</p>
                      <p className="truncate text-slate-400">{profile.email}</p>
                      <p className="truncate text-indigo-400 font-medium">📜 {profile.resumeName || 'Default Resume'}</p>
                    </div>
                  </div>

                  <button 
                    onClick={handleApplyClick}
                    disabled={isApplying}
                    className={`w-full font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer ${
                      isApplying 
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isApplying ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting portfolio...
                      </span>
                    ) : (
                      'Apply with 1-Click'
                    )}
                  </button>
                </div>
              )}

              <button 
                onClick={() => onToggleSaveJob(job.id)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  savedJobIds.includes(job.id)
                    ? 'bg-rose-950/40 border-rose-500/30 text-rose-400' 
                    : 'bg-transparent border-slate-750 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${savedJobIds.includes(job.id) ? 'fill-current text-rose-500' : ''}`} />
                <span>{savedJobIds.includes(job.id) ? 'Saved to bookmarks' : 'Bookmark Job'}</span>
              </button>
            </div>
            
            <div className="text-[10px] text-slate-500 text-center leading-relaxed">
              By applying, you agree to share your stored resume summary and contact credentials with {job.companyName}’s specific recruiting team managers.
            </div>
          </div>

          {/* Safe Workspace Protection disclaimer badges */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 text-sm font-sans">Why apply through us?</h4>
            <div className="space-y-3">
              <div className="flex gap-2.5 items-start text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Verified Fresh Graduates Employer Program, no external screening fees allowed.</span>
              </div>
              <div className="flex gap-2.5 items-start text-xs text-slate-500">
                <Clock className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>Recruiter feedback assured within 5 enterprise business calendar days.</span>
              </div>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}

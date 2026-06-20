import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  GraduationCap, 
  Tag, 
  UploadCloud, 
  CheckCircle2, 
  ShieldAlert, 
  X,
  FileCheck2,
  BookOpen,
  Plus
} from 'lucide-react';
import { StudentProfile, TabType } from '../types';

interface RegisterTabProps {
  onNavigate: (tab: TabType) => void;
  profile: StudentProfile | null;
  onRegisterProfile: (profile: StudentProfile) => void;
}

export default function RegisterTab({
  onNavigate,
  profile,
  onRegisterProfile
}: RegisterTabProps) {
  // Input states
  const [name, setName] = useState(profile?.name || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [password, setPassword] = useState('');
  const [collegeName, setCollegeName] = useState(profile?.collegeName || '');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>(profile?.skills || ['React', 'JavaScript']);
  
  // File Upload states
  const [resumeName, setResumeName] = useState<string | null>(profile?.resumeName || null);
  const [resumeDataUrl, setResumeDataUrl] = useState<string | null>(profile?.resumeDataUrl || null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  // Form notifications
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const popularSkills = ['SQL', 'Java', 'Python', 'React', 'TypeScript', 'Node.js', 'Figma', 'Tableau', 'Git', 'CSS Grid', 'Machine Learning'];

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSkill = skillInput.trim();
    if (cleanSkill && !skills.includes(cleanSkill)) {
      setSkills([...skills, cleanSkill]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handlePopularSkillClick = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  // Drag handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (file.type === "application/pdf" || file.name.endsWith('.pdf') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
      // Simulate slow cloud upload
      setUploadProgress(10);
      const timer = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev === null) return null;
          if (prev >= 100) {
            clearInterval(timer);
            setResumeName(file.name);
            setResumeDataUrl('mock-url-data-placeholder');
            return null; // complete
          }
          return prev + 30;
        });
      }, 200);
    } else {
      setErrorMsg('Invalid document. Please upload a standard PDF or Word Document (.docx).');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate inputs
    if (!name.trim()) return setErrorMsg('Name is required.');
    if (!email.trim() || !email.includes('@')) return setErrorMsg('A valid email layout is required.');
    if (!password.trim() && !profile) return setErrorMsg('Please key-select a password.');
    if (!collegeName.trim()) return setErrorMsg('Current college or graduation institute is required.');
    if (skills.length === 0) return setErrorMsg('Please list at least 1 skill to matching job profiles.');
    if (!resumeName) return setErrorMsg('Resume attachment is required for Freshers recruitment pipeline.');

    // Save profile into state
    const studentProfile: StudentProfile = {
      name: name.trim(),
      email: email.trim(),
      collegeName: collegeName.trim(),
      skills,
      resumeName,
      resumeDataUrl
    };

    onRegisterProfile(studentProfile);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto py-12 px-6 text-center bg-white border border-slate-100 rounded-3xl shadow-xl space-y-6">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100 dark:bg-emerald-500/10">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 font-sans">
            Profile Synchronized Successfully!
          </h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
            Welcome to the Career Launch program, <strong className="text-slate-800">{name}</strong>. Your matching skills pipeline is now open.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl text-sm transition shadow-md cursor-pointer"
          >
            Access User Dashboard
          </button>
          <button 
            onClick={() => onNavigate('jobs')}
            className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-3 px-6 rounded-xl text-sm border border-slate-200 transition cursor-pointer"
          >
            Find Fresh Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Banner info */}
      <div className="text-center space-y-1.5 ">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
          User Registration Pipeline
        </h1>
        <p className="text-slate-500 text-sm sm:text-base font-sans leading-relaxed">
          Create/update your academic profile here. Fully aligned with verified partner hiring portals.
        </p>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-6 sm:p-10">
        
        {/* Error Callout */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl text-xs flex gap-2.5 items-start">
            <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <strong className="block font-bold">Registration Halted</strong>
              {errorMsg}
            </div>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-750 uppercase tracking-wider block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="e.g. Vishnu Priya"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-3 pl-11 pr-4 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-755 uppercase tracking-wider block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="e.g. user@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-3 pl-11 pr-4 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-755 uppercase tracking-wider block">
                {profile ? 'Verify Password (Optional)' : 'Choose Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                <input 
                  type="password" 
                  placeholder={profile ? '••••••••' : 'Min 6 alphanumeric characters'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-3 pl-11 pr-4 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                />
              </div>
            </div>

            {/* College Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-755 uppercase tracking-wider block">Current College / Institute</label>
              <div className="relative">
                <BookOpen className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="e.g. National Institute of Technology"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-3 pl-11 pr-4 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                />
              </div>
            </div>

          </div>

          <hr className="border-slate-100" />

          {/* Core Skills Add Form */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold text-slate-755 uppercase tracking-wider block">Technical / Core Skills</label>
              <span className="text-[10px] text-slate-400">Press enter or Add to append tag</span>
            </div>

            {/* Input tag form */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="e.g. PostgreSQL, Python, Figma"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const clean = skillInput.trim();
                      if (clean && !skills.includes(clean)) {
                        setSkills([...skills, clean]);
                        setSkillInput('');
                      }
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-200 py-3 pl-11 pr-4 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                />
              </div>
              <button 
                type="button"
                onClick={(e) => {
                  const clean = skillInput.trim();
                  if (clean && !skills.includes(clean)) {
                    setSkills([...skills, clean]);
                    setSkillInput('');
                  }
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-750 font-bold px-4 rounded-xl flex items-center justify-center border border-slate-200 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Active Tags lists */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.map((skill, sIdx) => (
                <span 
                  key={sIdx} 
                  className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-800 text-xs px-3 py-1.5 rounded-xl font-medium"
                >
                  {skill}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-amber-700 font-semibold cursor-pointer"
                  >
                    <X className="w-3 h-3 hover:scale-110" />
                  </button>
                </span>
              ))}
              {skills.length === 0 && (
                <span className="text-xs text-rose-500 font-medium">Please include at least 1 verified skill.</span>
              )}
            </div>

            {/* Popular recommendation pills */}
            <div className="pt-2">
              <span className="text-[10px] text-slate-400 block mb-1.5 uppercase font-semibold">Recommended suggestions:</span>
              <div className="flex flex-wrap gap-1.5">
                {popularSkills.map((ps, idx) => (
                  <button 
                    type="button"
                    key={idx}
                    onClick={() => handlePopularSkillClick(ps)}
                    className={`text-[10px] py-1 px-2.5 rounded border transition cursor-pointer ${
                      skills.includes(ps) 
                        ? 'bg-slate-200 text-slate-400 border-transparent cursor-not-allowed' 
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                    disabled={skills.includes(ps)}
                  >
                    + {ps}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Resume Upload Drag & Drop Area */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-755 uppercase tracking-wider block">Resume Upload (.pdf, .docx)</label>
            
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all ${
                dragActive 
                  ? 'border-indigo-500 bg-indigo-50/50' 
                  : resumeName 
                    ? 'border-emerald-300 bg-emerald-50/10' 
                    : 'border-slate-200 hover:border-slate-350 bg-slate-50/50'
              }`}
            >
              <input 
                type="file" 
                id="resume-file-input"
                className="hidden" 
                accept=".pdf,.docx,.doc"
                onChange={handleFileChange}
              />
              
              {uploadProgress !== null ? (
                /* Progress bar container */
                <div className="space-y-3 py-4 max-w-xs mx-auto">
                  <UploadCloud className="w-10 h-10 text-indigo-500 mx-auto animate-bounce" />
                  <div className="text-xs text-slate-600 font-medium font-sans">Uploading: {uploadProgress}% completed</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-1.5 transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              ) : resumeName ? (
                /* Successful resume upload layout */
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <FileCheck2 className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-slate-800 font-sans truncate px-4">{resumeName}</h4>
                    <p className="text-xs text-slate-500">Document matched and verified for entry pipeline.</p>
                  </div>
                  <label 
                    htmlFor="resume-file-input"
                    className="inline-flex text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Change Document
                  </label>
                </div>
              ) : (
                /* Default drag selection view */
                <label htmlFor="resume-file-input" className="cursor-pointer space-y-4 block">
                  <div className="w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center mx-auto transition">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-700 font-sans">
                      <span className="text-indigo-600 hover:underline">Click to browse</span> or drag and drop your document here
                    </p>
                    <p className="text-xs text-slate-400">PDF, standard Word document up to 10MB formats accepted</p>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Form Action Submit Button */}
          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-all shadow-md hover:scale-[1.005] active:scale-[0.995] cursor-pointer"
            >
              {profile ? 'Update My Candidate Profile' : 'Complete Online Registration'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

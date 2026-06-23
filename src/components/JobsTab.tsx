import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  IndianRupee, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  SlidersHorizontal,
  X,
  FileText,
  BookmarkCheck,
  CheckCircle2,
  AlertCircle,
  Database,
  Sparkles,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Job, TabType, Application, StudentProfile } from '../types';
import { mockJobs } from '../data/mockData';

interface JobsTabProps {
  onNavigate: (tab: TabType) => void;
  onSelectJob: (jobId: string) => void;
  profile: StudentProfile | null;
  searchQuery: string;
  onSetSearchQuery: (query: string) => void;
  filterType: 'all' | 'fresher' | 'experienced';
  onSetFilterType: (type: 'all' | 'fresher' | 'experienced') => void;
  savedJobIds: string[];
  onToggleSaveJob: (jobId: string) => void;
  applications: Application[];
  onSeed1000Applications?: () => void;
  onResetApplications?: () => void;
}

export default function JobsTab({
  onNavigate,
  onSelectJob,
  profile,
  searchQuery,
  onSetSearchQuery,
  filterType,
  onSetFilterType,
  savedJobIds,
  onToggleSaveJob,
  applications,
  onSeed1000Applications,
  onResetApplications
}: JobsTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 8;
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedProgress, setSeedProgress] = useState(0);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Reset pagination to first page upon filter adjustments
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterType, selectedCategory, selectedSkill]);

  const handleTriggerSeed = () => {
    if (!onSeed1000Applications) return;
    setIsSeeding(true);
    setSeedProgress(15);
    
    setTimeout(() => setSeedProgress(42), 150);
    setTimeout(() => setSeedProgress(75), 350);
    setTimeout(() => setSeedProgress(94), 550);
    setTimeout(() => {
      setSeedProgress(100);
      onSeed1000Applications();
      setIsSeeding(false);
      setSuccessMsg("System successfully synced 1,000 corporate applications into your dashboard status monitors! Head to the Dashboard tab to view pagination pipelines.");
    }, 750);
  };

  // List all available skills for quick filter
  const allSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    mockJobs.forEach(job => job.skills.forEach(skill => skillsSet.add(skill)));
    return ['All', ...Array.from(skillsSet)];
  }, []);

  // List all available categories
  const allCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    mockJobs.forEach(job => categoriesSet.add(job.category));
    return ['All', ...Array.from(categoriesSet)];
  }, []);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      // 0. Profile Matching Roles Filter (only show jobs matching candidate's skills)
      if (profile && profile.skills && profile.skills.length > 0) {
        const studentSkills = profile.skills.map(s => s.trim().toLowerCase());
        const hasSkillMatch = job.skills.some(js => studentSkills.includes(js.trim().toLowerCase()));
        if (!hasSkillMatch) return false;
      }

      // 1. Text Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const words = query.split(/\s+/).filter(Boolean);
        
        const matchesAllWords = words.every(word => {
          const matchesTitle = job.title.toLowerCase().includes(word);
          const matchesCompany = job.companyName.toLowerCase().includes(word);
          const matchesLocation = job.location.toLowerCase().includes(word);
          const matchesSkill = job.skills.some(skill => skill.toLowerCase().includes(word));
          const matchesCategory = job.category.toLowerCase().includes(word);
          return matchesTitle || matchesCompany || matchesLocation || matchesSkill || matchesCategory;
        });

        if (!matchesAllWords) {
          return false;
        }
      }

      // 2. Tab Filter (Fresher / Experience)
      if (filterType === 'fresher' && job.type !== 'fresher') return false;
      if (filterType === 'experienced' && job.type !== 'experienced') return false;

      // 3. Category Filter
      if (selectedCategory !== 'All' && job.category !== selectedCategory) return false;

      // 4. Skill Filter
      if (selectedSkill !== 'All' && !job.skills.includes(selectedSkill)) return false;

      return true;
    });
  }, [searchQuery, filterType, selectedCategory, selectedSkill, profile]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / JOBS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const displayedJobs = filteredJobs.slice((safeCurrentPage - 1) * JOBS_PER_PAGE, safeCurrentPage * JOBS_PER_PAGE);

  const handleResetFilters = () => {
    onSetSearchQuery('');
    onSetFilterType('all');
    setSelectedCategory('All');
    setSelectedSkill('All');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Visual Header Banner */}
      <div className="text-left space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
          Explore Open Opportunites
        </h1>
        <p className="text-slate-500 font-sans">
          Find matching careers. Use categories below to filter between Fresher Entry-Level or Experienced pipelines.
        </p>
      </div>

      {profile ? (
        <div className="bg-indigo-50/40 border border-indigo-100/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm shadow-indigo-600/10">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-800 font-sans">Tailored Role Matching Engaged</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans mt-0.5">
                Automatically filtered to match your registered profile skills: <span className="font-bold text-indigo-700">{profile.skills.join(', ')}</span>.
              </p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('register')}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-800 whitespace-nowrap bg-white hover:bg-slate-50 border border-indigo-150 py-2 px-4 rounded-xl transition duration-150 active:scale-95 cursor-pointer shadow-xs text-center"
          >
            Refine Skills
          </button>
        </div>
      ) : (
        <div className="bg-amber-50/50 border border-amber-100/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-amber-600 animate-bounce" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 font-sans">Unfiltered Vacancies List</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans mt-0.5">
                Register or log in to a candidate profile to activate smart matching algorithms against corporate criteria.
              </p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('register')}
            className="text-xs font-bold text-amber-700 hover:text-amber-850 whitespace-nowrap bg-white hover:bg-slate-50 border border-amber-200 py-2 px-4 rounded-xl transition duration-150 active:scale-95 cursor-pointer text-center"
          >
            Create Profile Matcher
          </button>
        </div>
      )}

      {/* Main Jobs Core Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side: Advanced Filters Board */}
        <aside className="lg:col-span-1 space-y-6 bg-white border border-slate-100 p-6 rounded-2xl h-fit shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" /> Filter Options
            </h2>
            {(searchQuery || filterType !== 'all' || selectedCategory !== 'All' || selectedSkill !== 'All') && (
              <button 
                onClick={handleResetFilters}
                className="text-xs text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* Text Search inside filters for secondary adjustments */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Search Keyword</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="e.g. React, Remote, Google"
                value={searchQuery}
                onChange={(e) => onSetSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 py-2.5 pl-3.5 pr-8 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400 font-sans"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSetSearchQuery('')}
                  className="absolute right-2 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Job Type Selector (Fresher Jobs vs Experience Jobs) */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Job Tier</label>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => onSetFilterType('all')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl text-left transition cursor-pointer ${
                  filterType === 'all' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100/80 border border-slate-105'
                }`}
              >
                <Briefcase className="w-4 h-4" /> All Openings
              </button>

              <button 
                onClick={() => onSetFilterType('fresher')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl text-left transition cursor-pointer ${
                  filterType === 'fresher' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100/80 border border-slate-105'
                }`}
              >
                <GraduationCap className="w-4 h-4" /> Fresher Jobs (0-1 yrs)
              </button>

              <button 
                onClick={() => onSetFilterType('experienced')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl text-left transition cursor-pointer ${
                  filterType === 'experienced' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100/80'
                }`}
              >
                <Briefcase className="w-4 h-4" /> Experienced Jobs
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans cursor-pointer text-slate-700"
            >
              {allCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Target Skill Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Specific Skill Match</label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans cursor-pointer text-slate-700"
            >
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

        </aside>

        {/* Right Side: Active Jobs List Stream */}
        <section className="lg:col-span-3 space-y-4">
          
          <div className="flex items-center justify-between text-slate-500 text-sm">
            <span>Showing <strong className="text-slate-900">{filteredJobs.length}</strong> matching roles</span>
            <span className="text-xs">Sorted by standard matching timeline</span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-4">
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="text-base font-bold text-slate-800">No vacancies matched your terms</h3>
                <p className="text-sm text-slate-500">
                  Try clearing specific keyword filter tags, adjusting job tiers, or toggling between Fresher / Experience tags.
                </p>
              </div>
              <button 
                onClick={handleResetFilters}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-xl text-sm transition shadow-sm cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                {displayedJobs.map((job) => (
                  <div 
                    key={job.id}
                    className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between group"
                  >
                    <div className="flex items-start gap-4 min-w-0 flex-1">
                      <div className="w-14 h-14 rounded-2xl bg-slate-950 text-white font-extrabold text-xl flex items-center justify-center shrink-0">
                        {job.logo}
                      </div>
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-xs font-semibold text-slate-400 truncate">{job.companyName}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-sans weight-medium">
                            {job.category}
                          </span>
                        </div>
                        
                        <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition text-lg leading-snug truncate font-sans">
                          {job.title}
                        </h3>

                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500 pt-0.5 font-sans">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <IndianRupee className="w-3.5 h-3.5 text-slate-400" /> {job.salary}
                          </span>
                          <span className="flex items-center gap-1 text-slate-400 font-medium">
                            📅 {job.postedDate}
                          </span>
                        </div>

                        {/* Job skills tags list */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {job.skills.map((skill, sIdx) => (
                            <span 
                              key={sIdx} 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSkill(skill);
                              }}
                              className={`px-2.5 py-0.5 rounded text-[10px] font-medium transition cursor-pointer ${
                                selectedSkill === skill 
                                  ? 'bg-indigo-100 text-indigo-700' 
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-100'
                              }`}
                            >
                                {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions Right Container */}
                    <div className="flex sm:flex-col gap-2.5 w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100/80 justify-end">
                      <button 
                        onClick={() => onSelectJob(job.id)}
                        className="flex-1 sm:flex-initial text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-xl text-xs transition shadow-sm cursor-pointer"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => onToggleSaveJob(job.id)}
                        className={`py-2 px-3 rounded-xl border transition flex items-center justify-center gap-1.5 text-xs cursor-pointer ${
                          savedJobIds.includes(job.id)
                            ? 'bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100/50' 
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${savedJobIds.includes(job.id) ? 'fill-current text-rose-500' : ''}`} />
                        <span>{savedJobIds.includes(job.id) ? 'Saved' : 'Save'}</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Dynamic Jobs Pagination Footer */}
              {totalPages > 1 && (
                <div id="jobs-pagination-deck" className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 border border-slate-200/60 rounded-2xl p-4 mt-6">
                  <div className="text-xs text-slate-500 font-semibold font-sans">
                    Page <strong className="text-slate-800">{safeCurrentPage}</strong> of <strong className="text-slate-800">{totalPages}</strong>
                    <span className="hidden sm:inline"> • Showing vacancies {((safeCurrentPage - 1) * JOBS_PER_PAGE) + 1} - {Math.min(safeCurrentPage * JOBS_PER_PAGE, filteredJobs.length)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={safeCurrentPage === 1}
                      className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                        safeCurrentPage === 1 
                          ? 'text-slate-300 border-slate-100 bg-slate-50 cursor-not-allowed' 
                          : 'text-slate-600 border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                        let targetPage = index + 1;
                        if (safeCurrentPage > 3) {
                          targetPage = safeCurrentPage - 3 + index;
                        }
                        if (targetPage + (5 - index - 1) > totalPages) {
                          targetPage = totalPages - 5 + index + 1;
                        }
                        if (targetPage < 1) targetPage = index + 1;
                        
                        if (targetPage > totalPages) return null;

                        return (
                          <button
                            key={targetPage}
                            onClick={() => setCurrentPage(targetPage)}
                            className={`w-8 h-8 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                              safeCurrentPage === targetPage
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {targetPage}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={safeCurrentPage === totalPages}
                      className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                        safeCurrentPage === totalPages 
                          ? 'text-slate-300 border-slate-100 bg-slate-50 cursor-not-allowed' 
                          : 'text-slate-600 border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </section>

      </div>
    </div>
  );
}

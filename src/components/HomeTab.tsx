import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  IndianRupee, 
  Building2, 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  Briefcase, 
  FileCheck, 
  Radio, 
  Cpu, 
  Heart,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { Job, Company, TabType } from '../types';
import { mockJobs, mockCompanies, mockBenefits } from '../data/mockData';
import { motion } from 'motion/react';

interface HomeTabProps {
  onNavigate: (tab: TabType) => void;
  onSelectJob: (jobId: string) => void;
  onSetSearchQuery: (query: string) => void;
  onSetFilterType: (type: 'all' | 'fresher' | 'experienced') => void;
  savedJobIds: string[];
  onToggleSaveJob: (jobId: string) => void;
}

export default function HomeTab({
  onNavigate,
  onSelectJob,
  onSetSearchQuery,
  onSetFilterType,
  savedJobIds,
  onToggleSaveJob
}: HomeTabProps) {
  const [localSearch, setLocalSearch] = useState('');
  const [localLocation, setLocalLocation] = useState('');

  // We filter featured jobs (e.g. top 3 jobs that are highly premium)
  const featuredJobs = mockJobs.slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalQuery = [localSearch, localLocation].filter(Boolean).join(' ');
    onSetSearchQuery(finalQuery ? finalQuery : '');
    onNavigate('jobs');
  };

  const handleQuickCategoryClick = (category: 'fresher' | 'experienced') => {
    onSetFilterType(category);
    onSetSearchQuery('');
    onNavigate('jobs');
  };

  // Helper function to dynamically map strings to Lucide icon components
  const renderBenefitIcon = (iconName: string, className: string) => {
    const props = { className: `${className} w-6 h-6`, strokeWidth: 2 };
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'FileCheck': return <FileCheck {...props} />;
      case 'Radio': return <Radio {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      default: return <Award {...props} />;
    }
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl py-16 px-6 sm:px-12 md:px-16 lg:py-24 shadow-2xl border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent)] rounded-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Launch Your College Career Today
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
            Your First Step into the Professional World
          </h1>
          
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Career Launch coordinates direct entry level vacancies for undergraduate freshers and young experts with premium tech employers.
          </p>

          {/* Elegant Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 text-slate-950">
            <div className="flex-1 flex items-center min-w-0 px-3 py-1 bg-slate-50 rounded-xl border border-slate-150">
              <Search className="w-5 h-5 text-slate-400 shrink-0 mr-2" />
              <input 
                type="text" 
                placeholder="Job title, technical skills, keywords..." 
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-transparent border-none py-2 text-sm focus:outline-none placeholder-slate-400 font-sans"
              />
            </div>
            <div className="flex-1 flex items-center min-w-0 px-3 py-1 bg-slate-50 rounded-xl border border-slate-150">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0 mr-2" />
              <input 
                type="text" 
                placeholder="Country, city, or remote" 
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                className="w-full bg-transparent border-none py-2 text-sm focus:outline-none placeholder-slate-400 font-sans"
              />
            </div>
            <button 
              type="submit" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-xl transition-all shadow-md active:scale-[0.98] shrink-0 font-sans cursor-pointer"
            >
              Search Jobs
            </button>
          </form>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-slate-400">
            <span>Popular Categories:</span>
            <button 
              onClick={() => handleQuickCategoryClick('fresher')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition cursor-pointer font-sans"
            >
              🎓 Internships & Freshers
            </button>
            <button 
              onClick={() => handleQuickCategoryClick('experienced')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition cursor-pointer font-sans"
            >
              💼 Young Professionals
            </button>
          </div>
        </div>
      </section>

      {/* Student Benefits Section - 4 visual grid cards */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
            Engineered Specifically for Students
          </h2>
          <p className="text-slate-500 font-sans">
            How Career Launch aligns entry-level aspirants with world class corporate ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockBenefits.map((benefit, index) => (
            <div 
              key={benefit.id}
              className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all space-y-4 group"
            >
              <div className={`p-3 rounded-xl w-fit bg-gradient-to-br ${benefit.color}`}>
                {renderBenefitIcon(benefit.icon, '')}
              </div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition font-sans">
                {benefit.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
              Featured Job Openings
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-sans mt-0.5">
              High hiring intent opportunities requiring no high experience ceilings.
            </p>
          </div>
          <button 
            onClick={() => { onSetFilterType('all'); onSetSearchQuery(''); onNavigate('jobs'); }}
            className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition cursor-pointer bg-indigo-50/50 hover:bg-indigo-100/50 px-4 py-2 rounded-xl"
          >
            Explore all <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <div 
              key={job.id}
              className="flex flex-col justify-between bg-white border border-slate-100 hover:border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group relative"
            >
              <div>
                <div className="flex justify-between items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-extrabold text-lg text-slate-700 group-hover:border-indigo-200 transition">
                    {job.logo}
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                    job.type === 'fresher' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                  }`}>
                    {job.type === 'fresher' ? 'Fresher' : 'Experience'}
                  </span>
                </div>

                <div className="mt-4 space-y-1.5">
                  <span className="text-xs text-slate-400 font-medium font-sans block">{job.companyName}</span>
                  <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition line-clamp-1 font-sans text-base">
                    {job.title}
                  </h3>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                {/* Tag pills */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {job.skills.slice(0, 3).map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-[10px] text-slate-500 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-50 text-[10px] text-slate-400 font-medium">
                      +{job.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center justify-between gap-2">
                <button 
                  onClick={() => onSelectJob(job.id)}
                  className="flex-1 text-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-2 px-3 rounded-lg text-xs transition cursor-pointer"
                >
                  View Details
                </button>
                <button 
                  onClick={() => onToggleSaveJob(job.id)}
                  className={`p-2 rounded-lg border transition cursor-pointer ${
                    savedJobIds.includes(job.id)
                      ? 'bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100/50' 
                      : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                  }`}
                  title={savedJobIds.includes(job.id) ? "Unsave Job" : "Save Job"}
                >
                  <Heart className={`w-3.5 h-3.5 ${savedJobIds.includes(job.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Companies List Section */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
            Top Companies Hiring Now
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-sans">
            Direct pipelines with premium software conglomerates, collaborative ecosystems, and fintech leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCompanies.map((company) => (
            <div 
              key={company.id}
              onClick={() => {
                onSetSearchQuery(company.name);
                onSetFilterType('all');
                onNavigate('jobs');
              }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md transition cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-950 font-black text-xl text-white flex items-center justify-center shrink-0">
                {company.logo}
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition truncate font-sans text-base">
                    {company.name}
                  </h3>
                  <div className="flex items-center gap-0.5 text-amber-500 text-xs shrink-0">
                    ★ <span className="font-semibold text-slate-700">{company.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 truncate">{company.industry}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-sans font-medium">
                    {company.employees} staff
                  </span>
                  <span className="text-indigo-600 font-bold hover:underline shrink-0">
                    {company.openings} Open Roles →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

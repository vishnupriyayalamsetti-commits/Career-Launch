import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  CheckCircle2, 
  ShieldAlert,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

export default function ContactTab() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!userName.trim() || !userEmail.trim() || !message.trim()) {
      setErrorMsg('Please complete all mandatory fields (Name, Email, Message).');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setUserName('');
      setUserEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* Short introduction header */}
      <div className="text-center space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
          Connect with Coordination Services
        </h1>
        <p className="text-slate-500 text-sm sm:text-base font-sans">
          Our partner hiring board is ready to guide university counselors and fresh aspirants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left 1 Column: Standard Contact Details requested by User (email, phone, address) */}
        <aside className="md:col-span-1 space-y-6">
          
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider block font-mono">
              Contact Channels
            </h3>

            <div className="space-y-5">
              
              {/* Email channel */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Postal Mail</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 break-all">support@careerlaunch.com</p>
                  <p className="text-[10px] text-slate-400">Response within 24 hrs</p>
                </div>
              </div>

              {/* Phone channel */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Advisory Toll Free</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">+1 (800) 528-7244</p>
                  <p className="text-[10px] text-slate-400">Mon - Fri, 9 am - 6 pm</p>
                </div>
              </div>

              {/* Address channel */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Headquarters Location</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                    Suite 400, Innovation Hub,<br />
                    University District, NY 10003
                  </p>
                </div>
              </div>

            </div>

            <hr className="border-slate-100" />

            {/* Availability details */}
            <div className="flex gap-2 text-[10px] text-slate-400">
              <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>We remain closed on standard national university holiday schedules. Response times may extend slightly.</span>
            </div>
          </div>

          {/* Mini Help FAQ card */}
          <div className="bg-indigo-900 text-white rounded-2xl p-5 space-y-3 shadow-md border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-400" /> Quick Counsel advice
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you an institutional department head seeking pre-hiring integrations with your final-year batches? Let our coordinators schedule a private system alignment briefing session.
            </p>
          </div>

        </aside>

        {/* Right 2 Columns: Elegant interactive contact form */}
        <section className="md:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1 pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-base sm:text-lg font-sans flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" /> Submit Advisory Query
            </h3>
            <p className="text-slate-500 text-xs">Complete elements below, and our coordinator team will coordinate directly to your mailbox.</p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs flex gap-2 items-center">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {success && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex gap-2.5 items-start">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
              <div>
                <strong className="block font-bold">Query Logged Successfully!</strong>
                Our counselors have recorded your advisory submission details and will verify parameters.
              </div>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Your Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Vishnu"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Email Address</label>
                <input 
                  type="email" 
                  placeholder="e.g. username@gmail.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                />
              </div>

            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Select Subject Topic (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g. Campus Interview partnerships, corporate onboarding queries"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Your Message</label>
              <textarea 
                rows={5}
                placeholder="Please state details of your queries here. If you are an institutional lead, specify college name details directly."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
              />
            </div>

            <div className="pt-2 text-right">
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending Request...' : 'Send Advisor Message'}
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>
        </section>

      </div>
    </div>
  );
}

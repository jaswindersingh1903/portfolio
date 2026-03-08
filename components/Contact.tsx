import React, { useState } from 'react';
import { SOCIAL_LINKS, PROFILE } from '../constants';
import { Mail } from 'lucide-react';

const Contact: React.FC = () => {
  // Form State
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] -z-10"></div>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">

          {/* Text Side */}
          <div className="flex flex-col justify-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Let's build something <span className="text-gray-500">great.</span></h2>
              <p className="text-gray-400 text-lg mb-8">
                Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="flex items-center gap-3 text-gray-300 mb-8">
                <Mail className="w-5 h-5 text-gray-500" />
                <a href={`mailto:${PROFILE.email}`} className="hover:text-white transition-colors border-b border-transparent hover:border-gray-500">
                  {PROFILE.email}
                </a>
              </div>

              <div className="flex gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                     <span className="text-xs font-medium">{link.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full">
             <div className="rounded-xl border border-white/10 bg-zinc-900/30 overflow-hidden backdrop-blur-md p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Send a Message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-mono text-gray-500 uppercase">Name</label>
                    <input type="text" id="name" required className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/50 text-white focus:ring-1 focus:ring-white/20 focus:border-white/30 outline-none transition-all placeholder:text-zinc-700" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-mono text-gray-500 uppercase">Email</label>
                    <input type="email" id="email" required className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/50 text-white focus:ring-1 focus:ring-white/20 focus:border-white/30 outline-none transition-all placeholder:text-zinc-700" placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="message" className="text-xs font-mono text-gray-500 uppercase">Message</label>
                    <textarea id="message" required rows={4} className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black/50 text-white focus:ring-1 focus:ring-white/20 focus:border-white/30 outline-none transition-all resize-none placeholder:text-zinc-700" placeholder="Your message..." />
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus !== 'idle'}
                    className="w-full py-3 px-4 rounded-lg font-medium text-black bg-white hover:bg-gray-200 transition-colors disabled:opacity-50 mt-2"
                  >
                    {formStatus === 'submitting' ? 'Sending...' : formStatus === 'success' ? 'Sent' : 'Send Message'}
                  </button>
                </form>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

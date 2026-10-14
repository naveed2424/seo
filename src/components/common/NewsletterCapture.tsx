import React, { useState } from 'react';
import { Mail, Check, Sparkles, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NewsletterCaptureProps {
  variant?: 'inline' | 'card' | 'footer';
}

export const NewsletterCapture: React.FC<NewsletterCaptureProps> = ({ variant = 'card' }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubmitted(true);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 text-center space-y-2">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
          <Check className="h-5 w-5" />
        </div>
        <h4 className="text-sm font-bold text-emerald-950">You're in! Check your inbox.</h4>
        <p className="text-xs text-emerald-800">
          We sent your welcome issue with this week's top breakout AI tool and growth breakdown.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs text-center relative overflow-hidden">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-3">
        <Mail className="h-5 w-5" />
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
        One useful AI tool + one growth idea every week.
      </h3>
      <p className="mx-auto max-w-md text-xs sm:text-sm text-neutral-500 mt-2 mb-5 leading-relaxed">
        Join 18,000+ creators, builders, and solo entrepreneurs who rely on our zero-fluff weekly search &amp; AI breakdown. Free forever.
      </p>

      <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your best email address..."
          required
          className="w-full rounded-xl border border-neutral-300 bg-neutral-50/50 px-4 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:bg-white focus:outline-hidden"
        />
        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 active:scale-98 transition-all shrink-0"
        >
          Join Free
        </button>
      </form>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
        <Shield className="h-3 w-3" />
        <span>No spam. 1-click unsubscribe at any time.</span>
      </div>
    </div>
  );
};

'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // TODO: Implement newsletter signup API
    await new Promise(resolve => setTimeout(resolve, 1000));

    setStatus('success');
    setEmail('');

    setTimeout(() => {
      setStatus('idle');
    }, 3000);
  };

  return (
    <section className="my-20 lg:my-32">
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-32 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative px-6 sm:px-12 lg:px-20 py-16 lg:py-24">
          <div className="max-w-3xl">
            {/* Icon */}
            <div className="mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl lg:text-5xl font-black text-white mb-4">
              Never Miss a Story
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Get the latest articles on wellness, lifestyle, and tech delivered directly to your inbox. Join thousands of readers.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading'}
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>

            {/* Privacy notice */}
            <p className="mt-4 text-sm text-gray-400">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

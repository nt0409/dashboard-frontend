"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const base_url= process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setMessage(null);

  if (isSignUp) {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setMessage('Check your email for a confirmation link!');
  } else {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      // const response = await fetch("http://127.0.0.1:8000/login", {
      const response = await fetch(`${base_url}/login`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Login failed");
      }

      const result = await response.json();
      setMessage(result.message);
      localStorage.setItem("token", result.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  }

  setLoading(false);
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden bg-white">
        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-blue-500 text-white w-1/2 p-10 relative">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white bg-opacity-20 rounded-full p-4 mb-2 shadow-lg">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">AI Agent Gmail Automation Dashboard</h1>
            <p className="text-lg opacity-90 text-center max-w-xs">Monitor, manage, and automate your sales outreach, follow-ups, and tasks—all in one beautiful dashboard.</p>
            <ul className="mt-6 text-sm opacity-80 space-y-2">
              <li>✅ Secure Supabase Auth</li>
              <li>✅ Real-time Email & Task Tracking</li>
              <li>✅ Modern UI & Lightning Fast</li>
            </ul>
          </div>
          <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center opacity-70 text-xs">
            <span>Powered by Next.js, Supabase, and Shadcn UI</span>
          </div>
        </div>
        {/* Right Panel (Form) */}
        <div className="flex-1 flex flex-col justify-center p-8 sm:p-12">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-indigo-100 rounded-full p-3 mb-2 shadow">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-1 text-indigo-700">{isSignUp ? 'Create your account' : 'Sign in to your dashboard'}</h2>
            <p className="text-gray-500 text-sm">{isSignUp ? 'Start your journey with AI-powered outreach.' : 'Welcome back! Please enter your credentials.'}</p>
          </div>
          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
              <div className="text-xs text-gray-400 mt-1">{isSignUp ? 'Password must be at least 6 characters.' : 'Forgot your password? Use magic link (coming soon).'}</div>
            </div>
            {error && <div className="text-red-500 mb-2 text-sm text-center">{error}</div>}
            {message && <div className="text-green-600 mb-2 text-sm text-center">{message}</div>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 rounded-lg font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition"
              disabled={loading}
            >
              {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-indigo-600 hover:underline text-sm font-medium"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
          <div className="mt-8 text-xs text-gray-400 text-center">
            <span>{isSignUp ? 'Sign up to unlock all dashboard features.' : 'Sign in to access your AI-powered dashboard.'}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 
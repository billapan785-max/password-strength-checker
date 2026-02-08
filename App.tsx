import React, { useState, useEffect } from 'react';

// --- Types ---
interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  feedback: string[];
  crackTime: string;
}

interface GeneratorConfig {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

type AppView = 'home' | 'privacy' | 'terms' | 'contact';

// --- Utilities ---
const calculateStrength = (password: string): PasswordStrength => {
  if (!password) {
    return { score: 0, label: 'Empty', color: 'bg-slate-700', feedback: [], crackTime: '0 seconds' };
  }

  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  else feedback.push('Password is too short. Use at least 12 characters.');

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const diversityCount = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;
  
  if (diversityCount >= 3) score++;
  else feedback.push('Add numbers, symbols, or mixed case characters.');

  if (password.length >= 16 && diversityCount >= 3) score++;

  const charsetSize = (hasLower ? 26 : 0) + (hasUpper ? 26 : 0) + (hasNumber ? 10 : 0) + (hasSymbol ? 32 : 0);
  const entropy = Math.log2(Math.pow(charsetSize || 1, password.length));
  
  let crackTime = "Seconds";
  if (entropy > 100) crackTime = "Centuries";
  else if (entropy > 80) crackTime = "Years";
  else if (entropy > 60) crackTime = "Months";
  else if (entropy > 40) crackTime = "Days";
  else if (entropy > 20) crackTime = "Minutes";

  const strengths = [
    { label: 'Very Weak', color: 'bg-red-500' },
    { label: 'Weak', color: 'bg-orange-500' },
    { label: 'Moderate', color: 'bg-yellow-500' },
    { label: 'Strong', color: 'bg-emerald-500' },
    { label: 'Very Strong', color: 'bg-cyan-500' },
  ];

  const current = strengths[Math.min(score, 4)];

  return {
    score,
    label: current.label,
    color: current.color,
    feedback,
    crackTime
  };
};

const generatePassword = (config: GeneratorConfig): string => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let charset = '';
  if (config.includeUppercase) charset += upper;
  if (config.includeLowercase) charset += lower;
  if (config.includeNumbers) charset += numbers;
  if (config.includeSymbols) charset += symbols;

  if (charset === '') charset = lower;

  let password = '';
  const array = new Uint32Array(config.length);
  window.crypto.getRandomValues(array);

  for (let i = 0; i < config.length; i++) {
    password += charset.charAt(array[i] % charset.length);
  }

  return password;
};

// --- Sub-Components ---

const PasswordStrengthMeter = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState<PasswordStrength>(calculateStrength(''));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setStrength(calculateStrength(password));
  }, [password]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <div className="glass-card p-6 rounded-2xl w-full max-w-xl shadow-2xl transition-all hover:border-blue-500/30">
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-400 mb-2">Check Password Strength</label>
        <div className="relative">
          <input
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type a password..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all pr-24"
          />
          <div className="absolute right-2 top-1.5 flex gap-2">
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="p-1.5 text-slate-400 hover:text-white transition-colors text-sm font-medium"
            >
              {isVisible ? "Hide" : "Show"}
            </button>
            <button
              onClick={copyToClipboard}
              className="p-1.5 text-slate-400 hover:text-white transition-colors text-sm font-medium"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">Security Score</span>
          <span className={`text-sm font-bold ${strength.color.replace('bg-', 'text-')}`}>
            {strength.label}
          </span>
        </div>
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ease-out ${strength.color}`}
            style={{ width: `${Math.max((strength.score / 4) * 100, 5)}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-500 uppercase font-semibold">Time to Crack</p>
          <p className="text-lg font-bold text-slate-200">~ {strength.crackTime}</p>
        </div>
        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-500 uppercase font-semibold">Complexity</p>
          <p className="text-lg font-bold text-slate-200">{strength.score}/4 Bits</p>
        </div>
      </div>

      {strength.feedback.length > 0 && (
        <div className="mt-4 space-y-2">
          {strength.feedback.map((msg, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              {msg}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PasswordGenerator = () => {
  const [config, setConfig] = useState<GeneratorConfig>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });
  const [generated, setGenerated] = useState('');

  const handleGenerate = () => {
    setGenerated(generatePassword(config));
  };

  return (
    <div className="glass-card p-6 rounded-2xl w-full max-w-xl shadow-2xl transition-all hover:border-blue-500/30">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        Strong Password Generator
      </h2>

      <div className="mb-6">
        <label className="flex justify-between text-sm text-slate-400 mb-2">
          Password Length <span>{config.length} chars</span>
        </label>
        <input
          type="range"
          min="8"
          max="32"
          value={config.length}
          onChange={(e) => setConfig({ ...config, length: parseInt(e.target.value) })}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { key: 'includeUppercase', label: 'Uppercase' },
          { key: 'includeLowercase', label: 'Lowercase' },
          { key: 'includeNumbers', label: 'Numbers' },
          { key: 'includeSymbols', label: 'Symbols' },
        ].map((opt) => (
          <label key={opt.key} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              // Fix: Explicitly cast the value from GeneratorConfig to boolean as some properties are numbers (length)
              checked={config[opt.key as keyof GeneratorConfig] as boolean}
              onChange={(e) => setConfig({ ...config, [opt.key]: e.target.checked })}
              className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{opt.label}</span>
          </label>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all active:scale-[0.98] mb-4"
      >
        Generate New Password
      </button>

      {generated && (
        <div className="relative p-3 bg-slate-900 border border-slate-700 rounded-lg font-mono text-blue-400 break-all flex justify-between items-center">
          <span className="truncate mr-2">{generated}</span>
          <button 
            onClick={() => { navigator.clipboard.writeText(generated); alert('Copied!'); }}
            className="flex-shrink-0 text-xs text-blue-500 hover:text-white border border-blue-500/30 px-2 py-1 rounded transition-colors"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

const ContentSection = () => (
  <article className="max-w-4xl mx-auto mt-24 px-6 text-slate-300 leading-relaxed">
    <h2 className="text-3xl font-bold text-white mb-6">Why Password Security Matters in 2026</h2>
    <p className="mb-6">
      In the rapidly evolving digital landscape of 2026, your password remains the primary barrier between your sensitive data and malicious actors. With the rise of automated brute-force attacks and sophisticated phishing schemes, a "standard" password is no longer sufficient. Identity theft cost global consumers billions last year, highlighting the urgent need for robust security practices. Using a professional-grade password strength meter ensures you aren't leaving the door unlocked for cybercriminals.
    </p>

    <h2 className="text-2xl font-bold text-white mb-4">How to Create Unhackable Passwords</h2>
    <p className="mb-4">
      Creating a secure password involves more than just mixing characters. Experts recommend a minimum length of 16 characters to defeat modern computing power. Here are three key strategies:
    </p>
    <ul className="list-disc pl-6 mb-6 space-y-2">
      <li><strong>Maximum Length:</strong> Increase length over complexity. A 20-character sentence is harder to crack than an 8-character complex string.</li>
      <li><strong>Entropy Variance:</strong> Use a combination of random symbols, numbers, and casing to maximize mathematical entropy.</li>
      <li><strong>Unique Context:</strong> Never reuse passwords across platforms. If one site is breached, your entire digital identity is at risk.</li>
    </ul>
  </article>
);

const FAQSection = () => {
  const faqs = [
    {
      q: "What makes a password truly strong?",
      a: "A strong password is defined by its entropy. Ideally, it should be at least 16 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special symbols."
    },
    {
      q: "Is it safe to use an online password checker?",
      a: "Yes, SecureCheck AI performs all calculations locally in your browser. Your password is never sent to any server."
    }
  ];

  return (
    <section className="max-w-4xl mx-auto mt-20 mb-20 px-6">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="glass-card p-6 rounded-xl border border-slate-700/50">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">{faq.q}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- View Components ---

const PrivacyPolicyView = ({ onBack }: { onBack: () => void }) => (
  <div className="max-w-4xl mx-auto py-20 px-6 text-slate-300">
    <button onClick={onBack} className="mb-8 text-blue-500 hover:text-white flex items-center gap-2 transition-colors">
      &larr; Back to Home
    </button>
    <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
    <p className="mb-6">At SecureCheck AI, your security and privacy are our highest priorities. This Privacy Policy outlines how we handle data.</p>
    
    <h2 className="text-2xl font-bold text-white mb-4">1. Local Processing Only</h2>
    <p className="mb-6">The most important aspect of SecureCheck AI is that <strong>all processing happens locally in your browser</strong>. Your passwords are never transmitted to our servers or stored in any database. We use client-side JavaScript to perform entropy analysis and generation.</p>

    <h2 className="text-2xl font-bold text-white mb-4">2. Data Collection</h2>
    <p className="mb-6">We do not collect personal information. We do not use tracking cookies or analytics that identify you personally. We are committed to a zero-knowledge architecture.</p>

    <h2 className="text-2xl font-bold text-white mb-4">3. Security Standards</h2>
    <p className="mb-6">We follow industry-standard security protocols for password generation using the Web Crypto API, ensuring that generated passwords are cryptographically secure.</p>
    
    <p className="mt-12 text-sm text-slate-500 italic">Last Updated: February 2026</p>
  </div>
);

const TermsOfServiceView = ({ onBack }: { onBack: () => void }) => (
  <div className="max-w-4xl mx-auto py-20 px-6 text-slate-300">
    <button onClick={onBack} className="mb-8 text-blue-500 hover:text-white flex items-center gap-2 transition-colors">
      &larr; Back to Home
    </button>
    <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
    <p className="mb-6">By using SecureCheck AI, you agree to the following terms and conditions.</p>

    <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
    <p className="mb-6">Use of this tool constitutes acceptance of these terms. SecureCheck AI is provided "as is" without warranty of any kind.</p>

    <h2 className="text-2xl font-bold text-white mb-4">2. Purpose</h2>
    <p className="mb-6">This tool is for educational and security enhancement purposes. While we strive for maximum accuracy in our strength analysis, no tool can guarantee 100% protection against all cyber threats.</p>

    <h2 className="text-2xl font-bold text-white mb-4">3. Limitation of Liability</h2>
    <p className="mb-6">SecureCheck AI and its developers shall not be liable for any damages resulting from the use or inability to use this tool, or for any unauthorized access to your accounts resulting from password choices.</p>

    <p className="mt-12 text-sm text-slate-500 italic">Last Updated: February 2026</p>
  </div>
);

const ContactView = ({ onBack }: { onBack: () => void }) => (
  <div className="max-w-4xl mx-auto py-20 px-6 text-slate-300 text-center">
    <button onClick={onBack} className="mx-auto mb-12 text-blue-500 hover:text-white flex items-center gap-2 transition-colors">
      &larr; Back to Home
    </button>
    <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>
    <p className="text-lg mb-8 text-slate-400">Have questions, feedback, or security concerns? Get in touch with our team.</p>
    
    <div className="glass-card p-12 rounded-3xl inline-block max-w-lg w-full">
      <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Our Email</h2>
      <a 
        href="mailto:megadigital000004@gmail.com" 
        className="text-xl font-mono text-blue-400 hover:text-blue-300 transition-colors block mb-6 underline break-all"
      >
        megadigital000004@gmail.com
      </a>
      <button 
        onClick={() => { navigator.clipboard.writeText('megadigital000004@gmail.com'); alert('Email copied!'); }}
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-all"
      >
        Copy Email Address
      </button>
    </div>
  </div>
);

// --- Main App ---
const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header / Hero Section (Only in home) */}
      {view === 'home' && (
        <header className="relative py-20 px-6 overflow-hidden text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
          <div className="max-w-6xl mx-auto">
            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
              AI-Powered Security 2026
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Secure Password Strength <br /><span className="text-blue-500">Checker & Generator 2026</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12">
              Professional-grade encryption analysis and high-entropy generation.
              Ensure your digital identity is protected with the ultimate security toolkit.
            </p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start justify-center">
            <PasswordStrengthMeter />
            <PasswordGenerator />
          </div>
        </header>
      )}

      {/* Conditional Main View */}
      <main className="flex-grow">
        {view === 'home' && (
          <>
            <ContentSection />
            <FAQSection />
          </>
        )}
        {view === 'privacy' && <PrivacyPolicyView onBack={() => setView('home')} />}
        {view === 'terms' && <TermsOfServiceView onBack={() => setView('home')} />}
        {view === 'contact' && <ContactView onBack={() => setView('home')} />}
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div 
            onClick={() => setView('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white group-hover:bg-blue-500 transition-colors">S</div>
            <span className="text-xl font-bold text-white tracking-tight">SecureCheck <span className="text-blue-500">AI</span></span>
          </div>
          
          <nav className="flex gap-8 text-sm text-slate-500">
            <button onClick={() => setView('privacy')} className="hover:text-blue-500 transition-colors">Privacy Policy</button>
            <button onClick={() => setView('terms')} className="hover:text-blue-500 transition-colors">Terms of Service</button>
            <button onClick={() => setView('contact')} className="hover:text-blue-500 transition-colors">Contact Us</button>
          </nav>

          <div className="text-sm text-slate-600 text-center md:text-right">
            &copy; 2026 SecureCheck AI. <br className="md:hidden" /> All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
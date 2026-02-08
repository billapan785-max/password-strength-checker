
import React from 'react';
import PasswordStrengthMeter from './components/PasswordStrengthMeter';
import PasswordGenerator from './components/PasswordGenerator';
import ContentSection from './components/ContentSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header / Hero Section */}
      <header className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-6xl mx-auto text-center">
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

      {/* Main Content Area */}
      <main className="flex-grow">
        <ContentSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;

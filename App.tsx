
import React from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import FontGenerator from './components/FontGenerator';

/**
 * HOME COMPONENT
 * A simple landing page or placeholder.
 */
const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to SecureCheckAI Tools</h1>
        <p className="text-gray-600 mb-8">Select a tool to get started. Looking for cool text styles?</p>
        <Link 
          to="/fonts" 
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Go to Font Generator
        </Link>
      </div>
    </div>
  );
};

/**
 * MAIN APP COMPONENT
 * Uses HashRouter as requested by the environment constraints.
 */
function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Simple Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg shadow-inner"></div>
              <span className="font-bold text-xl text-gray-800 tracking-tight">SecureCheckAI</span>
            </Link>
            <div className="flex gap-6">
              <Link to="/" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Home</Link>
              <Link to="/fonts" className="text-purple-600 font-bold hover:text-purple-700 transition-colors">Fonts</Link>
            </div>
          </div>
        </nav>

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fonts" element={<FontGenerator />} />
          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;


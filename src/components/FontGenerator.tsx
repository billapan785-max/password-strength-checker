
import React, { useState, useEffect, useCallback } from 'react';
import { fontStyles } from '../services/fontStyles';
import { GeneratedResult } from '../types';

export const FontGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('Hello Instagram!');
  const [results, setResults] = useState<GeneratedResult[]>([]);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  useEffect(() => {
    const textToProcess = inputText.trim() === '' ? 'Type something...' : inputText;
    const generated = fontStyles.map(style => ({
      styleName: style.name,
      text: style.generate(textToProcess)
    }));
    setResults(generated);
  }, [inputText]);

  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus(id);
      setTimeout(() => setCopyStatus(null), 2000);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Instagram <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">Font Generator</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create stylish, cool, and fancy text for your Instagram bio, captions, and comments. Simply type your text below and copy your favorite style!
        </p>
      </header>

      <div className="sticky top-4 z-20 mb-10">
        <div className="relative group">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your text here..."
            className="w-full h-32 p-6 text-xl border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all resize-none shadow-sm group-hover:shadow-md"
          />
          <div className="absolute right-4 bottom-4 text-xs font-medium text-gray-400">
            {inputText.length} characters
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((result, index) => (
          <div 
            key={index} 
            className="group bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                {result.styleName}
              </div>
              <div className="text-2xl text-gray-800 break-words mb-4 min-h-[1.5em]">
                {result.text}
              </div>
            </div>
            <button
              onClick={() => handleCopy(result.text, `${index}`)}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                copyStatus === `${index}`
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-50 text-gray-700 hover:bg-purple-600 hover:text-white'
              }`}
            >
              {copyStatus === `${index}` ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Text
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      <footer className="mt-20 border-t border-gray-200 pt-10 text-center text-gray-500 text-sm">
        <p>© 2024 SecureCheckAI Font Tool. All rights reserved.</p>
        <p className="mt-2">Use these fonts on Instagram, TikTok, Facebook, Twitter, and more!</p>
      </footer>
    </div>
  );
};

export default FontGenerator;

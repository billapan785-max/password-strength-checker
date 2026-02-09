import React, { useState, useEffect } from 'react'; import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom'; import { fontStyles } from './services/fontStyles';

const FontGenerator = () => { const [inputText, setInputText] = useState('Hello Instagram!'); const [results, setResults] = useState([]); const [copyStatus, setCopyStatus] = useState(null);

useEffect(() => { const textToProcess = inputText.trim() === '' ? 'Type something...' : inputText; const generated = fontStyles.map(style => ({ styleName: style.name, text: style.generate(textToProcess) })); setResults(generated); }, [inputText]);

const handleCopy = (text, id) => { navigator.clipboard.writeText(text).then(() => { setCopyStatus(id); setTimeout(() => setCopyStatus(null), 2000); }); };

return ( <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}> <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Stylish Fonts</h1> <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} style={{ width: '100%', height: '100px', padding: '15px', borderRadius: '10px', border: '2px solid #ddd' }} placeholder="Type here..." /> <div style={{ marginTop: '30px', display: 'grid', gap: '15px' }}> {results.map((res, i) => ( <div key={i} style={{ padding: '20px', background: '#f9f9f9', borderRadius: '10px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> <span style={{ fontSize: '1.2rem' }}>{res.text}</span> <button onClick={() => handleCopy(res.text, i)} style={{ padding: '10px 20px', background: '#6b46c1', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}> {copyStatus === i ? 'Copied!' : 'Copy'} </button> </div> ))} </div> </div> ); };

const Home = () => (

<div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> <h1>Welcome to SecureCheckAI Tools</h1> <Link to="/fonts" style={{ padding: '15px 30px', background: 'linear-gradient(to right, #6b46c1, #d53f8c)', color: 'white', textDecoration: 'none', borderRadius: '50px', fontWeight: 'bold' }}> Go to Font Generator </Link> </div> );

export default function App() { return ( <HashRouter> <Routes> <Route path="/" element={<Home />} /> <Route path="/fonts" element={<FontGenerator />} /> <Route path="*" element={<Navigate to="/" />} /> </Routes> </HashRouter> ); }

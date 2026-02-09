import React, { useState, useEffect } from 'react'; import { fontStyles } from './services/fontStyles';

export default function App() { const [inputText, setInputText] = useState('Hello Instagram!'); const [results, setResults] = useState([]); const [copyStatus, setCopyStatus] = useState(null);

useEffect(() => { const textToProcess = inputText.trim() === '' ? 'Type something...' : inputText; const generated = fontStyles.map(style => ({ styleName: style.name, text: style.generate(textToProcess) })); setResults(generated); }, [inputText]);

const handleCopy = (text, id) => { navigator.clipboard.writeText(text).then(() => { setCopyStatus(id); setTimeout(() => setCopyStatus(null), 2000); }); };

return ( <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}> <h1 style={{ fontSize: '2.5rem', color: '#6b46c1' }}>Stylish Font Generator</h1> <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} style={{ width: '100%', height: '100px', padding: '15px', borderRadius: '15px', border: '2px solid #ddd', fontSize: '1.2rem' }} placeholder="Type your text here..." /> <div style={{ marginTop: '30px', display: 'grid', gap: '15px' }}> {results.map((res, i) => ( <div key={i} style={{ padding: '20px', background: '#f9f9f9', borderRadius: '12px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> <span style={{ fontSize: '1.3rem' }}>{res.text}</span> <button onClick={() => handleCopy(res.text, i)} style={{ padding: '10px 20px', background: '#6b46c1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}> {copyStatus === i ? 'Copied!' : 'Copy'} </button> </div> ))} </div> </div> ); }

import React from 'react';
import { createRoot } from 'react-dom/client';
import data from './data';
import AnimalCard from './AnimalCard';
import './index.css';

function App() {
  const showAdditional = (additional) => {
    const details = Object.entries(additional)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    window.alert(details);
  };

  return (
    <main className="page">
      <h1>Animal Cards - PropTypes Demo</h1>
      <div className="grid">
        {data.map((animal) => (
          <AnimalCard key={animal.name} {...animal} showAdditional={showAdditional} />
        ))}
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);

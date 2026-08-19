import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const RenderAndCommitDemo = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);

  return (
    <div className="container">
      <h1>Render and Commit Demo</h1>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
      <p className="hint">Clicking the button updates state, causing React to render and commit the necessary DOM change.</p>
    </div>
  );
};

function App() {
  return <React.StrictMode><RenderAndCommitDemo /></React.StrictMode>;
}

createRoot(document.getElementById('root')).render(<App />);

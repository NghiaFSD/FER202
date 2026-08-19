import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const SnapshotDemo = () => {
  const [count, setCount] = useState(0);
  const [snapshot, setSnapshot] = useState(null);

  const handleIncrement = () => setCount(count + 1);
  const handleSnapshot = () => setSnapshot(count);
  const handleRestore = () => {
    if (snapshot !== null) setCount(snapshot);
  };

  return (
    <div className="container">
      <h1>State as a Snapshot Demo</h1>
      <p className="count">Count: {count}</p>
      <p>Snapshot: {snapshot === null ? 'None' : snapshot}</p>
      <div className="actions">
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleSnapshot}>Take Snapshot</button>
        <button onClick={handleRestore}>Restore Snapshot</button>
      </div>
    </div>
  );
};

function App() {
  return <React.StrictMode><SnapshotDemo /></React.StrictMode>;
}

createRoot(document.getElementById('root')).render(<App />);

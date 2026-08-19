import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const EventHandlingDemo = () => {
  const [count, setCount] = useState(0);

  const handleButtonClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="container">
      <h1>Event Handling Demo</h1>
      <p>Count: {count}</p>
      <button onClick={handleButtonClick}>Increase Count</button>
    </div>
  );
};

const App = () => (
  <div>
    <EventHandlingDemo />
  </div>
);

createRoot(document.getElementById('root')).render(<App />);

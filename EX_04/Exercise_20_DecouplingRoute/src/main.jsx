import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, NavLink } from 'react-router-dom';
import { renderRoutes } from './routes';
import './index.css';

const NavigationMenu = () => (
  <nav>
    {['/', '/products', '/about', '/contact', '/users/1'].map((path, i) => (
      <NavLink key={path} to={path}>{['Home','Products','About','Contact','User 1'][i]}</NavLink>
    ))}
  </nav>
);

const App = () => (
  <Router>
    <NavigationMenu />
    <main><Routes>{renderRoutes()}</Routes></main>
  </Router>
);

createRoot(document.getElementById('root')).render(<App />);

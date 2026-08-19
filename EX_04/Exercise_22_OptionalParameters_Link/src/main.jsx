import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const Home = () => <div className="text-center"><h2>Home Component</h2></div>;
const About = () => <div className="text-center"><h2>About Component</h2></div>;
const Contact = () => <div className="text-center"><h2>Contact Component</h2></div>;
const Profile = () => { const { userId } = useParams(); return <div className="text-center"><h2>Profile Component</h2><p>User ID: {userId ?? 'not provided'}</p></div>; };

const CustomNavbar = () => (
  <nav className="navbar navbar-dark bg-dark navbar-expand-md px-3">
    <Link className="navbar-brand" to="/">Logo</Link>
    <div className="navbar-nav">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/about">About</Link>
      <Link className="nav-link" to="/contact">Contact</Link>
      <Link className="nav-link" to="/profile">Profile</Link>
      <Link className="nav-link" to="/profile/123">Profile 123</Link>
    </div>
  </nav>
);

const App = () => <Router><CustomNavbar/><Routes>
  <Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/>
  <Route path="/profile" element={<Profile/>}/><Route path="/profile/:userId" element={<Profile/>}/>
</Routes></Router>;

createRoot(document.getElementById('root')).render(<App/>);

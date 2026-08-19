import React from 'react';
import { Route } from 'react-router-dom';

const Home = () => <h1>Home Page</h1>;
const Products = () => <h1>Products Page</h1>;
const About = () => <h1>About Page</h1>;
const Contact = () => <h1>Contact Page</h1>;
const UserProfile = () => {
  const userId = window.location.pathname.split('/')[2];
  return <h1>User Profile: {userId || 'Guest'}</h1>;
};

export const routes = [
  { path: '/', element: <Home /> },
  { path: '/products', element: <Products /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/users/:userId', element: <UserProfile /> }
];

export const renderRoutes = () =>
  routes.map((route) => <Route key={route.path} path={route.path} element={route.element} />);

import React, { Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { fetchUser, fetchPost } from './api';
import './index.css';

const User = React.lazy(() => import('./User'));
const Post = React.lazy(() => import('./Post'));

const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      Promise.all([1,2,3,4,5].map(fetchUser)),
      Promise.all([1,2,3,4,5].map(fetchPost))
    ]).then(([u,p]) => { setUsers(u); setPosts(p); }).catch(e => setError(e.message));
  }, []);

  if (error) return <p className="error">{error}</p>;

  return <main>
    <h1>Lazy Loading Demo</h1>
    <Suspense fallback={<div>Loading components...</div>}>
      <section><h2>Users</h2>{users.map(user => <User key={user.id} user={user}/>)}</section>
      <section><h2>Posts</h2>{posts.map(post => <Post key={post.id} post={post}/>)}</section>
    </Suspense>
  </main>;
};

createRoot(document.getElementById('root')).render(<App/>);

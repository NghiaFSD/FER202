import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { users, dishes } from './data';
import './index.css';

function UserList(){return <section><h2>Users</h2>{users.map(u=><p key={u.id}><Link to={`/users/${u.id}`}>User ID {u.id}</Link> - {u.firstName} {u.lastName}</p>)}</section>}
function UserDetail(){const {id}=useParams();const u=users.find(x=>x.id===Number(id));return <section><Link to="/users">← Users</Link>{u?<><h2>{u.firstName} {u.lastName}</h2><p>Age: {u.age}</p></>:<p>User not found</p>}</section>}
function DishList(){return <section><h2>Dishes</h2>{dishes.map(d=><p key={d.id}><Link to={`/dishes/${d.id}`}>Dish ID {d.id}</Link> - {d.name} - ${d.price}</p>)}</section>}
function DishDetail(){const {id}=useParams();const d=dishes.find(x=>x.id===Number(id));return <section><Link to="/dishes">← Dishes</Link>{d?<><h2>{d.name}</h2><p>Category: {d.category}</p><p>Label: {d.label || 'None'}</p><p>Price: ${d.price}</p><p>{d.description}</p></>:<p>Dish not found</p>}</section>}

function App(){
 return <BrowserRouter><nav><Link to="/users">Users</Link><Link to="/dishes">Dishes</Link></nav><main><Routes>
  <Route path="/users" element={<UserList/>}/><Route path="/users/:id" element={<UserDetail/>}/>
  <Route path="/dishes" element={<DishList/>}/><Route path="/dishes/:id" element={<DishDetail/>}/>
  <Route path="*" element={<UserList/>}/>
 </Routes></main></BrowserRouter>
}
createRoot(document.getElementById('root')).render(<App/>);

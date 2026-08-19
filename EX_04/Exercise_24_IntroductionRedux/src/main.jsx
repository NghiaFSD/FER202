import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import './index.css';

const products = [
 {id:'123456',name:'Example Product',price:9.99,description:'This is an example product.',catalogs:['catalog1','catalog2']},
 {id:'123457',name:'React Book',price:19.99,description:'A practical React book.',catalogs:['books']},
 {id:'123458',name:'Keyboard',price:29.99,description:'Mechanical keyboard.',catalogs:['hardware']}
];

function ProductList(){
 const dispatch=useDispatch();
 return <section><h2>Products</h2>{products.map(p=><article key={p.id}><h3>{p.name}</h3><p>${p.price.toFixed(2)}</p><p>{p.description}</p><button onClick={()=>dispatch({type:'ADD_TO_CART',payload:p})}>Add to Cart</button></article>)}</section>;
}
function Cart(){
 const cart=useSelector(s=>s.cart);const dispatch=useDispatch();
 const total=cart.reduce((sum,p)=>sum+p.price*p.quantity,0);
 return <aside><h2>Cart</h2>{cart.length===0?<p>Cart is empty.</p>:cart.map(p=><div className="cart" key={p.id}><b>{p.name}</b><input type="number" min="1" value={p.quantity} onChange={e=>dispatch({type:'UPDATE_TO_CART',payload:{id:p.id,quantity:Number(e.target.value)}})}/><button onClick={()=>dispatch({type:'DELETE_TO_CART',payload:p.id})}>Delete</button></div>)}<h3>Total: ${total.toFixed(2)}</h3></aside>;
}
function App(){return <main><h1>Redux Shopping Cart</h1><div className="layout"><ProductList/><Cart/></div></main>}
createRoot(document.getElementById('root')).render(<Provider store={store}><App/></Provider>);

import React,{useState} from 'react';
import {useDispatch} from 'react-redux';

export default function ProductForm(){
 const [name,setName]=useState('');const [price,setPrice]=useState('');
 const dispatch=useDispatch();
 const submit=e=>{e.preventDefault();if(!name||!price)return;dispatch({type:'ADD_TO_CART',payload:{id:`local-${Date.now()}`,title:name,price:Number(price),description:'Product created with ProductForm'}});setName('');setPrice('');};
 return <form onSubmit={submit} className="card p-3"><h2>Product Form</h2><input className="form-control mb-2" placeholder="Product name" value={name} onChange={e=>setName(e.target.value)}/><input className="form-control mb-2" type="number" min="0" step="0.01" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)}/><button className="btn btn-primary">Add New Product</button></form>;
}

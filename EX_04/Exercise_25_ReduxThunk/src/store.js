import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const initialState = { products: [], cart: [], loading: false, error: '' };

function shopReducer(state=initialState, action){
 switch(action.type){
  case 'LOAD_PRODUCTS_START': return {...state,loading:true,error:''};
  case 'LOAD_PRODUCTS_SUCCESS': return {...state,loading:false,products:action.payload};
  case 'LOAD_PRODUCTS_ERROR': return {...state,loading:false,error:action.payload};
  case 'ADD_TO_CART': {
    const existing=state.cart.find(p=>p.id===action.payload.id);
    return {...state,cart:existing?state.cart.map(p=>p.id===action.payload.id?{...p,quantity:p.quantity+1}:p):[...state.cart,{...action.payload,quantity:1}]};
  }
  case 'DELETE_FROM_CART': return {...state,cart:state.cart.filter(p=>p.id!==action.payload)};
  default:return state;
 }
}

export const loadProducts = () => async dispatch => {
 dispatch({type:'LOAD_PRODUCTS_START'});
 try{
  await new Promise(r=>setTimeout(r,500));
  const response=await fetch('https://fakestoreapi.com/products?limit=6');
  if(!response.ok) throw new Error('Cannot load products');
  const products=await response.json();
  dispatch({type:'LOAD_PRODUCTS_SUCCESS',payload:products.map(p=>({...p,catalogs:['api']}))});
 }catch(error){dispatch({type:'LOAD_PRODUCTS_ERROR',payload:error.message});}
};

export const store=createStore(combineReducers({shop:shopReducer}),applyMiddleware(thunk));

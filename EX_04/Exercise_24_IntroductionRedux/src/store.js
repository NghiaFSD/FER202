import { createStore } from 'redux';

const initialState = { cart: [] };

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(p => p.id === action.payload.id);
      return { ...state, cart: existing
        ? state.cart.map(p => p.id === action.payload.id ? {...p, quantity:p.quantity+1} : p)
        : [...state.cart, {...action.payload, quantity:1}]
      };
    }
    case 'UPDATE_TO_CART':
      return { ...state, cart: state.cart.map(p => p.id === action.payload.id ? {...p, quantity: Math.max(1, action.payload.quantity)} : p) };
    case 'DELETE_TO_CART':
      return { ...state, cart: state.cart.filter(p => p.id !== action.payload) };
    default:
      return state;
  }
}
export const store = createStore(cartReducer);

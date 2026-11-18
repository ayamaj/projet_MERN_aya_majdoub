
import { createSlice } from '@reduxjs/toolkit';

// Chargement du panier depuis localStorage
const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem('techstore_cart')) || [];
  } catch {
    return [];
  }
};

const initialItems = loadCart();

const initialState = {
  items: initialItems,
  totalCount: initialItems.reduce(
    (sum, item) => sum + item.quantity, 0
  ),
  totalPrice: initialItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  ),
  discountPercent: 0
};

// Recalcul des totaux
const recalculateTotals = (state) => {

  state.totalCount = state.items.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  state.totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  // Sauvegarde automatique
  localStorage.setItem(
    'techstore_cart',
    JSON.stringify(state.items)
  );

};

export const cartSlice = createSlice({

  name: 'cart',

  initialState,

  reducers: {

    addItem: (state, action) => {

      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1
        });
      }

      recalculateTotals(state);

    },

    removeItem: (state, action) => {

      const existing = state.items.find(
        (item) => item.id === action.payload
      );

      if (existing) {

        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }

      }

      recalculateTotals(state);

    },

    clearCart: (state) => {

      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
      state.discountPercent = 0;

      localStorage.setItem(
        'techstore_cart',
        JSON.stringify(state.items)
      );

    },

    // Defi 2 : Code promo
    applyPromoCode: (state, action) => {

      if (action.payload === 'POLY2027') {
        state.discountPercent = 20;
      } else {
        state.discountPercent = 0;
      }

    }

  }

});

export const {
  addItem,
  removeItem,
  clearCart,
  applyPromoCode
} = cartSlice.actions;

export default cartSlice.reducer;

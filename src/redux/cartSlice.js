import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: localStorage.getItem("CART")
      ? JSON.parse(localStorage.getItem("CART"))
      : [],
  },
  reducers: {
    addToCart: (state, action) => {
      let { cartObj } = action.payload;
      state.cart = [cartObj, ...state.cart];
      localStorage.setItem("CART", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      let { id } = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
      localStorage.setItem("CART", JSON.stringify(state.cart));
    },
    changeQuantity: (state, action) => {
      let { id, quantity } = action.payload;
      let index = state.cart.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.cart[index].qty = quantity;
        localStorage.setItem("CART", JSON.stringify(state.cart));
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity,clearCart  } = cartSlice.actions;
export default cartSlice.reducer;

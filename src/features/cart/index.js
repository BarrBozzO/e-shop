// import { useState } from "react";
// import Cart from "./Cart";

// const initCart = () => {
//   const cart = new Cart();

//   return () => {
//     const [cartItem, setCartItem] = useState(0);

//     const getCartItem = (id) => {
//       return cart.get(id);
//     };

//     const deleteFromCart = (productId) => {
//       cart.remove(productId);
//       setCartItem(cartItem + 1);
//     };

//     const addToCart = (productId) => {
//       cart.add(productId);
//       setCartItem(cartItem + 1);
//     };

//     const getIds = () => {
//       const items = cart.get();
//       const result = [];

//       for (const item of items) {
//         result.push(item[0]);
//       }

//       return result;
//     };

//     const getCount = () => {
//       return cart.getSize();
//     };

//     return { addToCart, getCartItem, getIds, deleteFromCart, getCount };
//   };
// };

// initCart();
export const useCart = {};

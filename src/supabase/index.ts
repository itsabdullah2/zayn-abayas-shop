import { supabase } from "./client";

import { signInWithPassword } from "./auth/signIn";
import { signUpWithEmail } from "./auth/signUp";
import { signOut } from "./auth/signOut";
import { signInWithOAuth } from "./auth/OAuth";

import { getReviews } from "./db/reviews";
import { addReview } from "./db/reviews";
import { updateReview } from "./db/reviews";

import { getProducts } from "./db/products";
import { getVariants } from "./db/products";
import { getColors } from "./db/products";
import { getSizes } from "./db/products";

import { clearCart } from "./db/cart";

import { createOrder } from "./db/orders";
import { updateOrderStatus } from "./db/orders";
import { cancelOrder } from "./db/orders";
import { getUserOrders } from "./db/orders";

export {
  supabase,
  signInWithPassword,
  signUpWithEmail,
  signInWithOAuth,
  signOut,
  //
  getReviews,
  addReview,
  updateReview,
  //
  getProducts,
  getVariants,
  getColors,
  getSizes,
  //
  clearCart,
  //
  createOrder,
  getUserOrders,
  updateOrderStatus,
  cancelOrder,
};

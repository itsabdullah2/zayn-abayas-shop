import { supabase } from "./client";

import { signInWithPassword } from "./auth/signIn";
import { signUpWithEmail } from "./auth/signUp";
import { signOut } from "./auth/signOut";
import { signInWithOAuth } from "./auth/OAuth";

import { getReviews, addReview, updateReview } from "./db/reviews";

import { getProducts, getVariants, getColors, getSizes } from "./db/products";

import { clearCart } from "./db/cart";

import {
  createOrder,
  updateOrderStatus,
  cancelOrder,
  getUserOrders,
} from "./db/orders";

import { getReturnFeedback, createReturnFeedback } from "./db/returnFeedback";

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
  //
  getReturnFeedback,
  createReturnFeedback,
};

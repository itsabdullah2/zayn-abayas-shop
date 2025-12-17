import { supabase } from "./client";

import { signInWithPassword } from "./auth/signIn";
import { signUpWithEmail } from "./auth/signUp";
import { signOut } from "./auth/signOut";
import { signInWithOAuth } from "./auth/OAuth";

import { getReviews, addReview, updateReview } from "./db/reviews";

import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "./db/products";

import {
  clearCart,
  getCartItems,
  createCartItem,
  removeItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} from "./db/cart";

import {
  createOrder,
  updateOrderStatus,
  cancelOrder,
  getUserOrders,
} from "./db/orders";

import { getReturnFeedback, createReturnFeedback } from "./db/returnFeedback";

import {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotifications,
} from "./db/notifications";

import {
  getVariants,
  getColors,
  getSizes,
  updateVariant,
  deleteVariants,
  addVariants,
} from "./db/variants";
import { addNewCategory, getCategories } from "./db/categories";

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
  addProduct,
  deleteProduct,
  updateProduct,
  //
  clearCart,
  getCartItems,
  createCartItem,
  removeItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  //
  createOrder,
  getUserOrders,
  updateOrderStatus,
  cancelOrder,
  //
  getReturnFeedback,
  createReturnFeedback,
  //
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotifications,
  //
  getVariants,
  getColors,
  getSizes,
  updateVariant,
  deleteVariants,
  addVariants,
  //
  getCategories,
  addNewCategory,
};

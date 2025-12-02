// store/useStore.ts
import { create } from "zustand";

import axios from "axios";

type UserSummary = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  phone?: string;
  company?: any;
};

type ProductSummary = {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
};

type Store = {
  token: string | null;
  setToken: (t: string | null) => void;

  users: Record<string, any>; // cache by "limit:skip:query"
  fetchUsers: (opts: { limit?: number; skip?: number; q?: string }) => Promise<any>;
  fetchUserById: (id: number) => Promise<any>;

  products: Record<string, any>; // cache
  fetchProducts: (opts: { limit?: number; skip?: number; q?: string; category?: string }) => Promise<any>;
  fetchProductById: (id: number) => Promise<any>;
};

export const useStore = create<Store>((set, get) => ({
  token: null,
  setToken: (t) => set({ token: t }),

  users: {},
  fetchUsers: async ({ limit = 10, skip = 0, q = "" }) => {
    const key = `${limit}:${skip}:${q}`;
    const cache = get().users[key];
    if (cache) return cache; // simple cache

    try {
      const url = q
        ? `https://dummyjson.com/users/search?q=${encodeURIComponent(q)}`
        : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
      const res = await axios.get(url);
      set((s) => ({ users: { ...s.users, [key]: res.data } }));
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  fetchUserById: async (id) => {
    const key = `user:${id}`;
    const cache = get().users[key];
    if (cache) return cache;
    try {
      const res = await axios.get(`https://dummyjson.com/users/${id}`);
      set((s) => ({ users: { ...s.users, [key]: res.data } }));
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  products: {},
  fetchProducts: async ({ limit = 10, skip = 0, q = "", category }) => {
    const key = `${limit}:${skip}:${q}:${category || ""}`;
    const cache = get().products[key];
    if (cache) return cache;

    try {
      let url = "";
      if (q) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`;
      } else if (category) {
        url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
      } else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      }
      const res = await axios.get(url);
      set((s) => ({ products: { ...s.products, [key]: res.data } }));
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  fetchProductById: async (id) => {
    const key = `product:${id}`;
    const cache = get().products[key];
    if (cache) return cache;
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      set((s) => ({ products: { ...s.products, [key]: res.data } }));
      return res.data;
    } catch (err) {
      throw err;
    }
  }
}));

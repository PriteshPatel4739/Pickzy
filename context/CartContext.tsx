'use client';

import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import type { Product } from '@/types';

export type CartItem = { id: number; qty: number; title: string; price: number; image: string };

type State = { items: CartItem[] };

type Action =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; id: number }
  | { type: 'SET'; items: CartItem[] };

const CartContext = createContext<{
  state: State;
  add: (p: Product, qty?: number) => void;
  remove: (id: number) => void;
  count: number;
} | null>(null);

const STORAGE_KEY = 'myshop.cart.v1';

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET':
      return { items: action.items };
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map(i => (i.id === action.item.id ? { ...i, qty: i.qty + (action.item.qty || 1) } : i)),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.id !== action.id) };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (raw) dispatch({ type: 'SET', items: JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if(state?.items.length > 0){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      }
    } catch {}
  }, [state.items]);

  const add = (p: Product, qty: number = 1) =>
    dispatch({ type: 'ADD', item: { id: p.id, qty, title: p.title, price: p.price, image: p.image } });

  const remove = (id: number) => dispatch({ type: 'REMOVE', id });

  const count = useMemo(() => state.items.reduce((s, i) => s + i.qty, 0), [state.items]);

  return (
    <CartContext.Provider value={{ state, add, remove, count }}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
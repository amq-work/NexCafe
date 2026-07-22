import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CART_KEY = 'nexcafe_cart';

let listeners: (() => void)[] = [];

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Error saving cart', e);
  }
  listeners.forEach((listener) => listener());
}

export function addToCart(item: Omit<CartItem, 'quantity'>) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart(cart);
}

export function removeFromCart(id: string) {
  const cart = getCart();
  const filtered = cart.filter((i) => i.id !== id);
  saveCart(filtered);
}

export function updateQuantity(id: string, quantity: number) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === id);
  if (existing) {
    existing.quantity = Math.max(1, quantity);
    saveCart(cart);
  }
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount(): number {
  return getCart().reduce((acc, item) => acc + item.quantity, 0);
}

export function getCartTotal(): number {
  return getCart().reduce((acc, item) => acc + item.price * item.quantity, 0);
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(getCart());

  useEffect(() => {
    const handleUpdate = () => {
      setCart(getCart());
    };
    listeners.push(handleUpdate);
    // Trigger once initially
    handleUpdate();
    return () => {
      listeners = listeners.filter((l) => l !== handleUpdate);
    };
  }, []);

  return {
    cart,
    count: cart.reduce((acc, item) => acc + item.quantity, 0),
    total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}

let isDrawerOpen = false;
let drawerListeners: ((isOpen: boolean) => void)[] = [];

export function isCartOpen(): boolean {
  return isDrawerOpen;
}

export function setCartOpen(open: boolean) {
  isDrawerOpen = open;
  drawerListeners.forEach((l) => l(open));
}

export function useCartDrawer() {
  const [isOpen, setIsOpen] = useState(isDrawerOpen);
  useEffect(() => {
    const handleToggle = (open: boolean) => {
      setIsOpen(open);
    };
    drawerListeners.push(handleToggle);
    return () => {
      drawerListeners = drawerListeners.filter((l) => l !== handleToggle);
    };
  }, []);
  return { isOpen, openCart: () => setCartOpen(true), closeCart: () => setCartOpen(false) };
}

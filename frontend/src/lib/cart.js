"use client";

import { useEffect, useState } from "react";

/* ============================================================
   CART STORE — localStorage-backed, shared across every page.
   Items: { id, slug, name, brand, img, price (number), qty }.
   Selection for checkout is tracked as a "deselected" id list —
   items are selected by default, unchecking adds them here.
   ============================================================ */
const CART_KEY = "lennie_cart_v1";
const DESELECTED_KEY = "lennie_cart_deselected_v1";

export const vnd = (n) => (n || 0).toLocaleString("vi-VN") + "₫";

function readCart() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {}
  window.dispatchEvent(new CustomEvent("lennie-cart-change"));
}

function readDeselected() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(DESELECTED_KEY)) || [];
  } catch {
    return [];
  }
}

function writeDeselected(ids) {
  try {
    localStorage.setItem(DESELECTED_KEY, JSON.stringify(ids));
  } catch {}
  window.dispatchEvent(new CustomEvent("lennie-cart-change"));
}

export const CartStore = {
  get: readCart,
  add(p, qty = 1) {
    if (!p) return;
    const price = typeof p.price === "number" ? p.price : parseInt(String(p.price || "").replace(/[^\d]/g, ""), 10) || 0;
    const items = readCart();
    const existing = items.find((i) => i.id === p.id);
    if (existing) existing.qty += qty;
    else items.push({ id: p.id, slug: p.slug || "", name: p.name, brand: p.brand || "", img: p.img, price, qty });
    writeCart(items);
  },
  setQty(id, qty) {
    let items = readCart();
    if (qty <= 0) {
      items = items.filter((i) => i.id !== id);
      writeDeselected(readDeselected().filter((x) => x !== id));
    } else {
      const existing = items.find((i) => i.id === id);
      if (existing) existing.qty = qty;
    }
    writeCart(items);
  },
  remove(id) {
    writeCart(readCart().filter((i) => i.id !== id));
    writeDeselected(readDeselected().filter((x) => x !== id));
  },
  removeMany(ids) {
    writeCart(readCart().filter((i) => !ids.includes(i.id)));
    writeDeselected(readDeselected().filter((x) => !ids.includes(x)));
  },
  clear() {
    writeCart([]);
    writeDeselected([]);
  },
  toggleSelect(id) {
    const d = readDeselected();
    writeDeselected(d.includes(id) ? d.filter((x) => x !== id) : [...d, id]);
  },
  selectAll() {
    writeDeselected([]);
  },
  deselectAll() {
    writeDeselected(readCart().map((i) => i.id));
  },
};

export function useCart() {
  const [items, setItems] = useState([]);
  const [deselected, setDeselected] = useState([]);

  useEffect(() => {
    const sync = () => {
      setItems(readCart());
      setDeselected(readDeselected());
    };
    sync();
    window.addEventListener("lennie-cart-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("lennie-cart-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  const isSelected = (id) => !deselected.includes(id);
  const selectedItems = items.filter((i) => isSelected(i.id));
  const selectedCount = selectedItems.reduce((s, i) => s + i.qty, 0);
  const selectedSubtotal = selectedItems.reduce((s, i) => s + i.price * i.qty, 0);
  const allSelected = items.length > 0 && selectedItems.length === items.length;

  return {
    items,
    count,
    subtotal,
    isSelected,
    selectedItems,
    selectedCount,
    selectedSubtotal,
    allSelected,
    toggleSelect: CartStore.toggleSelect,
    selectAll: CartStore.selectAll,
    deselectAll: CartStore.deselectAll,
    add: CartStore.add,
    setQty: CartStore.setQty,
    remove: CartStore.remove,
    removeMany: CartStore.removeMany,
    clear: CartStore.clear,
  };
}

export const openCartDrawer = () => window.dispatchEvent(new CustomEvent("lennie-open-cart"));

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore, CartItem } from '@/types/cart';

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      isAddedModalOpen: false,
      lastAddedItem: null,
      currency: 'NGN',

      addItem: (item) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) =>
              i.productId === item.productId &&
              i.selectedColor === item.selectedColor &&
              i.selectedSize === item.selectedSize &&
              i.selectedFinish === item.selectedFinish &&
              i.decorationMethod === item.decorationMethod
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            const currentItem = updatedItems[existingIndex];
            const newQty = currentItem.quantity + item.quantity;
            const updatedItem: CartItem = {
              ...currentItem,
              quantity: newQty,
              totalPrice: currentItem.unitPrice * newQty,
            };
            updatedItems[existingIndex] = updatedItem;
            return { 
              items: updatedItems, 
              isAddedModalOpen: true, 
              lastAddedItem: updatedItem,
              isOpen: false 
            };
          }

          const newItem: CartItem = {
            ...item,
            id: `${item.productId}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            totalPrice: item.unitPrice * item.quantity,
          };

          return { 
            items: [...state.items, newItem], 
            isAddedModalOpen: true, 
            lastAddedItem: newItem,
            isOpen: false 
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.id === id) {
                if (quantity <= 0) return null;
                return {
                  ...item,
                  quantity,
                  totalPrice: item.unitPrice * quantity,
                };
              }
              return item;
            })
            .filter(Boolean) as CartItem[],
        })),

      setCurrency: (currency) => set({ currency }),
      openCart: () => set({ isOpen: true, isAddedModalOpen: false }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openAddedModal: (item) => set({ isAddedModalOpen: true, lastAddedItem: item }),
      closeAddedModal: () => set({ isAddedModalOpen: false }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'branda-cart-storage',
      skipHydration: false,
    }
  )
);

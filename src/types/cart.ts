export interface CartItem {
  id: string;
  productId: string;
  name: string;
  brand?: string;
  slug: string;
  image: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  selectedColor?: string;
  selectedSize?: string;
  selectedFinish?: string;
  decorationMethod?: string;
  turnaroundDays: number;
  artworkUrl?: string;
  artworkName?: string;
  customizationNotes?: string;
}

export interface CartSummary {
  subtotal: number;
  estimatedTax: number;
  estimatedShipping: number;
  discount: number;
  total: number;
  currency: 'NGN' | 'USD';
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isAddedModalOpen: boolean;
  lastAddedItem: CartItem | null;
  currency: 'NGN' | 'USD';
  addItem: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setCurrency: (currency: 'NGN' | 'USD') => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  clearCart: () => void;
  openAddedModal: (item: CartItem) => void;
  closeAddedModal: () => void;
}

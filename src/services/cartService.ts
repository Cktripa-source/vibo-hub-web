import { apiClient } from './apiClient';
import { CartItem } from '../contexts/CartContext';

interface CartResponse {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Mock cart data for development
let mockCart: CartItem[] = [];

export const cartService = {
  async getCart(): Promise<CartResponse> {
    try {
      // For development, return mock cart
      const totalItems = mockCart.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = mockCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

      return {
        items: mockCart,
        totalItems,
        totalPrice
      };

      // Uncomment for real API
      // const response = await apiClient.get('/cart');
      // return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to get cart');
    }
  },

  async addItem(productId: string, quantity = 1, variant?: string): Promise<void> {
    try {
      // For development, add to mock cart
      const existingItemIndex = mockCart.findIndex(item => 
        item.product.id === productId && item.selectedVariant === variant
      );

      if (existingItemIndex >= 0) {
        mockCart[existingItemIndex].quantity += quantity;
      } else {
        // Create mock cart item (would come from API in real implementation)
        const mockItem: CartItem = {
          id: 'cart_' + Date.now(),
          product: {
            id: productId,
            name: 'Sample Product',
            price: 99.99,
            images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'],
            vendor: {
              id: 'vendor_1',
              name: 'TechStore Inc'
            }
          },
          quantity,
          selectedVariant: variant
        };
        mockCart.push(mockItem);
      }

      // Uncomment for real API
      // await apiClient.post('/cart/add', { productId, quantity, variant });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to add item to cart');
    }
  },

  async updateQuantity(productId: string, quantity: number): Promise<void> {
    try {
      // For development, update mock cart
      const itemIndex = mockCart.findIndex(item => item.product.id === productId);
      if (itemIndex >= 0) {
        if (quantity <= 0) {
          mockCart.splice(itemIndex, 1);
        } else {
          mockCart[itemIndex].quantity = quantity;
        }
      }

      // Uncomment for real API
      // await apiClient.put('/cart/update', { productId, quantity });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to update cart');
    }
  },

  async removeItem(productId: string): Promise<void> {
    try {
      // For development, remove from mock cart
      const itemIndex = mockCart.findIndex(item => item.product.id === productId);
      if (itemIndex >= 0) {
        mockCart.splice(itemIndex, 1);
      }

      // Uncomment for real API
      // await apiClient.delete(`/cart/${productId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to remove item');
    }
  },

  async clearCart(): Promise<void> {
    try {
      // For development, clear mock cart
      mockCart = [];

      // Uncomment for real API
      // await apiClient.delete('/cart');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to clear cart');
    }
  }
};
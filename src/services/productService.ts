import { apiClient } from './apiClient';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: {
    id: string;
    name: string;
  };
  vendor: {
    id: string;
    name: string;
    rating: number;
    verified: boolean;
  };
  stock_quantity: number;
  averageRating: number;
  totalReviews: number;
  tags: string[];
  featured: boolean;
  specifications?: Record<string, string>;
  variants?: Array<{
    id: string;
    name: string;
    options: string[];
    price_modifier?: number;
  }>;
  shipping?: {
    free: boolean;
    cost: number;
    estimatedDays: number;
  };
  created_at: string;
  updated_at: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  vendor?: string;
  tags?: string[];
  featured?: boolean;
  inStock?: boolean;
  sortBy?: 'price' | 'rating' | 'name' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}

// Mock products for development
const mockProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Premium Wireless Headphones',
    description: 'Experience superior sound quality with our premium wireless headphones featuring active noise cancellation, 30-hour battery life, and premium comfort.',
    price: 199.99,
    comparePrice: 249.99,
    images: [
      'https://images.unsplash.com/photo-1609255386725-b9b6a8ad829c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop'
    ],
    category: {
      id: 'cat_electronics',
      name: 'Electronics'
    },
    vendor: {
      id: 'vendor_1',
      name: 'TechStore Inc',
      rating: 4.8,
      verified: true
    },
    stock_quantity: 50,
    averageRating: 4.7,
    totalReviews: 1248,
    tags: ['bluetooth', 'wireless', 'noise-cancellation', 'premium'],
    featured: true,
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Weight': '250g'
    },
    variants: [
      {
        id: 'color',
        name: 'Color',
        options: ['Black', 'White', 'Navy Blue']
      }
    ],
    shipping: {
      free: true,
      cost: 0,
      estimatedDays: 2
    },
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: 'prod_2',
    name: 'MacBook Pro 16-inch',
    description: 'The most powerful MacBook Pro ever, featuring the M3 Pro or M3 Max chip, incredible performance, and up to 22 hours of battery life.',
    price: 2399.99,
    comparePrice: 2599.99,
    images: [
      'https://images.unsplash.com/photo-1737868131581-6379cdee4ec3?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop'
    ],
    category: {
      id: 'cat_computers',
      name: 'Computers'
    },
    vendor: {
      id: 'vendor_2',
      name: 'Apple Authorized',
      rating: 4.9,
      verified: true
    },
    stock_quantity: 25,
    averageRating: 4.9,
    totalReviews: 856,
    tags: ['laptop', 'apple', 'macbook', 'professional'],
    featured: true,
    specifications: {
      'Processor': 'Apple M3 Pro chip',
      'Memory': '18GB unified memory',
      'Storage': '512GB SSD',
      'Display': '16.2-inch Liquid Retina XDR',
      'Battery': 'Up to 22 hours'
    },
    variants: [
      {
        id: 'storage',
        name: 'Storage',
        options: ['512GB', '1TB', '2TB'],
        price_modifier: 200
      },
      {
        id: 'color',
        name: 'Color',
        options: ['Space Gray', 'Silver']
      }
    ],
    shipping: {
      free: true,
      cost: 0,
      estimatedDays: 1
    },
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-16T00:00:00Z'
  },
  {
    id: 'prod_3',
    name: 'iPhone 15 Pro Max',
    description: 'The ultimate iPhone with titanium design, advanced camera system, and A17 Pro chip for incredible performance.',
    price: 1199.99,
    comparePrice: 1299.99,
    images: [
      'https://images.unsplash.com/photo-1640936343842-268f9d87e764?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop'
    ],
    category: {
      id: 'cat_phones',
      name: 'Smartphones'
    },
    vendor: {
      id: 'vendor_2',
      name: 'Mobile World',
      rating: 4.6,
      verified: true
    },
    stock_quantity: 30,
    averageRating: 4.6,
    totalReviews: 2341,
    tags: ['smartphone', 'iphone', 'apple', 'pro'],
    featured: true,
    specifications: {
      'Processor': 'A17 Pro chip',
      'Storage': '256GB',
      'Display': '6.7-inch Super Retina XDR',
      'Camera': '48MP Main + 12MP Ultra Wide',
      'Battery': 'All-day battery life'
    },
    variants: [
      {
        id: 'storage',
        name: 'Storage',
        options: ['256GB', '512GB', '1TB'],
        price_modifier: 100
      },
      {
        id: 'color',
        name: 'Color',
        options: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
      }
    ],
    shipping: {
      free: true,
      cost: 0,
      estimatedDays: 1
    },
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-17T00:00:00Z'
  },
  {
    id: 'prod_4',
    name: 'Premium Gaming Chair',
    description: 'Ergonomic gaming chair with lumbar support, adjustable armrests, and premium leather finish for ultimate comfort.',
    price: 299.99,
    comparePrice: 399.99,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop'
    ],
    category: {
      id: 'cat_furniture',
      name: 'Furniture'
    },
    vendor: {
      id: 'vendor_3',
      name: 'Comfort Zone',
      rating: 4.4,
      verified: true
    },
    stock_quantity: 15,
    averageRating: 4.3,
    totalReviews: 567,
    tags: ['gaming', 'chair', 'ergonomic', 'office'],
    featured: false,
    specifications: {
      'Material': 'Premium PU Leather',
      'Weight Capacity': '300 lbs',
      'Height Adjustment': '16" - 20"',
      'Armrests': 'Adjustable',
      'Recline': '90° - 160°'
    },
    variants: [
      {
        id: 'color',
        name: 'Color',
        options: ['Black', 'Red', 'Blue', 'White']
      }
    ],
    shipping: {
      free: false,
      cost: 49.99,
      estimatedDays: 5
    },
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-18T00:00:00Z'
  }
];

export const productService = {
  async getProducts(page = 1, limit = 12, filters: ProductFilters = {}): Promise<ProductsResponse> {
    try {
      // For development, filter and paginate mock data
      let filteredProducts = [...mockProducts];

      // Apply filters
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => 
          p.category.id === filters.category || p.category.name.toLowerCase().includes(filters.category.toLowerCase())
        );
      }

      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
      }

      if (filters.rating !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.averageRating >= filters.rating!);
      }

      if (filters.featured !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.featured === filters.featured);
      }

      if (filters.inStock) {
        filteredProducts = filteredProducts.filter(p => p.stock_quantity > 0);
      }

      if (filters.tags && filters.tags.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
          filters.tags!.some(tag => p.tags.includes(tag))
        );
      }

      // Apply sorting
      if (filters.sortBy) {
        filteredProducts.sort((a, b) => {
          let aValue: any = a[filters.sortBy as keyof Product];
          let bValue: any = b[filters.sortBy as keyof Product];
          
          if (filters.sortBy === 'price') {
            aValue = a.price;
            bValue = b.price;
          } else if (filters.sortBy === 'rating') {
            aValue = a.averageRating;
            bValue = b.averageRating;
          } else if (filters.sortBy === 'name') {
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
          }

          if (filters.sortOrder === 'desc') {
            return bValue > aValue ? 1 : -1;
          }
          return aValue > bValue ? 1 : -1;
        });
      }

      // Pagination
      const total = filteredProducts.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const products = filteredProducts.slice(startIndex, startIndex + limit);

      return {
        products,
        total,
        page,
        limit,
        totalPages
      };

      // Uncomment for real API
      // const params = new URLSearchParams({
      //   page: page.toString(),
      //   limit: limit.toString(),
      //   ...Object.entries(filters).reduce((acc, [key, value]) => {
      //     if (value !== undefined) acc[key] = value.toString();
      //     return acc;
      //   }, {} as Record<string, string>)
      // });
      // const response = await apiClient.get(`/products?${params}`);
      // return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch products');
    }
  },

  async getProduct(id: string): Promise<Product> {
    try {
      // For development, find mock product
      const product = mockProducts.find(p => p.id === id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;

      // Uncomment for real API
      // const response = await apiClient.get(`/products/${id}`);
      // return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch product');
    }
  },

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      // For development, return featured mock products
      return mockProducts.filter(p => p.featured);

      // Uncomment for real API
      // const response = await apiClient.get('/products/featured');
      // return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch featured products');
    }
  },

  async getRelatedProducts(productId: string): Promise<Product[]> {
    try {
      // For development, return random products from same category
      const product = mockProducts.find(p => p.id === productId);
      if (!product) return [];
      
      return mockProducts
        .filter(p => p.id !== productId && p.category.id === product.category.id)
        .slice(0, 4);

      // Uncomment for real API
      // const response = await apiClient.get(`/products/${productId}/related`);
      // return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch related products');
    }
  },

  async searchProducts(query: string, page = 1, limit = 12): Promise<ProductsResponse> {
    try {
      // For development, search mock products
      const searchTerm = query.toLowerCase();
      const filteredProducts = mockProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        p.category.name.toLowerCase().includes(searchTerm)
      );

      const total = filteredProducts.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const products = filteredProducts.slice(startIndex, startIndex + limit);

      return {
        products,
        total,
        page,
        limit,
        totalPages
      };

      // Uncomment for real API
      // const response = await apiClient.get(`/search/products?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
      // return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to search products');
    }
  }
};
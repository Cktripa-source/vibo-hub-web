import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useCart } from '../../../contexts/CartContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Heart, Search, ShoppingCart, Trash2, ArrowLeft, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

const Wishlist = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock wishlist data
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 'WISH-001',
      name: 'Premium Wireless Mouse',
      price: 79.99,
      originalPrice: 99.99,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=200&h=200&fit=crop',
      inStock: true,
      category: 'Electronics',
      rating: 4.5,
      reviews: 128,
      addedDate: '2024-01-10',
      vendor: 'TechStore Inc'
    },
    {
      id: 'WISH-002',
      name: 'Mechanical Keyboard',
      price: 149.99,
      originalPrice: 179.99,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=200&h=200&fit=crop',
      inStock: false,
      category: 'Electronics',
      rating: 4.8,
      reviews: 256,
      addedDate: '2024-01-08',
      vendor: 'Keyboard Pro'
    },
    {
      id: 'WISH-003',
      name: 'Wireless Headphones',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1609255386725-b9b6a8ad829c?w=200&h=200&fit=crop',
      inStock: true,
      category: 'Audio',
      rating: 4.7,
      reviews: 89,
      addedDate: '2024-01-05',
      vendor: 'AudioTech'
    },
    {
      id: 'WISH-004',
      name: 'Smart Watch Pro',
      price: 299.99,
      originalPrice: 349.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
      inStock: true,
      category: 'Wearables',
      rating: 4.6,
      reviews: 342,
      addedDate: '2024-01-03',
      vendor: 'WearTech'
    }
  ]);

  const handleAddToCart = (item: any) => {
    if (!item.inStock) {
      toast.error('This item is currently out of stock');
      return;
    }
    
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      vendor: item.vendor
    });
    toast.success(`${item.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (itemId: string, itemName: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    toast.success(`${itemName} removed from wishlist`);
  };

  const handleAddAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    if (inStockItems.length === 0) {
      toast.error('No items in stock to add to cart');
      return;
    }

    inStockItems.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        vendor: item.vendor
      });
    });

    toast.success(`${inStockItems.length} items added to cart!`);
  };

  const categories = ['all', ...Array.from(new Set(wishlistItems.map(item => item.category)))];

  const filteredItems = wishlistItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalSavings = wishlistItems.reduce((acc, item) => acc + (item.originalPrice - item.price), 0);
  const inStockCount = wishlistItems.filter(item => item.inStock).length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">
            Items you saved for later • {wishlistItems.length} items • ${totalSavings.toFixed(2)} potential savings
          </p>
        </div>
        {inStockCount > 0 && (
          <Button onClick={handleAddAllToCart} className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add All to Cart ({inStockCount})
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by product name or vendor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Wishlist Items */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-white/80"
                    onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                  {!item.inStock && (
                    <Badge variant="destructive" className="absolute top-2 left-2">
                      Out of Stock
                    </Badge>
                  )}
                  {item.originalPrice > item.price && (
                    <Badge variant="default" className="absolute bottom-2 left-2">
                      ${(item.originalPrice - item.price).toFixed(2)} off
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">by {item.vendor}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${
                            i < Math.floor(item.rating) 
                              ? 'bg-yellow-400' 
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.rating} ({item.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold">${item.price}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground mb-4">
                    Added on {item.addedDate} • {item.category}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/products/${item.id}`}>
                        View
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">
                {searchQuery || categoryFilter !== 'all' 
                  ? 'No items match your filters' 
                  : 'Your wishlist is empty'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || categoryFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start adding products you love to your wishlist'}
              </p>
              <Button asChild>
                <Link to="/products">
                  Browse Products
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      {wishlistItems.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Wishlist Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold">{wishlistItems.length}</p>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{inStockCount}</p>
                <p className="text-sm text-muted-foreground">In Stock</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  ${wishlistItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">${totalSavings.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Potential Savings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Wishlist;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, List, Star, Heart, ShoppingCart } from 'lucide-react';
import { productService, Product } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name-asc');

  const { addItem } = useCart();

  // Category data
  const categories: Record<string, { name: string; description: string; icon: string }> = {
    electronics: {
      name: 'Electronics',
      description: 'Latest gadgets, devices, and electronic accessories',
      icon: '📱'
    },
    computers: {
      name: 'Computers',
      description: 'Laptops, desktops, and computer accessories',
      icon: '💻'
    },
    phones: {
      name: 'Smartphones',
      description: 'Latest smartphones and mobile accessories',
      icon: '📱'
    },
    furniture: {
      name: 'Furniture',
      description: 'Home and office furniture for every space',
      icon: '🪑'
    },
    fashion: {
      name: 'Fashion',
      description: 'Clothing, accessories, and style essentials',
      icon: '👕'
    },
    books: {
      name: 'Books',
      description: 'Books, magazines, and educational materials',
      icon: '📚'
    }
  };

  const currentCategory = categoryId ? categories[categoryId] : null;

  useEffect(() => {
    if (categoryId) {
      fetchCategoryProducts();
    }
  }, [categoryId, sortBy]);

  const fetchCategoryProducts = async () => {
    if (!categoryId) return;
    
    try {
      setLoading(true);
      const [sortByField, sortOrder] = sortBy.split('-');
      const response = await productService.getProducts(1, 50, {
        category: categoryId,
        sortBy: sortByField as any,
        sortOrder: sortOrder as any
      });
      setProducts(response.products);
    } catch (error) {
      console.error('Failed to fetch category products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await addItem(productId);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            viewMode === 'grid' ? 'h-48' : 'h-32'
          }`}
        />
        {product.comparePrice && product.comparePrice > product.price && (
          <Badge className="absolute top-2 left-2" variant="destructive">
            -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
          </Badge>
        )}
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toast.info('Wishlist feature coming soon!');
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            {product.vendor.verified && (
              <Badge variant="secondary" className="ml-2 text-xs">✓</Badge>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">by {product.vendor.name}</p>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm ml-1">{product.averageRating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.totalReviews.toLocaleString()})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">${product.price}</span>
            {product.comparePrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.comparePrice}
              </span>
            )}
          </div>

          {product.shipping?.free && (
            <Badge variant="outline" className="text-xs">Free Shipping</Badge>
          )}

          <Button 
            className="w-full mt-3" 
            onClick={(e) => handleAddToCart(product.id, e)}
            disabled={product.stock_quantity === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (!currentCategory) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <p className="text-muted-foreground mb-4">The category you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/products">Browse All Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground">Products</Link>
          <span>/</span>
          <span className="text-foreground">{currentCategory.name}</span>
        </div>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{currentCategory.icon}</div>
          <div>
            <h1 className="text-3xl font-bold">{currentCategory.name}</h1>
            <p className="text-muted-foreground">{currentCategory.description}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {loading ? 'Loading...' : `${products.length} products found`}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Options */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
              <SelectItem value="created_at-desc">Newest First</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode Toggle */}
          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="w-full h-48 bg-muted animate-pulse"></div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-2/3 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {products.map(product => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">{currentCategory.icon}</div>
          <h3 className="text-xl font-semibold mb-2">No products found in {currentCategory.name}</h3>
          <p className="text-muted-foreground mb-6">
            We're working on adding more products to this category. Check back soon!
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link to="/products">Browse All Products</Link>
            </Button>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Category Features */}
      <div className="mt-16 grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl mb-3">🚚</div>
            <h3 className="font-semibold mb-2">Fast Shipping</h3>
            <p className="text-sm text-muted-foreground">
              Quick delivery on all {currentCategory.name.toLowerCase()} items
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl mb-3">🛡️</div>
            <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
            <p className="text-sm text-muted-foreground">
              All products are verified by our quality assurance team
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl mb-3">💬</div>
            <h3 className="font-semibold mb-2">Expert Support</h3>
            <p className="text-sm text-muted-foreground">
              Get help from our {currentCategory.name.toLowerCase()} specialists
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoryPage;
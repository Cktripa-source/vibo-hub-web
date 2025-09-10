import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star, Bell, CreditCard, User, Package, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Progress } from '../../components/ui/progress';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { totalItems, totalPrice } = useCart();

  // Mock data - would come from API in real implementation
  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 199.99,
      items: 2,
      image: 'https://images.unsplash.com/photo-1609255386725-b9b6a8ad829c?w=80&h=80&fit=crop'
    },
    {
      id: 'ORD-002', 
      date: '2024-01-12',
      status: 'Shipped',
      total: 89.99,
      items: 1,
      image: 'https://images.unsplash.com/photo-1737868131581-6379cdee4ec3?w=80&h=80&fit=crop'
    }
  ];

  const wishlistItems = [
    {
      id: 'WISH-001',
      name: 'Premium Wireless Mouse',
      price: 79.99,
      originalPrice: 99.99,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=200&h=200&fit=crop',
      inStock: true
    },
    {
      id: 'WISH-002',
      name: 'Mechanical Keyboard',
      price: 149.99,
      originalPrice: 179.99, 
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=200&h=200&fit=crop',
      inStock: false
    }
  ];

  const quickActions = [
    { 
      icon: ShoppingBag, 
      label: 'Browse Products', 
      href: '/products', 
      description: 'Discover new products',
      color: 'text-blue-600 dark:text-blue-400'
    },
    { 
      icon: Package, 
      label: 'Track Orders', 
      href: '/dashboard/orders', 
      description: 'View order status',
      color: 'text-green-600 dark:text-green-400'
    },
    { 
      icon: Heart, 
      label: 'Wishlist', 
      href: '/dashboard/wishlist', 
      description: 'Saved for later',
      color: 'text-red-600 dark:text-red-400'
    },
    { 
      icon: Star, 
      label: 'Reviews', 
      href: '/dashboard/reviews', 
      description: 'Share your experience',
      color: 'text-yellow-600 dark:text-yellow-400'
    }
  ];

  const stats = [
    { label: 'Total Orders', value: '12', icon: Package },
    { label: 'Wishlist Items', value: '8', icon: Heart },
    { label: 'Reviews Written', value: '5', icon: Star },
    { label: 'Loyalty Points', value: '2,450', icon: TrendingUp }
  ];

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="text-lg">{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-muted-foreground">
              Ready to discover amazing products today?
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <Card key={label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Everything you need, just a click away
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map(({ icon: Icon, label, href, description, color }) => (
                  <Link key={label} to={href}>
                    <div className="group p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer text-center">
                      <Icon className={`h-8 w-8 mx-auto mb-2 ${color} group-hover:scale-110 transition-transform`} />
                      <h3 className="font-semibold text-sm mb-1">{label}</h3>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Cart */}
          {totalItems > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Current Cart
                </CardTitle>
                <CardDescription>
                  You have {totalItems} item{totalItems > 1 ? 's' : ''} in your cart
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      {totalItems} item{totalItems > 1 ? 's' : ''} • Ready to checkout
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link to="/cart">View Cart</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/checkout">Checkout</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your latest purchase history</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/orders">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <ImageWithFallback
                        src={order.image}
                        alt="Order item"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{order.id}</span>
                          <Badge variant={
                            order.status === 'Delivered' ? 'default' :
                            order.status === 'Shipped' ? 'secondary' : 'outline'
                          }>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.items} item{order.items > 1 ? 's' : ''} • {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.total}</p>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/orders/${order.id}`}>Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start shopping to see your orders here
                  </p>
                  <Button asChild>
                    <Link to="/products">Browse Products</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Profile Completion</span>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Email Verified</span>
                  <Badge variant="default">✓</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phone Number</span>
                  <Badge variant="outline">Add</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Address</span>
                  <Badge variant="outline">Add</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/profile">Complete Profile</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Wishlist Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Wishlist
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard/wishlist">View All</Link>
                </Button>
              </div>
              <CardDescription>Items you saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              {wishlistItems.length > 0 ? (
                <div className="space-y-3">
                  {wishlistItems.slice(0, 2).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">${item.price}</span>
                          <span className="text-xs text-muted-foreground line-through">
                            ${item.originalPrice}
                          </span>
                        </div>
                        {!item.inStock && (
                          <Badge variant="outline" className="text-xs">Out of Stock</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Heart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Save items you love to your wishlist
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p>Your order ORD-002 has been shipped</p>
                    <p className="text-muted-foreground text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p>Price drop alert: Premium Wireless Mouse</p>
                    <p className="text-muted-foreground text-xs">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p>New products added to Electronics</p>
                    <p className="text-muted-foreground text-xs">3 days ago</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <Link to="/dashboard/notifications">View All Notifications</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
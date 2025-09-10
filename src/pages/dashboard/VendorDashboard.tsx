import React from 'react';
import { Link } from 'react-router-dom';
import { Package, DollarSign, TrendingUp, Users, ShoppingCart, Star, Eye, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

const VendorDashboard = () => {
  const { user } = useAuth();

  // Mock vendor stats - would come from API
  const vendorStats = {
    totalProducts: 45,
    totalSales: 12450.75,
    monthlyRevenue: 3250.50,
    totalOrders: 234,
    averageRating: 4.7,
    totalReviews: 189,
    conversionRate: 3.2,
    profileViews: 1543
  };

  const recentOrders = [
    {
      id: 'ORD-VEN-001',
      customer: 'John Doe',
      product: 'Premium Wireless Headphones',
      amount: 199.99,
      status: 'Processing',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1609255386725-b9b6a8ad829c?w=80&h=80&fit=crop'
    },
    {
      id: 'ORD-VEN-002', 
      customer: 'Sarah Wilson',
      product: 'Smart Watch Pro',
      amount: 299.99,
      status: 'Shipped',
      date: '2024-01-14',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop'
    }
  ];

  const topProducts = [
    {
      id: 'PROD-001',
      name: 'Premium Wireless Headphones',
      sales: 45,
      revenue: 8995.55,
      stock: 12,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1609255386725-b9b6a8ad829c?w=120&h=120&fit=crop'
    },
    {
      id: 'PROD-002',
      name: 'Smart Watch Pro',
      sales: 32,
      revenue: 9599.68,
      stock: 8,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop'
    }
  ];

  const monthlyStats = [
    { month: 'Dec', sales: 2800 },
    { month: 'Jan', sales: 3250 }
  ];

  const quickActions = [
    { 
      icon: Plus, 
      label: 'Add Product', 
      href: '/dashboard/products/new', 
      description: 'List a new product',
      color: 'text-green-600 dark:text-green-400'
    },
    { 
      icon: Package, 
      label: 'Manage Inventory', 
      href: '/dashboard/products', 
      description: 'Update stock levels',
      color: 'text-blue-600 dark:text-blue-400'
    },
    { 
      icon: ShoppingCart, 
      label: 'View Orders', 
      href: '/dashboard/orders', 
      description: 'Process customer orders',
      color: 'text-orange-600 dark:text-orange-400'
    },
    { 
      icon: TrendingUp, 
      label: 'Analytics', 
      href: '/dashboard/analytics', 
      description: 'Track performance',
      color: 'text-purple-600 dark:text-purple-400'
    }
  ];

  const statCards = [
    { 
      title: 'Total Revenue', 
      value: `$${vendorStats.totalSales.toLocaleString()}`, 
      icon: DollarSign, 
      change: '+12.5%',
      changeType: 'positive'
    },
    { 
      title: 'Monthly Sales', 
      value: `$${vendorStats.monthlyRevenue.toLocaleString()}`, 
      icon: TrendingUp, 
      change: '+8.3%',
      changeType: 'positive'
    },
    { 
      title: 'Total Orders', 
      value: vendorStats.totalOrders.toString(), 
      icon: ShoppingCart, 
      change: '+15.2%',
      changeType: 'positive'
    },
    { 
      title: 'Avg. Rating', 
      value: vendorStats.averageRating.toString(), 
      icon: Star, 
      change: '+0.2',
      changeType: 'positive'
    }
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
            <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Here's how your store is performing.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map(({ title, value, icon: Icon, change, changeType }) => (
            <Card key={title}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <Badge variant={changeType === 'positive' ? 'default' : 'destructive'} className="text-xs">
                    {change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-sm text-muted-foreground">{title}</p>
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
                Manage your store efficiently
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

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Orders that need your attention</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/orders">View All Orders</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <ImageWithFallback
                      src={order.image}
                      alt={order.product}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{order.id}</span>
                        <Badge variant={
                          order.status === 'Processing' ? 'default' :
                          order.status === 'Shipped' ? 'secondary' : 'outline'
                        }>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {order.product} • Customer: {order.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.amount}</p>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/dashboard/orders/${order.id}`}>Process</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Top Performing Products</CardTitle>
                  <CardDescription>Your best-selling items this month</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/products">Manage Products</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="block">Sales: {product.sales} units</span>
                          <span className="block">Revenue: ${product.revenue.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="block">Stock: {product.stock} left</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/dashboard/products/${product.id}`}>Edit</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Store Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Store Performance</CardTitle>
              <CardDescription>This month vs last month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Sales Goal</span>
                  <span className="text-sm">81%</span>
                </div>
                <Progress value={81} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground">
                  $3,250 of $4,000 monthly goal
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-bold text-green-600">{vendorStats.conversionRate}%</p>
                  <p className="text-muted-foreground">Conversion</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-bold text-blue-600">{vendorStats.profileViews}</p>
                  <p className="text-muted-foreground">Profile Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Product Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Products</span>
                  <Badge variant="outline">{vendorStats.totalProducts}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Out of Stock</span>
                  <Badge variant="destructive">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Low Stock</span>
                  <Badge variant="secondary">7</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Draft Products</span>
                  <Badge variant="outline">2</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/dashboard/products">Manage Inventory</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Customer Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Customer Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">{vendorStats.averageRating}</p>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(vendorStats.averageRating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on {vendorStats.totalReviews} reviews
                  </p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>5 stars</span>
                    <div className="flex items-center gap-2 flex-1 mx-3">
                      <Progress value={70} className="h-1 flex-1" />
                      <span className="text-xs text-muted-foreground">70%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>4 stars</span>
                    <div className="flex items-center gap-2 flex-1 mx-3">
                      <Progress value={20} className="h-1 flex-1" />
                      <span className="text-xs text-muted-foreground">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>3 stars</span>
                    <div className="flex items-center gap-2 flex-1 mx-3">
                      <Progress value={7} className="h-1 flex-1" />
                      <span className="text-xs text-muted-foreground">7%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>2 stars</span>
                    <div className="flex items-center gap-2 flex-1 mx-3">
                      <Progress value={2} className="h-1 flex-1" />
                      <span className="text-xs text-muted-foreground">2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>1 star</span>
                    <div className="flex items-center gap-2 flex-1 mx-3">
                      <Progress value={1} className="h-1 flex-1" />
                      <span className="text-xs text-muted-foreground">1%</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/dashboard/reviews">View All Reviews</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Vendor Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/vendor/guide">Seller's Guide</Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/vendor/policies">Store Policies</Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/vendor/support">Get Support</Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/dashboard/withdrawals">Request Payout</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
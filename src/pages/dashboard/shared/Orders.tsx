import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Package, Search, Filter, Eye, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock orders data - would come from API based on user role
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 199.99,
      items: 2,
      customer: user?.role === 'vendor' ? 'John Doe' : undefined,
      vendor: user?.role === 'customer' ? 'TechStore Inc' : undefined,
      image: 'https://images.unsplash.com/photo-1609255386725-b9b6a8ad829c?w=80&h=80&fit=crop',
      products: ['Premium Wireless Headphones', 'Phone Case']
    },
    {
      id: 'ORD-002',
      date: '2024-01-12',
      status: 'Shipped',
      total: 89.99,
      items: 1,
      customer: user?.role === 'vendor' ? 'Sarah Wilson' : undefined,
      vendor: user?.role === 'customer' ? 'Mobile World' : undefined,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
      products: ['Smart Watch Pro']
    },
    {
      id: 'ORD-003',
      date: '2024-01-10',
      status: 'Processing',
      total: 149.99,
      items: 1,
      customer: user?.role === 'vendor' ? 'Mike Johnson' : undefined,
      vendor: user?.role === 'customer' ? 'Electronics Hub' : undefined,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=80&h=80&fit=crop',
      products: ['Wireless Mouse Pro']
    },
    {
      id: 'ORD-004',
      date: '2024-01-08',
      status: 'Cancelled',
      total: 299.99,
      items: 1,
      customer: user?.role === 'vendor' ? 'Lisa Chen' : undefined,
      vendor: user?.role === 'customer' ? 'Gadget Store' : undefined,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=80&h=80&fit=crop',
      products: ['Mechanical Keyboard']
    }
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'default';
      case 'Shipped':
        return 'secondary';
      case 'Processing':
        return 'outline';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.products.some(product => product.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const ordersByStatus = {
    all: filteredOrders,
    processing: filteredOrders.filter(order => order.status === 'Processing'),
    shipped: filteredOrders.filter(order => order.status === 'Shipped'),
    delivered: filteredOrders.filter(order => order.status === 'Delivered'),
    cancelled: filteredOrders.filter(order => order.status === 'Cancelled')
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          {user?.role === 'vendor' ? 'Manage your customer orders' : 'Track your order history'}
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID or product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            All ({ordersByStatus.all.length})
          </TabsTrigger>
          <TabsTrigger value="processing">
            Processing ({ordersByStatus.processing.length})
          </TabsTrigger>
          <TabsTrigger value="shipped">
            Shipped ({ordersByStatus.shipped.length})
          </TabsTrigger>
          <TabsTrigger value="delivered">
            Delivered ({ordersByStatus.delivered.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({ordersByStatus.cancelled.length})
          </TabsTrigger>
        </TabsList>

        {Object.entries(ordersByStatus).map(([status, orders]) => (
          <TabsContent key={status} value={status}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">
                  {status === 'all' ? 'All Orders' : `${status} Orders`}
                </CardTitle>
                <CardDescription>
                  {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <ImageWithFallback
                          src={order.image}
                          alt="Order item"
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{order.id}</span>
                            <Badge variant={getStatusBadgeVariant(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>
                              {order.items} item{order.items > 1 ? 's' : ''} • {order.date}
                            </p>
                            <p>Products: {order.products.join(', ')}</p>
                            {user?.role === 'vendor' && order.customer && (
                              <p>Customer: {order.customer}</p>
                            )}
                            {user?.role === 'customer' && order.vendor && (
                              <p>Vendor: {order.vendor}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">${order.total}</p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/orders/${order.id}`}>
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Link>
                            </Button>
                            {user?.role === 'vendor' && order.status === 'Processing' && (
                              <Button size="sm">
                                Process Order
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No orders found</h3>
                    <p className="text-muted-foreground mb-4">
                      {status === 'all' 
                        ? "You don't have any orders yet." 
                        : `No ${status} orders found.`}
                    </p>
                    {user?.role === 'customer' && status === 'all' && (
                      <Button asChild>
                        <Link to="/products">Start Shopping</Link>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Orders;
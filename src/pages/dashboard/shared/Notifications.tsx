import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  Bell, 
  BellOff, 
  Package, 
  DollarSign, 
  Heart, 
  Star, 
  Users, 
  TrendingUp,
  ArrowLeft,
  Settings,
  Check,
  X,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';

const Notifications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 'NOTIF-001',
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order ORD-002 has been shipped and is on its way to you.',
      timestamp: '2 hours ago',
      read: false,
      icon: Package,
      color: 'text-blue-600',
      actionable: true,
      actions: [
        { label: 'Track Order', href: '/orders/ORD-002' },
        { label: 'View Details', href: '/orders/ORD-002' }
      ]
    },
    {
      id: 'NOTIF-002',
      type: 'price_drop',
      title: 'Price Drop Alert',
      message: 'Premium Wireless Mouse in your wishlist is now $20 off!',
      timestamp: '1 day ago',
      read: false,
      icon: Heart,
      color: 'text-red-600',
      actionable: true,
      actions: [
        { label: 'View Product', href: '/products/WISH-001' },
        { label: 'Buy Now', href: '/products/WISH-001' }
      ]
    },
    {
      id: 'NOTIF-003',
      type: 'review',
      title: 'Review Request',
      message: 'How was your experience with Smart Watch Pro? Share your thoughts!',
      timestamp: '2 days ago',
      read: true,
      icon: Star,
      color: 'text-yellow-600',
      actionable: true,
      actions: [
        { label: 'Write Review', href: '/products/PROD-002/review' }
      ]
    },
    {
      id: 'NOTIF-004',
      type: 'promotion',
      title: 'New Promotion',
      message: 'Electronics category is 15% off this weekend. Don\'t miss out!',
      timestamp: '3 days ago',
      read: true,
      icon: TrendingUp,
      color: 'text-green-600',
      actionable: true,
      actions: [
        { label: 'Browse Electronics', href: '/category/electronics' }
      ]
    }
  ]);

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    priceDrops: true,
    wishlistItems: true,
    promotions: false,
    reviews: true,
    newsletter: false,
    smsNotifications: false,
    emailNotifications: true,
    pushNotifications: true
  });

  // Vendor/Admin specific notifications
  const vendorNotifications = [
    {
      id: 'VENDOR-001',
      type: 'new_order',
      title: 'New Order Received',
      message: 'You have a new order for Premium Wireless Headphones from John Doe.',
      timestamp: '30 minutes ago',
      read: false,
      icon: Package,
      color: 'text-blue-600',
      actionable: true,
      actions: [
        { label: 'Process Order', href: '/dashboard/orders/ORD-VEN-001' }
      ]
    },
    {
      id: 'VENDOR-002',
      type: 'low_stock',
      title: 'Low Stock Alert',
      message: 'Smart Watch Pro is running low on stock (only 5 left).',
      timestamp: '2 hours ago',
      read: false,
      icon: TrendingUp,
      color: 'text-orange-600',
      actionable: true,
      actions: [
        { label: 'Update Inventory', href: '/dashboard/products/PROD-002' }
      ]
    }
  ];

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast.success('All notifications marked as read');
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    toast.success('Notification deleted');
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
    toast.success(`${setting} ${value ? 'enabled' : 'disabled'}`);
  };

  const allNotifications = user?.role === 'vendor' || user?.role === 'admin' 
    ? [...notifications, ...vendorNotifications] 
    : notifications;

  const unreadCount = allNotifications.filter(notif => !notif.read).length;

  const notificationsByType = {
    all: allNotifications,
    unread: allNotifications.filter(notif => !notif.read),
    orders: allNotifications.filter(notif => notif.type === 'order' || notif.type === 'new_order'),
    promotions: allNotifications.filter(notif => notif.type === 'promotion'),
    alerts: allNotifications.filter(notif => notif.type === 'price_drop' || notif.type === 'low_stock')
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell className="h-8 w-8" />
            Notifications
          </h1>
          <p className="text-muted-foreground">
            Stay updated with your account activity • {unreadCount} unread notifications
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
          <Button variant="outline" onClick={handleClearAll}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar - Settings */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Order Updates</span>
                  <Switch
                    checked={notificationSettings.orderUpdates}
                    onCheckedChange={(value) => handleSettingChange('orderUpdates', value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Price Drops</span>
                  <Switch
                    checked={notificationSettings.priceDrops}
                    onCheckedChange={(value) => handleSettingChange('priceDrops', value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Wishlist Items</span>
                  <Switch
                    checked={notificationSettings.wishlistItems}
                    onCheckedChange={(value) => handleSettingChange('wishlistItems', value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Promotions</span>
                  <Switch
                    checked={notificationSettings.promotions}
                    onCheckedChange={(value) => handleSettingChange('promotions', value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Review Requests</span>
                  <Switch
                    checked={notificationSettings.reviews}
                    onCheckedChange={(value) => handleSettingChange('reviews', value)}
                  />
                </div>
              </div>

              <hr className="my-4" />

              <div className="space-y-3">
                <h4 className="font-medium">Delivery Methods</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email</span>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(value) => handleSettingChange('emailNotifications', value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Push Notifications</span>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(value) => handleSettingChange('pushNotifications', value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SMS</span>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(value) => handleSettingChange('smsNotifications', value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">
                All ({notificationsByType.all.length})
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread ({notificationsByType.unread.length})
              </TabsTrigger>
              <TabsTrigger value="orders">
                Orders ({notificationsByType.orders.length})
              </TabsTrigger>
              <TabsTrigger value="alerts">
                Alerts ({notificationsByType.alerts.length})
              </TabsTrigger>
            </TabsList>

            {Object.entries(notificationsByType).map(([type, notifications]) => (
              <TabsContent key={type} value={type}>
                <Card>
                  <CardHeader>
                    <CardTitle className="capitalize">
                      {type === 'all' ? 'All Notifications' : `${type} Notifications`}
                    </CardTitle>
                    <CardDescription>
                      {notifications.length} {notifications.length === 1 ? 'notification' : 'notifications'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {notifications.length > 0 ? (
                      <div className="space-y-4">
                        {notifications.map((notification) => {
                          const Icon = notification.icon;
                          return (
                            <div 
                              key={notification.id}
                              className={`p-4 border rounded-lg hover:bg-muted/50 transition-colors ${
                                !notification.read ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800' : ''
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div className={`p-2 rounded-lg bg-muted`}>
                                  <Icon className={`h-5 w-5 ${notification.color}`} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-semibold">{notification.title}</h3>
                                    <div className="flex items-center gap-2">
                                      {!notification.read && (
                                        <Badge variant="default" className="text-xs">New</Badge>
                                      )}
                                      <span className="text-xs text-muted-foreground">
                                        {notification.timestamp}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-muted-foreground mb-3">{notification.message}</p>
                                  
                                  <div className="flex items-center justify-between">
                                    {notification.actionable && notification.actions && (
                                      <div className="flex gap-2">
                                        {notification.actions.map((action, index) => (
                                          <Button key={index} variant="outline" size="sm">
                                            {action.label}
                                          </Button>
                                        ))}
                                      </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                      {!notification.read && (
                                        <Button 
                                          variant="ghost" 
                                          size="sm"
                                          onClick={() => handleMarkAsRead(notification.id)}
                                        >
                                          <Check className="h-4 w-4 mr-1" />
                                          Mark Read
                                        </Button>
                                      )}
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => handleDeleteNotification(notification.id)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <BellOff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">No notifications</h3>
                        <p className="text-muted-foreground">
                          {type === 'all' 
                            ? "You're all caught up! No notifications to show."
                            : `No ${type} notifications found.`}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
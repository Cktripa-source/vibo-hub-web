import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, DollarSign, TrendingUp, UserCheck, AlertTriangle, Settings, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Progress } from '../../components/ui/progress';

const AdminDashboard = () => {
  const { user } = useAuth();

  // Mock admin stats
  const adminStats = {
    totalUsers: 45782,
    newUsersToday: 127,
    totalProducts: 12456,
    pendingProducts: 23,
    totalOrders: 8923,
    todayOrders: 145,
    totalRevenue: 892540.50,
    monthlyRevenue: 125650.75,
    activeVendors: 1250,
    activeAffiliates: 890,
    activeInfluencers: 345,
    systemHealth: 98.5
  };

  const recentActivities = [
    {
      id: 1,
      type: 'New User',
      description: 'Sarah Johnson registered as a vendor',
      timestamp: '5 minutes ago',
      icon: UserCheck,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'Product Pending',
      description: 'MacBook Pro 16-inch awaiting approval',
      timestamp: '12 minutes ago',
      icon: Package,
      color: 'text-yellow-600'
    },
    {
      id: 3,
      type: 'High Order Volume',
      description: 'Order volume increased by 25% today',
      timestamp: '1 hour ago',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      id: 4,
      type: 'System Alert',
      description: 'Server load at 85% - monitoring',
      timestamp: '2 hours ago',
      icon: AlertTriangle,
      color: 'text-orange-600'
    }
  ];

  const pendingActions = [
    {
      id: 1,
      title: 'Product Approvals',
      count: 23,
      priority: 'high',
      href: '/dashboard/products/approval'
    },
    {
      id: 2,
      title: 'Vendor Applications',
      count: 8,
      priority: 'medium',
      href: '/dashboard/vendors/pending'
    },
    {
      id: 3,
      title: 'Withdrawal Requests',
      count: 15,
      priority: 'high',
      href: '/dashboard/withdrawals'
    },
    {
      id: 4,
      title: 'Reported Issues',
      count: 5,
      priority: 'low',
      href: '/dashboard/reports'
    }
  ];

  const quickActions = [
    { 
      icon: Users, 
      label: 'User Management', 
      href: '/dashboard/users', 
      description: 'Manage all users',
      color: 'text-blue-600 dark:text-blue-400'
    },
    { 
      icon: Package, 
      label: 'Product Approval', 
      href: '/dashboard/products/approval', 
      description: 'Review products',
      color: 'text-green-600 dark:text-green-400'
    },
    { 
      icon: BarChart3, 
      label: 'Analytics', 
      href: '/dashboard/analytics', 
      description: 'Platform insights',
      color: 'text-purple-600 dark:text-purple-400'
    },
    { 
      icon: Settings, 
      label: 'System Settings', 
      href: '/dashboard/system', 
      description: 'Configure platform',
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const statCards = [
    { 
      title: 'Total Users', 
      value: adminStats.totalUsers.toLocaleString(), 
      icon: Users, 
      change: `+${adminStats.newUsersToday} today`,
      changeType: 'positive'
    },
    { 
      title: 'Total Products', 
      value: adminStats.totalProducts.toLocaleString(), 
      icon: Package, 
      change: `${adminStats.pendingProducts} pending`,
      changeType: 'warning'
    },
    { 
      title: 'Monthly Revenue', 
      value: `$${(adminStats.monthlyRevenue / 1000).toFixed(0)}K`, 
      icon: DollarSign, 
      change: '+12.5%',
      changeType: 'positive'
    },
    { 
      title: 'System Health', 
      value: `${adminStats.systemHealth}%`, 
      icon: TrendingUp, 
      change: 'All systems operational',
      changeType: 'positive'
    }
  ];

  const userTypeBreakdown = [
    { type: 'Customers', count: 43687, percentage: 95.4, color: 'bg-blue-500' },
    { type: 'Vendors', count: 1250, percentage: 2.7, color: 'bg-green-500' },
    { type: 'Affiliates', count: 890, percentage: 1.9, color: 'bg-purple-500' },
    { type: 'Influencers', count: 345, percentage: 0.8, color: 'bg-pink-500' }
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
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Platform overview and system management
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
                  <Badge 
                    variant={
                      changeType === 'positive' ? 'default' : 
                      changeType === 'warning' ? 'secondary' : 'destructive'
                    } 
                    className="text-xs"
                  >
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
                Common administrative tasks
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

          {/* Pending Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Pending Actions
              </CardTitle>
              <CardDescription>Items requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingActions.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={
                          action.priority === 'high' ? 'destructive' :
                          action.priority === 'medium' ? 'default' : 'secondary'
                        }
                        className="w-2 h-2 p-0 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{action.title}</p>
                        <p className="text-sm text-muted-foreground">{action.count} items pending</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={action.href}>Review</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform activities and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-muted`}>
                        <Icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{activity.type}</p>
                          <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/dashboard/activity">View All Activity</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Type Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Breakdown by user type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userTypeBreakdown.map((userType) => (
                <div key={userType.type} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${userType.color}`}></div>
                      {userType.type}
                    </span>
                    <span className="font-medium">{userType.count.toLocaleString()}</span>
                  </div>
                  <Progress value={userType.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Platform health overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Server Status</span>
                <Badge variant="default" className="bg-green-500">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge variant="default" className="bg-green-500">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Response</span>
                <span className="text-sm text-green-600">125ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Uptime</span>
                <span className="text-sm text-green-600">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Sessions</span>
                <span className="text-sm">2,847</span>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/dashboard/system/health">View Details</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Revenue Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Financial performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  ${(adminStats.totalRevenue / 1000).toFixed(0)}K
                </p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="font-bold">${(adminStats.monthlyRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-muted-foreground">This Month</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="font-bold">{adminStats.todayOrders}</p>
                  <p className="text-muted-foreground">Today's Orders</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/dashboard/reports/revenue">Detailed Report</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/dashboard/users">User Management</Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/dashboard/products">Product Management</Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/dashboard/orders">Order Management</Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/dashboard/reports">Reports & Analytics</Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/dashboard/settings">Platform Settings</Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/dashboard/support">Support Center</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
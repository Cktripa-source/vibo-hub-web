import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, TrendingUp, Users, ExternalLink, Copy, BarChart3, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Progress } from '../../components/ui/progress';
import { toast } from 'sonner@2.0.3';

const AffiliateDashboard = () => {
  const { user } = useAuth();

  // Mock affiliate stats
  const affiliateStats = {
    totalEarnings: 2850.75,
    monthlyEarnings: 485.20,
    totalClicks: 1254,
    conversions: 89,
    conversionRate: 7.1,
    activeLinks: 12,
    commissionRate: 12.5
  };

  const recentLinks = [
    {
      id: 'link_1',
      product: 'Premium Wireless Headphones',
      clicks: 45,
      conversions: 3,
      earnings: 59.97,
      conversionRate: 6.7,
      created: '2024-01-10'
    },
    {
      id: 'link_2',
      product: 'Smart Watch Pro',
      clicks: 78,
      conversions: 8,
      earnings: 239.92,
      conversionRate: 10.3,
      created: '2024-01-08'
    }
  ];

  const topPerformingProducts = [
    {
      id: 'prod_1',
      name: 'MacBook Pro 16-inch',
      earnings: 480.50,
      clicks: 125,
      conversions: 2,
      image: 'https://images.unsplash.com/photo-1737868131581-6379cdee4ec3?w=80&h=80&fit=crop'
    },
    {
      id: 'prod_2',
      name: 'iPhone 15 Pro Max',
      earnings: 360.00,
      clicks: 89,
      conversions: 3,
      image: 'https://images.unsplash.com/photo-1640936343842-268f9d87e764?w=80&h=80&fit=crop'
    }
  ];

  const quickActions = [
    { 
      icon: Plus, 
      label: 'Create Link', 
      href: '/dashboard/links/create', 
      description: 'Generate new affiliate link',
      color: 'text-green-600 dark:text-green-400'
    },
    { 
      icon: BarChart3, 
      label: 'View Analytics', 
      href: '/dashboard/analytics', 
      description: 'Track performance',
      color: 'text-blue-600 dark:text-blue-400'
    },
    { 
      icon: DollarSign, 
      label: 'Request Payout', 
      href: '/dashboard/payouts', 
      description: 'Withdraw earnings',
      color: 'text-purple-600 dark:text-purple-400'
    },
    { 
      icon: ExternalLink, 
      label: 'Marketing Tools', 
      href: '/dashboard/tools', 
      description: 'Banners & resources',
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const statCards = [
    { 
      title: 'Total Earnings', 
      value: `$${affiliateStats.totalEarnings.toLocaleString()}`, 
      icon: DollarSign, 
      change: '+15.2%',
      changeType: 'positive'
    },
    { 
      title: 'Monthly Earnings', 
      value: `$${affiliateStats.monthlyEarnings.toLocaleString()}`, 
      icon: TrendingUp, 
      change: '+8.5%',
      changeType: 'positive'
    },
    { 
      title: 'Total Clicks', 
      value: affiliateStats.totalClicks.toString(), 
      icon: Users, 
      change: '+22.1%',
      changeType: 'positive'
    },
    { 
      title: 'Conversion Rate', 
      value: `${affiliateStats.conversionRate}%`, 
      icon: BarChart3, 
      change: '+1.2%',
      changeType: 'positive'
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard!');
  };

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
            <h1 className="text-3xl font-bold">Affiliate Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Track your affiliate performance and earnings.
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
                Manage your affiliate activities
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

          {/* Recent Affiliate Links */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Affiliate Links</CardTitle>
                  <CardDescription>Your latest generated links and their performance</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/links">View All Links</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLinks.map((link) => (
                  <div key={link.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{link.product}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(`https://ecommercehub.com/affiliate/${link.id}`)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy Link
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Clicks</p>
                        <p className="font-semibold">{link.clicks}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Conversions</p>
                        <p className="font-semibold">{link.conversions}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Earnings</p>
                        <p className="font-semibold">${link.earnings}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Conv. Rate</p>
                        <p className="font-semibold">{link.conversionRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>Products generating the most affiliate revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="block">Earnings: ${product.earnings}</span>
                        </div>
                        <div>
                          <span className="block">Clicks: {product.clicks}</span>
                        </div>
                        <div>
                          <span className="block">Conversions: {product.conversions}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/products/${product.id}`}>
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Earnings Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress</CardTitle>
              <CardDescription>Your earnings progress this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Monthly Goal</span>
                  <span className="text-sm">73%</span>
                </div>
                <Progress value={73} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground">
                  $485 of $650 monthly goal
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-bold text-green-600">${affiliateStats.monthlyEarnings}</p>
                  <p className="text-muted-foreground">This Month</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-bold text-blue-600">{affiliateStats.activeLinks}</p>
                  <p className="text-muted-foreground">Active Links</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission Info */}
          <Card>
            <CardHeader>
              <CardTitle>Commission Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Commission Rate</span>
                <Badge variant="default">{affiliateStats.commissionRate}%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Payment Method</span>
                <span className="text-sm text-muted-foreground">PayPal</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Next Payout</span>
                <span className="text-sm text-muted-foreground">Jan 30</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Minimum Payout</span>
                <span className="text-sm text-muted-foreground">$50</span>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/dashboard/payouts">Request Payout</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Affiliate Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Marketing Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/affiliate/banners">Banner Gallery</Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/affiliate/guide">Affiliate Guide</Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/affiliate/terms">Terms & Conditions</Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/affiliate/support">Get Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Performance Tips */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Performance Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Optimize Your Content</p>
                  <p className="text-muted-foreground">Create engaging content around products you promote</p>
                </div>
                <div>
                  <p className="font-medium">Track Performance</p>
                  <p className="text-muted-foreground">Monitor which links perform best and focus on those</p>
                </div>
                <div>
                  <p className="font-medium">Build Trust</p>
                  <p className="text-muted-foreground">Be transparent about affiliate relationships</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;
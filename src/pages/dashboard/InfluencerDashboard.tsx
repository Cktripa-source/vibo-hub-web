import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Eye, Heart, TrendingUp, Camera, Plus, BarChart, Handshake } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Progress } from '../../components/ui/progress';
import { Separator } from '../../components/ui/separator';

const InfluencerDashboard = () => {
  const { user } = useAuth();

  // Mock influencer stats
  const influencerStats = {
    totalFollowers: 125000,
    monthlyReach: 85000,
    engagementRate: 4.8,
    activeCampaigns: 5,
    totalEarnings: 3200.50,
    monthlyEarnings: 850.00,
    averageViews: 15000,
    collaborations: 23
  };

  const activeCampaigns = [
    {
      id: 'camp_1',
      brand: 'TechStore Inc',
      product: 'Premium Wireless Headphones',
      type: 'Product Review',
      deadline: '2024-01-25',
      payment: 150.00,
      status: 'In Progress',
      requirements: ['Unboxing video', 'Instagram posts', 'Story highlights']
    },
    {
      id: 'camp_2',
      brand: 'Fashion Forward',
      product: 'Summer Collection',
      type: 'Brand Partnership',
      deadline: '2024-01-30',
      payment: 500.00,
      status: 'Review',
      requirements: ['Outfit posts', 'Try-on haul', 'Discount code promotion']
    }
  ];

  const recentCollaborations = [
    {
      id: 'collab_1',
      brand: 'Apple Authorized',
      product: 'MacBook Pro',
      earnings: 800.00,
      reach: 45000,
      engagement: 2150,
      completedDate: '2024-01-10'
    },
    {
      id: 'collab_2',
      brand: 'Mobile World',
      product: 'iPhone 15 Pro',
      earnings: 600.00,
      reach: 38000,
      engagement: 1890,
      completedDate: '2024-01-05'
    }
  ];

  const quickActions = [
    { 
      icon: Plus, 
      label: 'Create Campaign', 
      href: '/dashboard/campaigns/create', 
      description: 'Start new campaign',
      color: 'text-green-600 dark:text-green-400'
    },
    { 
      icon: Camera, 
      label: 'Content Hub', 
      href: '/dashboard/content', 
      description: 'Manage your content',
      color: 'text-blue-600 dark:text-blue-400'
    },
    { 
      icon: Handshake, 
      label: 'Find Brands', 
      href: '/dashboard/collaborations', 
      description: 'Discover partnerships',
      color: 'text-purple-600 dark:text-purple-400'
    },
    { 
      icon: BarChart, 
      label: 'Analytics', 
      href: '/dashboard/analytics', 
      description: 'Track performance',
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const statCards = [
    { 
      title: 'Total Followers', 
      value: `${(influencerStats.totalFollowers / 1000).toFixed(0)}K`, 
      icon: Users, 
      change: '+5.2%',
      changeType: 'positive'
    },
    { 
      title: 'Monthly Reach', 
      value: `${(influencerStats.monthlyReach / 1000).toFixed(0)}K`, 
      icon: Eye, 
      change: '+12.1%',
      changeType: 'positive'
    },
    { 
      title: 'Engagement Rate', 
      value: `${influencerStats.engagementRate}%`, 
      icon: Heart, 
      change: '+0.8%',
      changeType: 'positive'
    },
    { 
      title: 'Monthly Earnings', 
      value: `$${influencerStats.monthlyEarnings.toLocaleString()}`, 
      icon: TrendingUp, 
      change: '+18.5%',
      changeType: 'positive'
    }
  ];

  const socialPlatforms = [
    { name: 'Instagram', followers: 65000, growth: '+3.2%', color: 'bg-pink-500' },
    { name: 'TikTok', followers: 45000, growth: '+8.1%', color: 'bg-black' },
    { name: 'YouTube', followers: 15000, growth: '+2.5%', color: 'bg-red-500' }
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
            <h1 className="text-3xl font-bold">Influencer Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Manage your campaigns and collaborations.
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
                Manage your influencer activities
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

          {/* Active Campaigns */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Campaigns</CardTitle>
                  <CardDescription>Your ongoing brand partnerships and campaigns</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/campaigns">View All Campaigns</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCampaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{campaign.product}</h3>
                        <p className="text-sm text-muted-foreground">by {campaign.brand}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={campaign.status === 'In Progress' ? 'default' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                        <p className="text-sm font-semibold mt-1">${campaign.payment}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Campaign Type</p>
                        <p className="font-medium">{campaign.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Deadline</p>
                        <p className="font-medium">{campaign.deadline}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-muted-foreground text-sm mb-2">Requirements:</p>
                      <div className="flex flex-wrap gap-2">
                        {campaign.requirements.map((req, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Collaborations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Collaborations</CardTitle>
              <CardDescription>Your completed partnerships and their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCollaborations.map((collab) => (
                  <div key={collab.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{collab.product}</h3>
                        <p className="text-sm text-muted-foreground">by {collab.brand}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${collab.earnings}</p>
                        <p className="text-xs text-muted-foreground">{collab.completedDate}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <p className="font-semibold">{(collab.reach / 1000).toFixed(0)}K</p>
                        <p className="text-muted-foreground text-xs">Reach</p>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <p className="font-semibold">{collab.engagement.toLocaleString()}</p>
                        <p className="text-muted-foreground text-xs">Engagement</p>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <p className="font-semibold">{((collab.engagement / collab.reach) * 100).toFixed(1)}%</p>
                        <p className="text-muted-foreground text-xs">Eng. Rate</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Social Media Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media Overview</CardTitle>
              <CardDescription>Your follower count across platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialPlatforms.map((platform) => (
                <div key={platform.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
                    <span className="font-medium">{platform.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{(platform.followers / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-green-600">{platform.growth}</p>
                  </div>
                </div>
              ))}
              <Separator className="my-4" />
              <div className="text-center">
                <p className="text-2xl font-bold">{(influencerStats.totalFollowers / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Total Followers</p>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>Your content performance this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Engagement Goal</span>
                  <span className="text-sm">85%</span>
                </div>
                <Progress value={85} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground">
                  4.8% of 5.5% target engagement rate
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-bold text-blue-600">{(influencerStats.averageViews / 1000).toFixed(0)}K</p>
                  <p className="text-muted-foreground">Avg. Views</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-lg font-bold text-purple-600">{influencerStats.activeCampaigns}</p>
                  <p className="text-muted-foreground">Active Campaigns</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Earnings Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Earnings Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Earnings</span>
                <span className="font-semibold">${influencerStats.totalEarnings.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">This Month</span>
                <span className="font-semibold text-green-600">${influencerStats.monthlyEarnings.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Payments</span>
                <span className="text-sm text-muted-foreground">$450.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Next Payout</span>
                <span className="text-sm text-muted-foreground">Feb 1</span>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/dashboard/earnings">View Details</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Influencer Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Creator Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/influencer/guide">Creator Guide</Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/influencer/brand-directory">Brand Directory</Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/influencer/content-templates">Content Templates</Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/influencer/support">Get Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Growth Tips */}
          <Card>
            <CardHeader>
              <CardTitle>📈 Growth Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Consistent Posting</p>
                  <p className="text-muted-foreground">Maintain regular content schedule</p>
                </div>
                <div>
                  <p className="font-medium">Engage with Audience</p>
                  <p className="text-muted-foreground">Respond to comments and messages</p>
                </div>
                <div>
                  <p className="font-medium">Quality over Quantity</p>
                  <p className="text-muted-foreground">Focus on high-quality content</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDashboard;
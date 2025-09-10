import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Heart, 
  Star, 
  Bell, 
  Wallet, 
  Settings,
  Users,
  BarChart3,
  DollarSign,
  ExternalLink,
  UserCheck,
  TrendingUp,
  Camera,
  Handshake,
  FileText,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { cn } from '../ui/utils';

const DashboardSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Common navigation items for all users
  const commonNavItems = [
    {
      label: 'Overview',
      href: '/dashboard',
      icon: Home,
      description: 'Dashboard overview'
    },
    {
      label: 'Orders',
      href: '/dashboard/orders',
      icon: ShoppingCart,
      description: 'Track your orders'
    },
    {
      label: 'Wishlist',
      href: '/dashboard/wishlist',
      icon: Heart,
      description: 'Saved items'
    },
    {
      label: 'Reviews',
      href: '/dashboard/reviews',
      icon: Star,
      description: 'Your reviews'
    },
    {
      label: 'Notifications',
      href: '/dashboard/notifications',
      icon: Bell,
      description: 'Activity updates'
    },
    {
      label: 'Wallet',
      href: '/dashboard/wallet',
      icon: Wallet,
      description: 'Balance & transactions'
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      description: 'Account settings'
    }
  ];

  // Role-specific navigation items
  const vendorNavItems = [
    {
      label: 'Products',
      href: '/dashboard/products',
      icon: Package,
      description: 'Manage inventory'
    },
    {
      label: 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      description: 'Sales insights'
    },
    {
      label: 'Withdrawals',
      href: '/dashboard/withdrawals',
      icon: DollarSign,
      description: 'Request payouts'
    }
  ];

  const affiliateNavItems = [
    {
      label: 'Affiliate Links',
      href: '/dashboard/links',
      icon: ExternalLink,
      description: 'Manage links'
    },
    {
      label: 'Commissions',
      href: '/dashboard/commissions',
      icon: DollarSign,
      description: 'Track earnings'
    },
    {
      label: 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      description: 'Performance metrics'
    }
  ];

  const influencerNavItems = [
    {
      label: 'Campaigns',
      href: '/dashboard/campaigns',
      icon: TrendingUp,
      description: 'Manage campaigns'
    },
    {
      label: 'Collaborations',
      href: '/dashboard/collaborations',
      icon: Handshake,
      description: 'Brand partnerships'
    },
    {
      label: 'Content Hub',
      href: '/dashboard/content',
      icon: Camera,
      description: 'Create content'
    }
  ];

  const adminNavItems = [
    {
      label: 'User Management',
      href: '/dashboard/users',
      icon: Users,
      description: 'Manage users'
    },
    {
      label: 'Product Approval',
      href: '/dashboard/products/approval',
      icon: UserCheck,
      description: 'Review products'
    },
    {
      label: 'Reports',
      href: '/dashboard/reports',
      icon: FileText,
      description: 'Platform reports'
    },
    {
      label: 'System Settings',
      href: '/dashboard/system',
      icon: AlertTriangle,
      description: 'System config'
    }
  ];

  // Get role-specific items
  const getRoleSpecificItems = () => {
    switch (user?.role) {
      case 'vendor':
        return vendorNavItems;
      case 'affiliate':
        return affiliateNavItems;
      case 'influencer':
        return influencerNavItems;
      case 'admin':
        return adminNavItems;
      default:
        return [];
    }
  };

  const roleSpecificItems = getRoleSpecificItems();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      {/* Header */}
      <div className="p-6">
        <Link 
          to="/" 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm text-muted-foreground">Back to Store</span>
        </Link>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <p className="text-sm text-muted-foreground capitalize">
            {user?.role} Portal
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto px-4 pb-4">
        {/* Common Navigation */}
        <div className="space-y-1">
          {commonNavItems.map(({ label, href, icon: Icon, description }) => (
            <Link
              key={href}
              to={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                isActive(href) 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <div className="flex-1 min-w-0">
                <div className="truncate">{label}</div>
              </div>
              {/* Notification badges for specific items */}
              {label === 'Notifications' && (
                <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                  3
                </Badge>
              )}
              {label === 'Orders' && user?.role === 'vendor' && (
                <Badge variant="secondary" className="h-5 w-5 p-0 text-xs">
                  2
                </Badge>
              )}
            </Link>
          ))}
        </div>

        {/* Role-specific Navigation */}
        {roleSpecificItems.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-1">
              <h3 className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {user?.role === 'vendor' && 'Vendor Tools'}
                {user?.role === 'affiliate' && 'Affiliate Tools'}
                {user?.role === 'influencer' && 'Creator Tools'}
                {user?.role === 'admin' && 'Admin Tools'}
              </h3>
              {roleSpecificItems.map(({ label, href, icon: Icon, description }) => (
                <Link
                  key={href}
                  to={href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                    isActive(href) 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{label}</div>
                  </div>
                  {/* Role-specific notification badges */}
                  {label === 'Product Approval' && user?.role === 'admin' && (
                    <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                      23
                    </Badge>
                  )}
                  {label === 'Products' && user?.role === 'vendor' && (
                    <Badge variant="secondary" className="h-5 w-5 p-0 text-xs">
                      3
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {/* User Info */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm">
              {user?.name?.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="truncate text-sm font-medium">{user?.name}</div>
            <div className="truncate text-xs text-muted-foreground">
              {user?.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
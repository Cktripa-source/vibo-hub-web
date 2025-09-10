import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Dashboard Components
import CustomerDashboard from './CustomerDashboard';
import VendorDashboard from './VendorDashboard';
import AffiliateDashboard from './AffiliateDashboard';
import InfluencerDashboard from './InfluencerDashboard';
import AdminDashboard from './AdminDashboard';

// Shared Dashboard Pages
import Orders from './shared/Orders';
import Wishlist from './shared/Wishlist';
import Reviews from './shared/Reviews';
import Notifications from './shared/Notifications';
import Wallet from './shared/Wallet';
import Settings from './shared/Settings';

// Dashboard Layout
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const getDashboardComponent = () => {
    switch (user.role) {
      case 'vendor':
        return <VendorDashboard />;
      case 'affiliate':
        return <AffiliateDashboard />;
      case 'influencer':
        return <InfluencerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <CustomerDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-muted/10">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          {/* Main Dashboard */}
          <Route path="/" element={getDashboardComponent()} />
          
          {/* Shared Routes */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Vendor Specific Routes */}
          {user.role === 'vendor' && (
            <>
              <Route path="/products" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-6">Vendor Products</h1><p className="text-muted-foreground">Manage your product inventory and listings.</p></div>} />
              <Route path="/analytics" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-6">Vendor Analytics</h1><p className="text-muted-foreground">Track your sales performance and insights.</p></div>} />
              <Route path="/withdrawals" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-6">Withdrawals</h1><p className="text-muted-foreground">Request payouts and manage withdrawals.</p></div>} />
            </>
          )}
          
          {/* Affiliate Specific Routes */}
          {user.role === 'affiliate' && (
            <>
              <Route path="/links" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-6">Affiliate Links</h1><p className="text-muted-foreground">Generate and manage your affiliate links.</p></div>} />
              <Route path="/commissions" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-6">Commissions</h1><p className="text-muted-foreground">Track your commission earnings and payouts.</p></div>} />
              <Route path="/analytics" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-6">Affiliate Analytics</h1><p className="text-muted-foreground">Monitor your performance and conversion rates.</p></div>} />
            </>
          )}
          
          {/* Influencer Specific Routes */}
          {user.role === 'influencer' && (
            <>
              <Route path="/campaigns" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-6">Campaigns</h1><p className="text-muted-foreground">Manage your influencer campaigns and partnerships.</p></div>} />
              <Route path="/collaborations" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-6">Collaborations</h1><p className="text-muted-foreground">Find and manage brand collaborations.</p></div>} />
              <Route path="/content" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-6">Content Hub</h1><p className="text-muted-foreground">Create and manage your content library.</p></div>} />
            </>
          )}
          
          {/* Admin Specific Routes */}
          {user.role === 'admin' && (
            <>
              <Route path="/users" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-6">User Management</h1><p className="text-muted-foreground">Manage platform users and permissions.</p></div>} />
              <Route path="/products/approval" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-6">Product Approval</h1><p className="text-muted-foreground">Review and approve vendor product listings.</p></div>} />
              <Route path="/reports" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-6">Reports</h1><p className="text-muted-foreground">View platform analytics and reports.</p></div>} />
              <Route path="/system" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold mb-6">System Settings</h1><p className="text-muted-foreground">Configure platform settings and preferences.</p></div>} />
            </>
          )}
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
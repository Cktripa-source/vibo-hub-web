import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { 
  Wallet as WalletIcon, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft,
  Plus,
  ArrowLeft,
  Filter,
  Eye,
  Download
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';

const Wallet = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [addFundsAmount, setAddFundsAmount] = useState('');

  // Mock wallet data based on user role
  const walletData = {
    customer: {
      balance: 150.00,
      pendingRefunds: 25.50,
      loyaltyPoints: 2450,
      pointsValue: 24.50
    },
    vendor: {
      balance: 5250.75,
      pendingEarnings: 850.30,
      totalEarnings: 15420.50,
      monthlyEarnings: 2150.25
    },
    affiliate: {
      balance: 2850.75,
      pendingCommissions: 485.20,
      totalCommissions: 8920.50,
      monthlyCommissions: 645.30
    },
    influencer: {
      balance: 3200.50,
      pendingPayments: 650.00,
      totalEarnings: 12500.00,
      monthlyEarnings: 850.00
    },
    admin: {
      platformBalance: 125000.50,
      monthlyRevenue: 45000.75,
      pendingPayouts: 8500.25,
      totalTransactions: 25600
    }
  };

  // Mock transaction history
  const [transactions] = useState([
    {
      id: 'TXN-001',
      type: user?.role === 'customer' ? 'refund' : 'earnings',
      amount: user?.role === 'customer' ? 89.99 : 299.99,
      description: user?.role === 'customer' 
        ? 'Refund for Smart Watch Pro' 
        : 'Commission for Premium Headphones',
      date: '2024-01-15',
      status: 'Completed',
      reference: 'ORD-001'
    },
    {
      id: 'TXN-002',
      type: user?.role === 'customer' ? 'loyalty_reward' : 'withdrawal',
      amount: user?.role === 'customer' ? 15.00 : 500.00,
      description: user?.role === 'customer' 
        ? 'Loyalty points reward' 
        : 'Withdrawal to bank account',
      date: '2024-01-12',
      status: 'Completed',
      reference: user?.role === 'customer' ? 'LOYALTY-001' : 'WD-001'
    },
    {
      id: 'TXN-003',
      type: user?.role === 'customer' ? 'purchase' : 'earnings',
      amount: user?.role === 'customer' ? -149.99 : 75.50,
      description: user?.role === 'customer' 
        ? 'Purchase: Wireless Mouse Pro' 
        : 'Affiliate commission',
      date: '2024-01-10',
      status: 'Completed',
      reference: 'ORD-003'
    },
    {
      id: 'TXN-004',
      type: 'withdrawal',
      amount: -200.00,
      description: 'Withdrawal to PayPal',
      date: '2024-01-08',
      status: 'Pending',
      reference: 'WD-002'
    }
  ]);

  const currentWallet = walletData[user?.role as keyof typeof walletData] || walletData.customer;

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (amount > (currentWallet.balance || 0)) {
      toast.error('Insufficient balance');
      return;
    }

    toast.success(`Withdrawal request for $${amount} submitted successfully`);
    setWithdrawAmount('');
  };

  const handleAddFunds = () => {
    const amount = parseFloat(addFundsAmount);
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    toast.success(`$${amount} added to your wallet successfully`);
    setAddFundsAmount('');
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earnings':
      case 'refund':
      case 'loyalty_reward':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'withdrawal':
      case 'purchase':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="default">Completed</Badge>;
      case 'Pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'Failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <WalletIcon className="h-8 w-8" />
            Wallet
          </h1>
          <p className="text-muted-foreground">
            Manage your balance and transaction history
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <WalletIcon className="h-5 w-5 text-muted-foreground" />
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">${currentWallet.balance?.toFixed(2) || '0.00'}</p>
              <p className="text-sm text-muted-foreground">Available Balance</p>
            </div>
          </CardContent>
        </Card>

        {user?.role === 'customer' && (
          <>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">${(currentWallet as any).pendingRefunds?.toFixed(2) || '0.00'}</p>
                  <p className="text-sm text-muted-foreground">Pending Refunds</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{(currentWallet as any).loyaltyPoints?.toLocaleString() || '0'}</p>
                  <p className="text-sm text-muted-foreground">Loyalty Points</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">${(currentWallet as any).pointsValue?.toFixed(2) || '0.00'}</p>
                  <p className="text-sm text-muted-foreground">Points Value</p>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {(user?.role === 'vendor' || user?.role === 'affiliate' || user?.role === 'influencer') && (
          <>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    ${((currentWallet as any).pendingEarnings || (currentWallet as any).pendingCommissions || (currentWallet as any).pendingPayments)?.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user?.role === 'vendor' ? 'Pending Earnings' : 
                     user?.role === 'affiliate' ? 'Pending Commissions' : 'Pending Payments'}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    ${((currentWallet as any).totalEarnings || (currentWallet as any).totalCommissions)?.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user?.role === 'affiliate' ? 'Total Commissions' : 'Total Earnings'}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    ${((currentWallet as any).monthlyEarnings || (currentWallet as any).monthlyCommissions)?.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {user?.role === 'customer' && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Funds
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Funds to Wallet</DialogTitle>
                      <DialogDescription>
                        Add money to your wallet for faster checkouts
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Amount</label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={addFundsAmount}
                          onChange={(e) => setAddFundsAmount(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Payment Method</label>
                        <Select defaultValue="card">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="card">Credit/Debit Card</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleAddFunds} className="w-full">
                        Add Funds
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}

              {(user?.role === 'vendor' || user?.role === 'affiliate' || user?.role === 'influencer') && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Request Withdrawal
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Withdrawal</DialogTitle>
                      <DialogDescription>
                        Withdraw your earnings to your preferred payment method
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Amount</label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Available: ${currentWallet.balance?.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Withdrawal Method</label>
                        <Select defaultValue="bank">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="stripe">Stripe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleWithdraw} className="w-full">
                        Request Withdrawal
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}

              <Button variant="outline" className="w-full" asChild>
                <Link to="/profile">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Methods
                </Link>
              </Button>

              {user?.role === 'customer' && (
                <Button variant="outline" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Redeem Points
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Balance Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Balance Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Available</span>
                  <span className="font-medium">${currentWallet.balance?.toFixed(2)}</span>
                </div>
                {user?.role === 'customer' && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pending Refunds</span>
                      <span className="font-medium">${(currentWallet as any).pendingRefunds?.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Loyalty Points</span>
                      <span className="font-medium">{(currentWallet as any).loyaltyPoints?.toLocaleString()}</span>
                    </div>
                  </>
                )}
                {(user?.role === 'vendor' || user?.role === 'affiliate' || user?.role === 'influencer') && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pending</span>
                    <span className="font-medium">
                      ${((currentWallet as any).pendingEarnings || (currentWallet as any).pendingCommissions || (currentWallet as any).pendingPayments)?.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="all" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Transactions</TabsTrigger>
                <TabsTrigger value="earnings">
                  {user?.role === 'customer' ? 'Credits' : 'Earnings'}
                </TabsTrigger>
                <TabsTrigger value="withdrawals">
                  {user?.role === 'customer' ? 'Payments' : 'Withdrawals'}
                </TabsTrigger>
              </TabsList>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>All Transactions</CardTitle>
                  <CardDescription>Complete transaction history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-muted rounded-lg">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{transaction.description}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold ${
                                transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                              </span>
                              {getStatusBadge(transaction.status)}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{transaction.date}</span>
                            <span>Ref: {transaction.reference}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="earnings">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {user?.role === 'customer' ? 'Credits & Refunds' : 'Earnings'}
                  </CardTitle>
                  <CardDescription>Incoming transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.filter(t => t.amount > 0).map((transaction) => (
                      <div key={transaction.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-muted rounded-lg">
                          <ArrowDownLeft className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{transaction.description}</h4>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-green-600">
                                +${transaction.amount.toFixed(2)}
                              </span>
                              {getStatusBadge(transaction.status)}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{transaction.date}</span>
                            <span>Ref: {transaction.reference}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="withdrawals">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {user?.role === 'customer' ? 'Payments' : 'Withdrawals'}
                  </CardTitle>
                  <CardDescription>Outgoing transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.filter(t => t.amount < 0).map((transaction) => (
                      <div key={transaction.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-muted rounded-lg">
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{transaction.description}</h4>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-red-600">
                                ${Math.abs(transaction.amount).toFixed(2)}
                              </span>
                              {getStatusBadge(transaction.status)}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{transaction.date}</span>
                            <span>Ref: {transaction.reference}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
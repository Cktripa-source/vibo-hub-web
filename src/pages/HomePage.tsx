import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Users, TrendingUp, Shield, Star, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const HomePage = () => {
  const featuredProducts = [
    {
      id: 'prod_1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1609255386725-b9b6a8ad829c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBwcm9kdWN0fGVufDF8fHx8MTc1NzMxNDY3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.8,
      reviews: 1248,
      vendor: 'TechStore Inc',
      badge: 'Best Seller'
    },
    {
      id: 'prod_2',
      name: 'MacBook Pro 16-inch',
      price: 2399.99,
      originalPrice: 2599.99,
      image: 'https://images.unsplash.com/photo-1737868131581-6379cdee4ec3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU3MzQ0MjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.9,
      reviews: 856,
      vendor: 'Apple Authorized',
      badge: 'New'
    },
    {
      id: 'prod_3',
      name: 'iPhone 15 Pro Max',
      price: 1199.99,
      originalPrice: 1299.99,
      image: 'https://images.unsplash.com/photo-1640936343842-268f9d87e764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwZGV2aWNlfGVufDF8fHx8MTc1NzM2NTY2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.7,
      reviews: 2341,
      vendor: 'Mobile World',
      badge: 'Sale'
    }
  ];

  const categories = [
    { name: 'Electronics', icon: '📱', count: '10,000+', href: '/category/electronics' },
    { name: 'Fashion', icon: '👕', count: '25,000+', href: '/category/fashion' },
    { name: 'Home & Garden', icon: '🏠', count: '15,000+', href: '/category/home' },
    { name: 'Sports', icon: '⚽', count: '8,000+', href: '/category/sports' },
    { name: 'Books', icon: '📚', count: '50,000+', href: '/category/books' },
    { name: 'Health', icon: '💊', count: '12,000+', href: '/category/health' },
  ];

  const platformStats = [
    { icon: ShoppingBag, label: 'Products', value: '100K+' },
    { icon: Users, label: 'Active Vendors', value: '5K+' },
    { icon: TrendingUp, label: 'Monthly Sales', value: '$10M+' },
    { icon: Shield, label: 'Happy Customers', value: '250K+' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Verified Customer',
      rating: 5,
      comment: 'Amazing platform! Found exactly what I was looking for with great prices and fast shipping.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b739?w=150&h=150&fit=crop&crop=faces'
    },
    {
      name: 'Mike Chen',
      role: 'Vendor Partner',
      rating: 5,
      comment: 'As a vendor, this platform has helped me reach thousands of new customers. Excellent support team!',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Affiliate Marketer',
      rating: 5,
      comment: 'The affiliate program is fantastic. Great commission rates and easy-to-use tracking tools.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🎉 Welcome to the Future of E-commerce
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Discover, Shop & 
                  <span className="text-primary"> Connect</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Your premier destination for quality products from trusted vendors, 
                  affiliates, and influencers. Join our thriving marketplace today.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8">
                  <Link to="/products">
                    Start Shopping
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8">
                  <Link to="/register">
                    Join as Partner
                  </Link>
                </Button>
              </div>

              {/* Platform Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {platformStats.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="text-center">
                    <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-sm text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1659353741479-39e77ffefd85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjBoZXJvfGVufDF8fHx8MTc1NzQwNDYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Modern E-commerce Platform"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse range of categories with products from verified vendors worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.name} to={category.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-muted-foreground">
                Handpicked products from our top-rated vendors
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">
                View All
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4" variant={
                      product.badge === 'Sale' ? 'destructive' : 
                      product.badge === 'New' ? 'default' : 'secondary'
                    }>
                      {product.badge}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">by {product.vendor}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{product.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({product.reviews.toLocaleString()} reviews)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">${product.price}</span>
                        <span className="text-lg text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Business Opportunities */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Grow Your Business With Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful partners who have built thriving businesses on our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Become a Vendor',
                description: 'Start selling your products to millions of customers worldwide.',
                icon: '🏪',
                href: '/vendor/register',
                benefits: ['No listing fees', '24/7 support', 'Global reach']
              },
              {
                title: 'Join Affiliate Program',
                description: 'Earn commissions by promoting products you love.',
                icon: '💰',
                href: '/affiliate/register',
                benefits: ['Up to 15% commission', 'Real-time tracking', 'Monthly payouts']
              },
              {
                title: 'Influencer Hub',
                description: 'Collaborate with brands and monetize your content.',
                icon: '⭐',
                href: '/influencer/register',
                benefits: ['Brand partnerships', 'Custom campaigns', 'Performance analytics']
              },
              {
                title: 'Enterprise Solutions',
                description: 'Scalable solutions for large businesses and organizations.',
                icon: '🏢',
                href: '/enterprise',
                benefits: ['Custom integrations', 'Dedicated support', 'Volume discounts']
              }
            ].map((opportunity) => (
              <Card key={opportunity.title} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{opportunity.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {opportunity.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {opportunity.description}
                  </p>
                  <ul className="space-y-1 mb-6">
                    {opportunity.benefits.map((benefit) => (
                      <li key={benefit} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link to={opportunity.href}>
                      Learn More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What Our Community Says
            </h2>
            <p className="text-lg text-muted-foreground">
              Real feedback from real people in our marketplace
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-6">
                    "{testimonial.comment}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join millions of satisfied customers and discover amazing products from verified vendors worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8">
              <Link to="/register">
                Create Free Account
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/products">
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
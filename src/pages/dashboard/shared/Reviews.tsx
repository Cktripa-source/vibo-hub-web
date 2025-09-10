import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { Star, Search, Edit3, Trash2, ArrowLeft, Plus, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

const Reviews = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [editingReview, setEditingReview] = useState<any>(null);
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');

  // Mock reviews data
  const [reviews, setReviews] = useState([
    {
      id: 'REV-001',
      productId: 'PROD-001',
      productName: 'Premium Wireless Headphones',
      productImage: 'https://images.unsplash.com/photo-1609255386725-b9b6a8ad829c?w=80&h=80&fit=crop',
      rating: 5,
      title: 'Amazing sound quality!',
      review: 'These headphones exceeded my expectations. The sound quality is crystal clear, and the battery life is excellent. Perfect for long work sessions and commutes.',
      date: '2024-01-15',
      verified: true,
      helpful: 23,
      vendor: 'AudioTech',
      orderId: 'ORD-001'
    },
    {
      id: 'REV-002',
      productId: 'PROD-002',
      productName: 'Smart Watch Pro',
      productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
      rating: 4,
      title: 'Good smartwatch with minor issues',
      review: 'Overall a solid smartwatch. The fitness tracking is accurate and the battery lasts about 2 days. The interface could be more intuitive, but it gets the job done.',
      date: '2024-01-12',
      verified: true,
      helpful: 15,
      vendor: 'WearTech',
      orderId: 'ORD-002'
    },
    {
      id: 'REV-003',
      productId: 'PROD-003',
      productName: 'Wireless Mouse Pro',
      productImage: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=80&h=80&fit=crop',
      rating: 3,
      title: 'Decent mouse but overpriced',
      review: 'The mouse works fine and is comfortable to use. However, I think it\'s a bit overpriced for what you get. The wireless connection is stable though.',
      date: '2024-01-08',
      verified: true,
      helpful: 8,
      vendor: 'TechStore Inc',
      orderId: 'ORD-003'
    }
  ]);

  const handleEditReview = (review: any) => {
    setEditingReview(review);
    setNewRating(review.rating);
    setNewReviewText(review.review);
  };

  const handleUpdateReview = () => {
    if (!newReviewText.trim()) {
      toast.error('Please write a review');
      return;
    }

    setReviews(prev => prev.map(review => 
      review.id === editingReview.id 
        ? { ...review, rating: newRating, review: newReviewText, date: new Date().toISOString().split('T')[0] }
        : review
    ));

    setEditingReview(null);
    setNewRating(5);
    setNewReviewText('');
    toast.success('Review updated successfully!');
  };

  const handleDeleteReview = (reviewId: string, productName: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
    toast.success(`Review for ${productName} deleted`);
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    return matchesSearch && matchesRating;
  });

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Reviews</h1>
          <p className="text-muted-foreground">
            Reviews you've written • {reviews.length} reviews • {averageRating.toFixed(1)} average rating
          </p>
        </div>
        <Button asChild>
          <Link to="/products">
            <Plus className="h-4 w-4 mr-2" />
            Write New Review
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar - Review Stats */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{averageRating.toFixed(1)}</p>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(averageRating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {reviews.length} reviews
                </p>
              </div>
              
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-2 text-sm">
                    <span className="flex items-center gap-1 w-12">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {rating}
                    </span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-muted-foreground">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Review Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Reviews</span>
                <Badge variant="outline">{reviews.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Verified Reviews</span>
                <Badge variant="default">{reviews.filter(r => r.verified).length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Helpful Votes</span>
                <span className="text-sm font-medium">
                  {reviews.reduce((acc, review) => acc + review.helpful, 0)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by product name, title, or vendor..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reviews List */}
          {filteredReviews.length > 0 ? (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <ImageWithFallback
                        src={review.productImage}
                        alt={review.productName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{review.productName}</h3>
                            <p className="text-sm text-muted-foreground">by {review.vendor}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {review.verified && (
                              <Badge variant="default" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                            <div className="flex items-center gap-1">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>

                        <h4 className="font-medium mb-2">{review.title}</h4>
                        <p className="text-muted-foreground mb-3">{review.review}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Reviewed on {review.date}</span>
                            <span>Order: {review.orderId}</span>
                            <span>{review.helpful} found helpful</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => handleEditReview(review)}>
                                  <Edit3 className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Review</DialogTitle>
                                  <DialogDescription>
                                    Update your review for {review.productName}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <label className="text-sm font-medium mb-2 block">Rating</label>
                                    <div className="flex items-center gap-1">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <button
                                          key={i}
                                          onClick={() => setNewRating(i + 1)}
                                          className="focus:outline-none"
                                        >
                                          <Star 
                                            className={`h-6 w-6 ${
                                              i < newRating 
                                                ? 'fill-yellow-400 text-yellow-400' 
                                                : 'text-muted-foreground hover:text-yellow-400'
                                            }`} 
                                          />
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium mb-2 block">Review</label>
                                    <Textarea
                                      value={newReviewText}
                                      onChange={(e) => setNewReviewText(e.target.value)}
                                      placeholder="Write your review..."
                                      rows={4}
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <Button onClick={handleUpdateReview}>Update Review</Button>
                                    <Button variant="outline" onClick={() => setEditingReview(null)}>
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteReview(review.id, review.productName)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">
                    {searchQuery || ratingFilter !== 'all' 
                      ? 'No reviews match your filters' 
                      : 'No reviews yet'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || ratingFilter !== 'all'
                      ? 'Try adjusting your search or filter criteria'
                      : 'Start writing reviews for products you\'ve purchased'}
                  </p>
                  <Button asChild>
                    <Link to="/products">
                      Browse Products
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
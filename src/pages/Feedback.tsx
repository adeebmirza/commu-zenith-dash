import { MessageSquare, Star, Filter, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { feedbackData } from "@/data/mockData";
import { useState } from "react";

const categoryColors = {
  General: "bg-primary/10 text-primary border-primary/20",
  Content: "bg-success/10 text-success border-success/20", 
  Interface: "bg-warning/10 text-warning border-warning/20",
  Feature: "bg-destructive/10 text-destructive border-destructive/20"
};

export default function Feedback() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");

  const filteredFeedback = feedbackData.filter((feedback) => {
    const matchesSearch = feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || feedback.category === selectedCategory;
    const matchesRating = selectedRating === "all" || feedback.rating.toString() === selectedRating;
    
    return matchesSearch && matchesCategory && matchesRating;
  });

  const averageRating = (feedbackData.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbackData.length).toFixed(1);
  const totalFeedback = feedbackData.length;
  
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: feedbackData.filter(f => f.rating === rating).length,
    percentage: (feedbackData.filter(f => f.rating === rating).length / totalFeedback * 100).toFixed(1)
  }));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? 'fill-warning text-warning' 
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text">User Feedback</h1>
        <p className="text-muted-foreground">
          Collect and analyze community feedback to improve user experience
        </p>
      </div>

      {/* Feedback Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Feedback</p>
              <p className="text-2xl font-bold">{totalFeedback}</p>
            </div>
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Average Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{averageRating}</p>
                <div className="flex">
                  {renderStars(Math.round(parseFloat(averageRating)))}
                </div>
              </div>
            </div>
            <Star className="h-6 w-6 text-warning" />
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Positive Feedback</p>
              <p className="text-2xl font-bold">
                {feedbackData.filter(f => f.rating >= 4).length}
              </p>
              <p className="text-sm text-success">
                {((feedbackData.filter(f => f.rating >= 4).length / totalFeedback) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-success"></div>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Needs Attention</p>
              <p className="text-2xl font-bold">
                {feedbackData.filter(f => f.rating <= 3).length}
              </p>
              <p className="text-sm text-warning">
                {((feedbackData.filter(f => f.rating <= 3).length / totalFeedback) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="h-6 w-6 rounded-full bg-warning/20 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-warning"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="chart-container">
        <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-20">
                <span className="text-sm font-medium">{rating}</span>
                <Star className="h-3 w-3 fill-warning text-warning" />
              </div>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className="bg-warning h-2 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-muted-foreground w-16">
                {count} ({percentage}%)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="chart-container">
        <h3 className="text-lg font-semibold mb-4">Feedback Details</h3>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="Content">Content</SelectItem>
              <SelectItem value="Interface">Interface</SelectItem>
              <SelectItem value="Feature">Feature</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedRating} onValueChange={setSelectedRating}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Rating" />
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

        {/* Feedback List */}
        <div className="space-y-4">
          {filteredFeedback.map((feedback) => (
            <div key={feedback.id} className="p-4 border border-border/50 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {feedback.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{feedback.user}</p>
                    <p className="text-sm text-muted-foreground">{feedback.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={categoryColors[feedback.category as keyof typeof categoryColors]}
                  >
                    {feedback.category}
                  </Badge>
                  <div className="flex">
                    {renderStars(feedback.rating)}
                  </div>
                </div>
              </div>
              
              <p className="text-sm leading-relaxed">{feedback.feedback}</p>
            </div>
          ))}
          
          {filteredFeedback.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No feedback matches your current filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
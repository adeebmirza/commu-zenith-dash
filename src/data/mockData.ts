// Mock data for the dashboard

export const overviewStats = {
  totalPosts: 12850,
  totalLikes: 45620,
  totalComments: 8930,
  totalMembers: 2456,
  dailyGrowth: 2.3,
  weeklyGrowth: 8.7,
  monthlyGrowth: 24.5
};

export const analyticsData = {
  memberGain: [
    { month: 'Jan', gain: 145, loss: 12 },
    { month: 'Feb', gain: 189, loss: 8 },
    { month: 'Mar', gain: 234, loss: 15 },
    { month: 'Apr', gain: 156, loss: 21 },
    { month: 'May', gain: 287, loss: 9 },
    { month: 'Jun', gain: 321, loss: 13 }
  ],
  engagement: [
    { month: 'Jan', posts: 820, likes: 3450, comments: 890 },
    { month: 'Feb', posts: 950, likes: 4120, comments: 1200 },
    { month: 'Mar', posts: 1150, likes: 5230, comments: 1450 },
    { month: 'Apr', posts: 890, likes: 3890, comments: 980 },
    { month: 'May', posts: 1340, likes: 6780, comments: 1890 },
    { month: 'Jun', posts: 1580, likes: 8920, comments: 2340 }
  ],
  atmosphere: [
    { month: 'Jan', positive: 75, negative: 25 },
    { month: 'Feb', positive: 82, negative: 18 },
    { month: 'Mar', positive: 78, negative: 22 },
    { month: 'Apr', positive: 85, negative: 15 },
    { month: 'May', positive: 90, negative: 10 },
    { month: 'Jun', positive: 88, negative: 12 }
  ]
};

export const topMembers = [
  { name: "Alex Rodriguez", posts: 145, likes: 2340, avatar: "AR", role: "Senior Developer", badge: "🏆" },
  { name: "Sarah Chen", posts: 132, likes: 1890, avatar: "SC", role: "Product Manager", badge: "🥈" },
  { name: "Michael Johnson", posts: 98, likes: 1560, avatar: "MJ", role: "UI/UX Designer", badge: "🥉" },
  { name: "Emma Wilson", posts: 87, likes: 1340, avatar: "EW", role: "Full Stack Dev", badge: "⭐" },
  { name: "David Kim", posts: 76, likes: 1120, avatar: "DK", role: "DevOps Engineer", badge: "⭐" }
];

export const leastActiveMembers = [
  { name: "John Smith", lastActive: "30 days ago", posts: 1, avatar: "JS" },
  { name: "Lisa Brown", lastActive: "28 days ago", posts: 0, avatar: "LB" },
  { name: "Tom Wilson", lastActive: "25 days ago", posts: 2, avatar: "TW" },
  { name: "Anna Davis", lastActive: "22 days ago", posts: 1, avatar: "AD" },
  { name: "Mark Taylor", lastActive: "20 days ago", posts: 0, avatar: "MT" }
];

export const categoryData = {
  Achievement: { posts: 1234, percentage: 18.5, growth: 12.3 },
  Discussion: { posts: 2145, percentage: 32.1, growth: 8.7 },
  Learning: { posts: 987, percentage: 14.8, growth: 15.2 },
  Question: { posts: 1567, percentage: 23.5, growth: -2.1 },
  Announcement: { posts: 234, percentage: 3.5, growth: 5.4 },
  Help: { posts: 345, percentage: 5.2, growth: -1.8 },
  Feedback: { posts: 123, percentage: 1.8, growth: 22.1 },
  Others: { posts: 45, percentage: 0.7, growth: -5.2 }
};

export const companyData = {
  working: 1890,
  notWorking: 566,
  companies: [
    { name: "Google", employees: 234 },
    { name: "Microsoft", employees: 198 },
    { name: "Apple", employees: 156 },
    { name: "Amazon", employees: 143 },
    { name: "Meta", employees: 128 },
    { name: "Netflix", employees: 98 },
    { name: "Tesla", employees: 87 },
    { name: "Spotify", employees: 76 },
    { name: "Uber", employees: 65 },
    { name: "Others", employees: 705 }
  ]
};

export const feedbackData = [
  {
    id: 1,
    user: "Alex Rodriguez",
    avatar: "AR",
    feedback: "The community is amazing! Love the daily discussions and the learning resources shared here.",
    rating: 5,
    date: "2024-01-15",
    category: "General"
  },
  {
    id: 2,
    user: "Sarah Chen",
    avatar: "SC",
    feedback: "Would love to see more beginner-friendly content. Sometimes the discussions get too technical.",
    rating: 4,
    date: "2024-01-14",
    category: "Content"
  },
  {
    id: 3,
    user: "Michael Johnson",
    avatar: "MJ",
    feedback: "The UI could be improved. It's sometimes hard to navigate through different categories.",
    rating: 3,
    date: "2024-01-13",
    category: "Interface"
  }
];

export const suggestions = [
  {
    title: "Weekly Coding Challenges",
    description: "Implement weekly coding challenges to boost engagement and learning",
    priority: "High",
    impact: "Medium",
    effort: "Low"
  },
  {
    title: "Mentorship Program",
    description: "Create a mentorship system connecting experienced and new members",
    priority: "Medium", 
    impact: "High",
    effort: "High"
  },
  {
    title: "Daily Discussion Topics",
    description: "Automated daily discussion topics to maintain consistent engagement",
    priority: "Medium",
    impact: "Medium", 
    effort: "Low"
  }
];
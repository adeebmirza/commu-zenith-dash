import { useState } from "react";
import { Users, MessageSquare, Heart, FileText, TrendingUp, Award } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricCard } from "@/components/MetricCard";
import { TimeRangeSelector } from "@/components/TimeRangeSelector";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { overviewStats, topMembers, analyticsData } from "@/data/mockData";

const timeRangeOptions = [
  { value: "day", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "all", label: "All Time" }
];

const chartPeriodOptions = [
  { value: "3", label: "Last 3 Months" },
  { value: "6", label: "Last 6 Months" },
  { value: "12", label: "Last 12 Months" },
  { value: "24", label: "Last 24 Months" }
];

export default function Overview() {
  const [selectedPeriod, setSelectedPeriod] = useState("day");
  const [chartPeriod, setChartPeriod] = useState("6");

  const getGrowthValue = () => {
    switch (selectedPeriod) {
      case "day": return overviewStats.dailyGrowth;
      case "week": return overviewStats.weeklyGrowth;
      case "month": return overviewStats.monthlyGrowth;
      default: return 0;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Community Overview</h1>
          <p className="text-muted-foreground">
            Monitor your community's performance and key metrics
          </p>
        </div>
        <TimeRangeSelector 
          value={selectedPeriod} 
          onChange={setSelectedPeriod}
          options={timeRangeOptions}
        />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Members"
          value={overviewStats.totalMembers.toLocaleString()}
          change={getGrowthValue()}
          trend="up"
          icon={Users}
        />
        <MetricCard
          title="Total Posts"
          value={overviewStats.totalPosts.toLocaleString()}
          change={5.2}
          trend="up"
          icon={FileText}
        />
        <MetricCard
          title="Total Likes"
          value={overviewStats.totalLikes.toLocaleString()}
          change={12.3}
          trend="up"
          icon={Heart}
        />
        <MetricCard
          title="Total Comments"
          value={overviewStats.totalComments.toLocaleString()}
          change={8.1}
          trend="up"
          icon={MessageSquare}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Analytics Chart */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Community Growth</h3>
            <TimeRangeSelector 
              value={chartPeriod} 
              onChange={setChartPeriod}
              options={chartPeriodOptions}
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.engagement}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="posts" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Posts"
              />
              <Line 
                type="monotone" 
                dataKey="likes" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                name="Likes"
              />
              <Line 
                type="monotone" 
                dataKey="comments" 
                stroke="hsl(var(--warning))" 
                strokeWidth={2}
                name="Comments"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Members */}
        <div className="chart-container">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Top Community Members</h3>
          </div>
          <div className="space-y-4">
            {topMembers.map((member, index) => (
              <div key={member.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 text-lg">
                      {member.badge}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{member.posts} posts</p>
                  <p className="text-sm text-muted-foreground">{member.likes} likes</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
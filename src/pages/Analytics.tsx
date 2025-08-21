import { useState } from "react";
import { TrendingUp, TrendingDown, Users, Activity, AlertTriangle, MessageSquare } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { MetricCard } from "@/components/MetricCard";
import { TimeRangeSelector } from "@/components/TimeRangeSelector";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { analyticsData, leastActiveMembers } from "@/data/mockData";

const timeRangeOptions = [
  { value: "1", label: "1 Month" },
  { value: "3", label: "3 Months" },
  { value: "6", label: "6 Months" },
  { value: "12", label: "12 Months" },
];

export default function Analytics() {
  const [memberPeriod, setMemberPeriod] = useState("6");
  const [progressPeriod, setProgressPeriod] = useState("6");
  const [atmospherePeriod, setAtmospherePeriod] = useState("6");
  const [contentPeriod, setContentPeriod] = useState("6");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Deep dive into your community performance and member behavior
        </p>
      </div>

      {/* Member Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Member Gain"
          value="321"
          change={12.5}
          trend="up"
          icon={TrendingUp}
        />
        <MetricCard
          title="Member Loss"
          value="13"
          change={-2.1}
          trend="down"
          icon={TrendingDown}
        />
        <MetricCard
          title="Engagement Growth"
          value="24.5%"
          change={8.3}
          trend="up"
          icon={Activity}
        />
        <MetricCard
          title="Active Members"
          value="1,890"
          change={5.7}
          trend="up"
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Gain/Loss Chart */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Member Gain vs Loss</h3>
            <TimeRangeSelector 
              value={memberPeriod} 
              onChange={setMemberPeriod}
              options={timeRangeOptions}
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.memberGain}>
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
              <Bar dataKey="gain" fill="hsl(var(--success))" name="Member Gain" />
              <Bar dataKey="loss" fill="hsl(var(--destructive))" name="Member Loss" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Least Interactive Members */}
        <div className="chart-container">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h3 className="text-lg font-semibold">Least Active Members</h3>
          </div>
          <div className="space-y-3">
            {leastActiveMembers.map((member, index) => (
              <div key={member.name} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-destructive/10 text-destructive text-xs">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.posts} posts</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-destructive">{member.lastActive}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Progress Chart */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Community Progress</h3>
            <TimeRangeSelector 
              value={progressPeriod} 
              onChange={setProgressPeriod}
              options={timeRangeOptions}
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData.engagement}>
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
              <Area 
                type="monotone" 
                dataKey="posts" 
                stackId="1"
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
                name="Posts"
              />
              <Area 
                type="monotone" 
                dataKey="likes" 
                stackId="1"
                stroke="hsl(var(--success))" 
                fill="hsl(var(--success))"
                fillOpacity={0.6}
                name="Likes"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Community Atmosphere */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Community Atmosphere</h3>
            <TimeRangeSelector 
              value={atmospherePeriod} 
              onChange={setAtmospherePeriod}
              options={timeRangeOptions}
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData.atmosphere}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Area 
                type="monotone" 
                dataKey="positive" 
                stackId="1"
                stroke="hsl(var(--success))" 
                fill="hsl(var(--success))"
                fillOpacity={0.8}
                name="Positive Posts %"
              />
              <Area 
                type="monotone" 
                dataKey="negative" 
                stackId="1"
                stroke="hsl(var(--destructive))" 
                fill="hsl(var(--destructive))"
                fillOpacity={0.8}
                name="Negative Posts %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Content Moderation */}
      <div className="chart-container">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-destructive" />
            <h3 className="text-lg font-semibold">Content Removal Due to Policy Violations</h3>
          </div>
          <TimeRangeSelector 
            value={contentPeriod} 
            onChange={setContentPeriod}
            options={timeRangeOptions}
          />
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={[
            { month: 'Jan', removed: 12 },
            { month: 'Feb', removed: 8 },
            { month: 'Mar', removed: 15 },
            { month: 'Apr', removed: 6 },
            { month: 'May', removed: 9 },
            { month: 'Jun', removed: 4 }
          ]}>
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
              dataKey="removed" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              name="Posts Removed"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
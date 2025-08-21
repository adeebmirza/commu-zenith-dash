import { useState } from "react";
import { Grid3x3, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { TimeRangeSelector } from "@/components/TimeRangeSelector";
import { categoryData } from "@/data/mockData";

const monthOptions = [
  { value: "1", label: "January 2024" },
  { value: "2", label: "February 2024" },
  { value: "3", label: "March 2024" },
  { value: "4", label: "April 2024" },
  { value: "5", label: "May 2024" },
  { value: "6", label: "June 2024" },
];

const yearOptions = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
];

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--success))',
  'hsl(var(--warning))',
  'hsl(var(--destructive))',
  'hsl(217 91% 70%)',
  'hsl(142 76% 46%)',
  'hsl(38 92% 60%)',
  'hsl(var(--muted-foreground))'
];

const pieChartData = Object.entries(categoryData).map(([name, data], index) => ({
  name,
  value: data.posts,
  percentage: data.percentage,
  color: COLORS[index % COLORS.length]
}));

const growthData = Object.entries(categoryData).map(([name, data]) => ({
  name,
  posts: data.posts,
  growth: data.growth
}));

// Mock historical data for growth chart
const historicalData = [
  { month: 'Jan', Achievement: 1100, Discussion: 2000, Learning: 850, Question: 1400, Announcement: 200, Help: 300, Feedback: 100, Others: 40 },
  { month: 'Feb', Achievement: 1150, Discussion: 2050, Learning: 900, Question: 1450, Announcement: 210, Help: 320, Feedback: 105, Others: 42 },
  { month: 'Mar', Achievement: 1200, Discussion: 2100, Learning: 950, Question: 1500, Announcement: 220, Help: 340, Feedback: 115, Others: 44 },
  { month: 'Apr', Achievement: 1180, Discussion: 2080, Learning: 970, Question: 1520, Announcement: 225, Help: 335, Feedback: 118, Others: 43 },
  { month: 'May', Achievement: 1220, Discussion: 2130, Learning: 980, Question: 1550, Announcement: 230, Help: 342, Feedback: 120, Others: 45 },
  { month: 'Jun', Achievement: 1234, Discussion: 2145, Learning: 987, Question: 1567, Announcement: 234, Help: 345, Feedback: 123, Others: 45 },
];

export default function Categories() {
  const [selectedMonth, setSelectedMonth] = useState("6");
  const [selectedYear, setSelectedYear] = useState("2024");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Content Categories</h1>
          <p className="text-muted-foreground">
            Analyze post distribution and category performance
          </p>
        </div>
        <div className="flex gap-2">
          <TimeRangeSelector 
            value={selectedMonth} 
            onChange={setSelectedMonth}
            options={monthOptions}
          />
          <TimeRangeSelector 
            value={selectedYear} 
            onChange={setSelectedYear}
            options={yearOptions}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution Pie Chart */}
        <div className="chart-container">
          <div className="flex items-center gap-2 mb-4">
            <Grid3x3 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Category Distribution</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={false}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend */}
            <div className="space-y-2">
              {pieChartData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm">{entry.name}</span>
                  <span className="text-sm text-muted-foreground">({entry.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Posts Count */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4">Posts by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={growthData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis 
                type="category" 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                width={80}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="posts" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Growth Trends */}
      <div className="chart-container">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Category Growth Over Time</h3>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={historicalData}>
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
            <Line type="monotone" dataKey="Discussion" stroke={COLORS[0]} strokeWidth={2} />
            <Line type="monotone" dataKey="Question" stroke={COLORS[1]} strokeWidth={2} />
            <Line type="monotone" dataKey="Achievement" stroke={COLORS[2]} strokeWidth={2} />
            <Line type="monotone" dataKey="Learning" stroke={COLORS[3]} strokeWidth={2} />
            <Line type="monotone" dataKey="Help" stroke={COLORS[4]} strokeWidth={2} />
            <Line type="monotone" dataKey="Announcement" stroke={COLORS[5]} strokeWidth={2} />
            <Line type="monotone" dataKey="Feedback" stroke={COLORS[6]} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(categoryData).map(([name, data], index) => (
          <div key={name} className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{name}</p>
                <p className="text-xl font-bold">{data.posts.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  {data.growth > 0 ? (
                    <TrendingUp className="h-3 w-3 text-success" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-destructive" />
                  )}
                  <span className={`text-sm font-medium ${data.growth > 0 ? 'text-success' : 'text-destructive'}`}>
                    {data.growth > 0 ? '+' : ''}{data.growth}%
                  </span>
                </div>
              </div>
              <div 
                className="h-10 w-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${COLORS[index % COLORS.length]}20` }}
              >
                <div 
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import { Lightbulb, Brain, TrendingUp, Users, Target, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { suggestions } from "@/data/mockData";

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "bg-destructive/10 text-destructive border-destructive/20";
    case "Medium": return "bg-warning/10 text-warning border-warning/20";
    case "Low": return "bg-success/10 text-success border-success/20";
    default: return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const getEffortColor = (effort: string) => {
  switch (effort) {
    case "High": return "destructive";
    case "Medium": return "secondary";
    case "Low": return "outline";
    default: return "outline";
  }
};

export default function Suggestions() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text">Growth Suggestions</h1>
        <p className="text-muted-foreground">
          AI-powered recommendations to boost your community engagement
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Community Analysis */}
        <div className="chart-container lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">AI Community Analysis</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-primary">Strong Engagement Patterns</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your community shows 85% engagement rate, which is above industry average. 
                    Discussion and Learning categories are performing exceptionally well with 
                    consistent daily activity.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-warning mt-1" />
                <div>
                  <h4 className="font-semibold text-warning">Member Retention Opportunity</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    566 members haven't been active in the last 30 days. Consider implementing 
                    re-engagement campaigns or personalized content recommendations to bring them back.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-success/5 border border-success/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-success mt-1" />
                <div>
                  <h4 className="font-semibold text-success">Content Quality Excellence</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    88% of posts receive positive sentiment. Your moderation strategy is working 
                    effectively with only 4 policy violations this month.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Suggestions */}
        <div className="chart-container lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Recommended Actions</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-muted/30 border border-border/50 rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold">{suggestion.title}</h4>
                    <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                      {suggestion.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {suggestion.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Impact: {suggestion.impact}
                      </Badge>
                      <Badge variant={getEffortColor(suggestion.effort)} className="text-xs">
                        Effort: {suggestion.effort}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button size="sm" className="w-full">
                    <Zap className="h-3 w-3 mr-1" />
                    Implement
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Wins */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4">Quick Wins (Low Effort, High Impact)</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-success/5 rounded-lg border border-success/20">
              <div className="h-2 w-2 rounded-full bg-success"></div>
              <div>
                <p className="font-medium text-sm">Pin Popular Posts</p>
                <p className="text-xs text-muted-foreground">Increase visibility by 40%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-success/5 rounded-lg border border-success/20">
              <div className="h-2 w-2 rounded-full bg-success"></div>
              <div>
                <p className="font-medium text-sm">Welcome Message Automation</p>
                <p className="text-xs text-muted-foreground">Improve new member retention</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-success/5 rounded-lg border border-success/20">
              <div className="h-2 w-2 rounded-full bg-success"></div>
              <div>
                <p className="font-medium text-sm">Weekly Digest Newsletter</p>
                <p className="text-xs text-muted-foreground">Re-engage inactive members</p>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Strategies */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4">Long-term Strategies</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <div>
                <p className="font-medium text-sm">Gamification System</p>
                <p className="text-xs text-muted-foreground">Points, badges, leaderboards</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <div>
                <p className="font-medium text-sm">Expert AMA Sessions</p>
                <p className="text-xs text-muted-foreground">Monthly industry expert Q&A</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <div>
                <p className="font-medium text-sm">Community Challenges</p>
                <p className="text-xs text-muted-foreground">Monthly themed competitions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { 
  BarChart3, 
  TrendingUp, 
  Lightbulb, 
  Grid3X3, 
  Building2, 
  MessageSquare,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'suggestions', label: 'Suggestions', icon: Lightbulb },
  { id: 'categories', label: 'Categories', icon: Grid3X3 },
  { id: 'companies', label: 'Companies', icon: Building2 },
  { id: 'feedback', label: 'Feedback', icon: MessageSquare },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="dashboard-card p-2 mb-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 ${
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="mobile-hide">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
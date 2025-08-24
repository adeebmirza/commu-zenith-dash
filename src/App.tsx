import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/DashboardLayout";
import { TabNavigation } from "@/components/TabNavigation";
import Overview from "./pages/Overview";
import Analytics from "./pages/Analytics";
import Suggestions from "./pages/Suggestions";
import Categories from "./pages/Categories";
import Companies from "./pages/Companies";
import Feedback from "./pages/Feedback";

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'analytics':
        return <Analytics />;
      case 'suggestions':
        return <Suggestions />;
      case 'categories':
        return <Categories />;
      case 'companies':
        return <Companies />;
      case 'feedback':
        return <Feedback />;
      default:
        return <Overview />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <DashboardLayout>
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          {renderActiveTab()}
        </DashboardLayout>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

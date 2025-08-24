interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold gradient-text">Community Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </header>
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
}
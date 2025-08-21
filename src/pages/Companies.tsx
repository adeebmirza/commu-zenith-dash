import { Building2, Users, Briefcase, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MetricCard } from "@/components/MetricCard";
import { companyData } from "@/data/mockData";

const employmentData = [
  { name: 'Working', value: companyData.working, color: 'hsl(var(--success))' },
  { name: 'Not Working', value: companyData.notWorking, color: 'hsl(var(--muted-foreground))' }
];

export default function Companies() {
  const totalMembers = companyData.working + companyData.notWorking;
  const employmentRate = ((companyData.working / totalMembers) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text">Company Analytics</h1>
        <p className="text-muted-foreground">
          Member employment status and company distribution analysis
        </p>
      </div>

      {/* Employment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Members"
          value={totalMembers.toLocaleString()}
          icon={Users}
        />
        <MetricCard
          title="Employed Members"
          value={companyData.working.toLocaleString()}
          change={2.3}
          trend="up"
          icon={Briefcase}
        />
        <MetricCard
          title="Employment Rate"
          value={`${employmentRate}%`}
          change={1.8}
          trend="up"
          icon={TrendingUp}
        />
        <MetricCard
          title="Companies Represented"
          value="45+"
          change={5.2}
          trend="up"
          icon={Building2}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employment Status Distribution */}
        <div className="chart-container">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Employment Status</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={employmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {employmentData.map((entry, index) => (
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
            
            <div className="space-y-4">
              {employmentData.map((entry) => (
                <div key={entry.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="font-medium">{entry.name}</span>
                  </div>
                  <span className="text-muted-foreground">{entry.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Distribution Histogram */}
        <div className="chart-container">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Top Companies</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={companyData.companies.slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
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
              <Bar 
                dataKey="employees" 
                fill="hsl(var(--primary))" 
                name="Employees"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Company List */}
      <div className="chart-container">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Company Directory</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companyData.companies.map((company, index) => (
            <div 
              key={company.name} 
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{company.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {company.employees} {company.employees === 1 ? 'member' : 'members'}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  index < 3 
                    ? 'bg-primary/10 text-primary' 
                    : index < 6 
                      ? 'bg-success/10 text-success'
                      : 'bg-muted/50 text-muted-foreground'
                }`}>
                  {index < 3 ? 'Top Tier' : index < 6 ? 'Growing' : 'Emerging'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employment Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4">Employment Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-success/5 rounded-lg border border-success/20">
              <TrendingUp className="h-5 w-5 text-success mt-0.5" />
              <div>
                <p className="font-medium text-success">Strong Tech Representation</p>
                <p className="text-sm text-muted-foreground">
                  76.9% employment rate indicates a highly skilled community with strong industry connections.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <Building2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-primary">Diverse Company Portfolio</p>
                <p className="text-sm text-muted-foreground">
                  Members represent 45+ companies, creating opportunities for cross-company collaboration.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4">Networking Opportunities</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-warning/5 rounded-lg border border-warning/20">
              <Users className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <p className="font-medium text-warning">Job Referral Potential</p>
                <p className="text-sm text-muted-foreground">
                  Large representation at top companies enables internal referral opportunities for job seekers.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg border border-muted/50">
              <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Career Development</p>
                <p className="text-sm text-muted-foreground">
                  566 members seeking employment could benefit from mentorship programs and skill-sharing initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import MainLayout from "../components/layout/MainLayout";
import StatCard from "../components/dashboard/StatCard";
import StatusChart from "../components/dashboard/StatusChart";
import RecentCases from "../components/dashboard/RecentCases";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";
import { 
  FileText, 
  Clock, 
  CalendarCheck, 
  CheckCircle, 
  AlertCircle 
} from "lucide-react";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Active Cases"
            value="28"
            icon={FileText}
            trend="up"
            trendValue="12% from last month"
          />
          <StatCard
            title="Pending Approval"
            value="5"
            icon={Clock}
            description="Cases awaiting review"
          />
          <StatCard
            title="Due This Week"
            value="12"
            icon={CalendarCheck}
            trend="down"
            trendValue="3 less than last week"
          />
          <StatCard
            title="Completed"
            value="45"
            icon={CheckCircle}
            description="Cases this month"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          <RecentCases />
          <StatusChart />
          <UpcomingDeadlines />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <ActivityFeed />
          <div className="lg:col-span-2 space-y-4">
            <div className="p-4 border rounded-lg bg-accent/5 flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Attention Required</h3>
                <p className="text-sm text-muted-foreground">
                  There are 3 cases that require immediate attention due to material shortages.
                </p>
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-primary/5 flex items-start space-x-3">
              <CalendarCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Weekly Lab Meeting</h3>
                <p className="text-sm text-muted-foreground">
                  Remember the lab team meeting on Friday at 10:00 AM to discuss workflow improvements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

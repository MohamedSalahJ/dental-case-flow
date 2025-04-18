import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "../components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Loader2, AlertTriangle } from "lucide-react";
import { format, subDays } from "date-fns";
import reportService from "@/services/reportService";

// Sample data for PieCharts
const caseStatusData = [
  { name: "New", value: 12, color: "#06b6d4" },
  { name: "In Progress", value: 24, color: "#3b82f6" },
  { name: "Pending Review", value: 9, color: "#f59e0b" },
  { name: "Completed", value: 18, color: "#10b981" },
  { name: "Delivered", value: 15, color: "#6b7280" },
];

const caseTypeData = [
  { name: "Crown", value: 25, color: "#8b5cf6" },
  { name: "Bridge", value: 15, color: "#ec4899" },
  { name: "Veneer", value: 18, color: "#06b6d4" },
  { name: "Implant", value: 12, color: "#f59e0b" },
  { name: "Denture", value: 8, color: "#10b981" },
];

const Reports = () => {
  const [timeRange, setTimeRange] = useState("12months");
  
  const getMonthsFromRange = () => {
    switch (timeRange) {
      case "30days": return 1;
      case "90days": return 3;
      case "6months": return 6;
      case "ytd": 
        const currentMonth = new Date().getMonth() + 1;
        return currentMonth;
      case "12months":
      default:
        return 12;
    }
  };
  
  const { data: financialReport, isLoading, error } = useQuery({
    queryKey: ['financialReport', timeRange],
    queryFn: () => reportService.getFinancialReport(getMonthsFromRange()),
  });
  
  // Format monthly revenue data for the chart
  const monthlyRevenueData = financialReport?.monthlyRevenue?.map(item => ({
    name: `${item.month}/${item.year}`,
    value: item.total
  })) || [];
  
  // Format top dentists data for the chart
  const topDentistsData = financialReport?.topDentists?.map(dentist => ({
    name: `${dentist.firstName} ${dentist.lastName}`,
    cases: dentist.invoiceCount,
    amount: dentist.totalAmount
  })) || [];
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading report data...</span>
        </div>
      </MainLayout>
    );
  }
  
  if (error) {
    return (
      <MainLayout>
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
          <p className="text-destructive">Failed to load report data. Please try again later.</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <div className="flex space-x-2 items-center">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="12months">Last 12 Months</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Unpaid Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${financialReport?.invoiceSummary.unpaidTotal.toFixed(2) || '0.00'}
              </div>
              <p className="text-xs text-muted-foreground">
                {financialReport?.invoiceSummary.unpaidCount || 0} invoices
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Overdue Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${financialReport?.invoiceSummary.overdueTotal.toFixed(2) || '0.00'}
              </div>
              <p className="text-xs text-muted-foreground">
                {financialReport?.invoiceSummary.overdueCount || 0} invoices
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Paid Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${financialReport?.invoiceSummary.paidTotal.toFixed(2) || '0.00'}
              </div>
              <p className="text-xs text-muted-foreground">
                {financialReport?.invoiceSummary.paidCount || 0} invoices
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="financial" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3">
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="cases">Case Analytics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="financial" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>
                  Revenue generated per month
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Dentists by Revenue</CardTitle>
                <CardDescription>
                  Dentists generating the most revenue
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={topDentistsData}
                    layout="vertical"
                    margin={{ left: 100 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#8b5cf6" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cases" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cases by Status</CardTitle>
                  <CardDescription>
                    Distribution of cases by current status
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={caseStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {caseStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Cases by Type</CardTitle>
                  <CardDescription>
                    Distribution of cases by type
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={caseTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {caseTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Monthly Case Completion</CardTitle>
                <CardDescription>
                  Number of cases completed per month
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyCompletionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" name="Cases" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Turnaround Time Trends</CardTitle>
                <CardDescription>
                  Average case completion time over the last 12 months
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={[
                      { month: "Jan", days: 6.2 },
                      { month: "Feb", days: 6.0 },
                      { month: "Mar", days: 5.8 },
                      { month: "Apr", days: 5.7 },
                      { month: "May", days: 5.5 },
                      { month: "Jun", days: 5.4 },
                      { month: "Jul", days: 5.3 },
                      { month: "Aug", days: 5.4 },
                      { month: "Sep", days: 5.3 },
                      { month: "Oct", days: 5.2 },
                      { month: "Nov", days: 5.1 },
                      { month: "Dec", days: 5.0 }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="days" stroke="#8b5cf6" name="Days" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>On-Time Delivery Rate</CardTitle>
                  <CardDescription>
                    Percentage of cases delivered on or before deadline
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={[
                        { month: "Jan", rate: 86 },
                        { month: "Feb", rate: 87 },
                        { month: "Mar", rate: 88 },
                        { month: "Apr", rate: 88 },
                        { month: "May", rate: 89 },
                        { month: "Jun", rate: 90 },
                        { month: "Jul", rate: 90 },
                        { month: "Aug", rate: 91 },
                        { month: "Sep", rate: 91 },
                        { month: "Oct", rate: 92 },
                        { month: "Nov", rate: 92 },
                        { month: "Dec", rate: 93 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="rate" stroke="#10b981" name="On-Time %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quality Control</CardTitle>
                  <CardDescription>
                    Cases requiring revisions
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { month: "Jan", revisions: 8 },
                        { month: "Feb", revisions: 7 },
                        { month: "Mar", revisions: 6 },
                        { month: "Apr", revisions: 5 },
                        { month: "May", revisions: 4 },
                        { month: "Jun", revisions: 5 },
                        { month: "Jul", revisions: 3 },
                        { month: "Aug", revisions: 4 },
                        { month: "Sep", revisions: 4 },
                        { month: "Oct", revisions: 3 },
                        { month: "Nov", revisions: 2 },
                        { month: "Dec", revisions: 2 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revisions" fill="#f43f5e" name="Revisions" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Reports;

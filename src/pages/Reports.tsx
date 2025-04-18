
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import reportService from "@/services/reportService";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFC"];

const Reports = () => {
  const [timeRange, setTimeRange] = useState("12");
  
  const { data: reportData, isLoading } = useQuery({
    queryKey: ['reports', 'financial', timeRange],
    queryFn: () => reportService.getFinancialReport(parseInt(timeRange)),
  });

  // Format month labels for the chart
  const formatMonthName = (month: number) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[month - 1];
  };

  // Process monthly revenue data for display
  const processMonthlyRevenueData = () => {
    if (!reportData || !reportData.monthlyRevenue) return [];
    
    return reportData.monthlyRevenue.map((item: any) => ({
      month: `${formatMonthName(item.month)} ${item.year}`,
      revenue: item.total,
    }));
  };

  // Status distribution data for pie chart
  const invoiceStatusData = () => {
    if (!reportData || !reportData.invoiceSummary) return [];
    
    const { invoiceSummary } = reportData;
    return [
      { name: 'Paid', value: invoiceSummary.paidCount },
      { name: 'Unpaid', value: invoiceSummary.unpaidCount },
      { name: 'Overdue', value: invoiceSummary.overdueCount },
    ];
  };

  // Top dentists data
  const topDentistsData = () => {
    if (!reportData || !reportData.topDentists) return [];
    return reportData.topDentists.map((dentist: any) => ({
      name: `${dentist.firstName} ${dentist.lastName}`,
      amount: dentist.totalAmount,
      cases: dentist.invoiceCount,
    }));
  };

  // Completion data (placeholder)
  const monthlyCompletionData = [
    { month: "Jan", completed: 18, total: 22 },
    { month: "Feb", completed: 16, total: 20 },
    { month: "Mar", completed: 19, total: 22 },
    { month: "Apr", completed: 21, total: 23 },
    { month: "May", completed: 25, total: 27 },
    { month: "Jun", completed: 29, total: 30 },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Time Range:</span>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Last 12 months" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">Last 3 months</SelectItem>
                <SelectItem value="6">Last 6 months</SelectItem>
                <SelectItem value="12">Last 12 months</SelectItem>
                <SelectItem value="24">Last 24 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading report data...</p>
          </div>
        ) : (
          <>
            {/* Financial Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    Total Revenue
                  </CardTitle>
                  <CardDescription>
                    For the last {timeRange} months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${reportData?.monthlyRevenue.reduce((sum: number, item: any) => sum + item.total, 0).toFixed(2)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    Unpaid Invoices
                  </CardTitle>
                  <CardDescription>
                    Requiring attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${reportData?.invoiceSummary.unpaidTotal.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ({reportData?.invoiceSummary.unpaidCount} invoices)
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    Overdue Invoices
                  </CardTitle>
                  <CardDescription>
                    Past due date
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">
                    ${reportData?.invoiceSummary.overdueTotal.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ({reportData?.invoiceSummary.overdueCount} invoices)
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Report Tabs */}
            <Tabs defaultValue="revenue">
              <TabsList className="mb-4">
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="completion">Case Completion</TabsTrigger>
                <TabsTrigger value="dentists">Top Dentists</TabsTrigger>
              </TabsList>
              
              {/* Revenue Tab */}
              <TabsContent value="revenue" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Revenue</CardTitle>
                    <CardDescription>
                      Revenue trends over the last {timeRange} months
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={processMonthlyRevenueData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                          />
                          <Legend />
                          <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Invoices Tab */}
              <TabsContent value="invoices" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Invoice Status Distribution</CardTitle>
                      <CardDescription>
                        Breakdown by payment status
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={invoiceStatusData()}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {invoiceStatusData().map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value: number, name: string) => [`${value} invoices`, name]}
                            />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Invoice Amounts</CardTitle>
                      <CardDescription>
                        Financial breakdown by status
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              {
                                name: "Paid",
                                amount: reportData?.invoiceSummary.paidTotal,
                              },
                              {
                                name: "Unpaid",
                                amount: reportData?.invoiceSummary.unpaidTotal,
                              },
                              {
                                name: "Overdue",
                                amount: reportData?.invoiceSummary.overdueTotal,
                              },
                            ]}
                            layout="vertical"
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" />
                            <Tooltip 
                              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                            />
                            <Legend />
                            <Bar dataKey="amount" name="Amount" fill="#82ca9d" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Case Completion Tab */}
              <TabsContent value="completion" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Completion Rate</CardTitle>
                    <CardDescription>
                      Monthly breakdown of completed vs total cases
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyCompletionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="completed" name="Completed Cases" fill="#8884d8" />
                          <Bar dataKey="total" name="Total Cases" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Top Dentists Tab */}
              <TabsContent value="dentists" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Dentists by Revenue</CardTitle>
                    <CardDescription>
                      Highest contributing practices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={topDentistsData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number, name: string) => 
                              [name === 'amount' ? `$${value.toFixed(2)}` : value, 
                               name === 'amount' ? 'Revenue' : 'Cases']}
                          />
                          <Legend />
                          <Bar dataKey="amount" name="Revenue" fill="#8884d8" />
                          <Bar dataKey="cases" name="Cases" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Reports;

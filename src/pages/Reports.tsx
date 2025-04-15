
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import { format, subDays } from "date-fns";

// Sample data
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

const monthlyCompletionData = [
  { name: "Jan", value: 25 },
  { name: "Feb", value: 30 },
  { name: "Mar", value: 28 },
  { name: "Apr", value: 32 },
  { name: "May", value: 27 },
  { name: "Jun", value: 35 },
  { name: "Jul", value: 40 },
  { name: "Aug", value: 37 },
  { name: "Sep", value: 42 },
  { name: "Oct", value: 45 },
  { name: "Nov", value: 48 },
  { name: "Dec", value: 52 },
];

const topDentistsData = [
  { name: "Dr. Alice Johnson", cases: 28 },
  { name: "Dr. Robert Chen", cases: 22 },
  { name: "Dr. Emily Wilson", cases: 19 },
  { name: "Dr. James Wilson", cases: 17 },
  { name: "Dr. David Kim", cases: 15 },
];

const Reports = () => {
  const [timeRange, setTimeRange] = useState("90days");
  
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
                Total Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78</div>
              <p className="text-xs text-muted-foreground">
                +12% from previous period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Average Turnaround
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.2 days</div>
              <p className="text-xs text-muted-foreground">
                -0.8 days from previous period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                On-Time Delivery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">
                +3% from previous period
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="cases" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3">
            <TabsTrigger value="cases">Case Analytics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="clients">Client Analytics</TabsTrigger>
          </TabsList>
          
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
          
          <TabsContent value="clients" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Dentists by Volume</CardTitle>
                  <CardDescription>
                    Dentists with most cases submitted
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
                      <Bar dataKey="cases" fill="#8b5cf6" name="Cases" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Case Type Distribution by Dentist</CardTitle>
                  <CardDescription>
                    Types of cases submitted by top dentists
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { name: "Dr. Johnson", crown: 12, bridge: 5, veneer: 8, implant: 3 },
                        { name: "Dr. Chen", crown: 8, bridge: 4, veneer: 2, implant: 8 },
                        { name: "Dr. Wilson", crown: 5, bridge: 3, veneer: 7, implant: 4 },
                        { name: "Dr. Kim", crown: 7, bridge: 2, veneer: 4, implant: 2 }
                      ]}
                      margin={{ left: 70 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={70} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="crown" stackId="a" fill="#8b5cf6" name="Crown" />
                      <Bar dataKey="bridge" stackId="a" fill="#ec4899" name="Bridge" />
                      <Bar dataKey="veneer" stackId="a" fill="#06b6d4" name="Veneer" />
                      <Bar dataKey="implant" stackId="a" fill="#f59e0b" name="Implant" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Client Activity Timeline</CardTitle>
                <CardDescription>
                  New cases submitted over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={[
                      { date: format(subDays(new Date(), 30), "MMM d"), cases: 4 },
                      { date: format(subDays(new Date(), 27), "MMM d"), cases: 3 },
                      { date: format(subDays(new Date(), 24), "MMM d"), cases: 5 },
                      { date: format(subDays(new Date(), 21), "MMM d"), cases: 2 },
                      { date: format(subDays(new Date(), 18), "MMM d"), cases: 6 },
                      { date: format(subDays(new Date(), 15), "MMM d"), cases: 4 },
                      { date: format(subDays(new Date(), 12), "MMM d"), cases: 3 },
                      { date: format(subDays(new Date(), 9), "MMM d"), cases: 5 },
                      { date: format(subDays(new Date(), 6), "MMM d"), cases: 7 },
                      { date: format(subDays(new Date(), 3), "MMM d"), cases: 6 },
                      { date: format(new Date(), "MMM d"), cases: 8 }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cases" stroke="#3b82f6" name="New Cases" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Reports;

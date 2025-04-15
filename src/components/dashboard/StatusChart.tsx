
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "New", value: 12, color: "#4ECDC4" },
  { name: "In Progress", value: 8, color: "#1A535C" },
  { name: "Ready", value: 5, color: "#FF6B6B" },
  { name: "Delivered", value: 15, color: "#8675A9" },
];

const StatusChart = () => {
  return (
    <Card className="col-span-2 card-hover">
      <CardHeader>
        <CardTitle>Case Status Distribution</CardTitle>
        <CardDescription>Overview of all current cases by status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value} cases`, name]}
                contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusChart;

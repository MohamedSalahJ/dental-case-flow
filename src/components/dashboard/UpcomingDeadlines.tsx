
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Clock } from "lucide-react";

const deadlines = [
  {
    id: "C-2025-042",
    patientName: "John Smith",
    type: "Crown",
    dueDate: "Apr 22, 2025",
    remainingDays: 7,
  },
  {
    id: "C-2025-039",
    patientName: "Michael Davis",
    type: "Bridge",
    dueDate: "Apr 20, 2025",
    remainingDays: 5,
  },
  {
    id: "C-2025-044",
    patientName: "Emma Thompson",
    type: "Denture",
    dueDate: "Apr 19, 2025",
    remainingDays: 4,
  },
];

const UpcomingDeadlines = () => {
  return (
    <Card className="col-span-1 card-hover">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarCheck className="mr-2 h-5 w-5 text-dental-teal" />
          Upcoming Deadlines
        </CardTitle>
        <CardDescription>Cases due in the next 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className={`p-3 rounded-lg border ${
                deadline.remainingDays <= 5
                  ? "border-accent/50 bg-accent/5"
                  : "border-muted"
              }`}
            >
              <div className="font-medium">{deadline.patientName}</div>
              <div className="text-sm text-muted-foreground">
                {deadline.type} · {deadline.id}
              </div>
              <div className="mt-2 flex items-center text-sm">
                <Clock className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                <span
                  className={
                    deadline.remainingDays <= 3 ? "text-accent" : "text-muted-foreground"
                  }
                >
                  Due in {deadline.remainingDays} day{deadline.remainingDays !== 1 && "s"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlines;

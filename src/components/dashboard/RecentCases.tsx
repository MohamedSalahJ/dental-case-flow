
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const caseStatusColors = {
  new: "bg-dental-teal text-white",
  "in progress": "bg-blue-500 text-white",
  "pending review": "bg-amber-500 text-white",
  completed: "bg-green-500 text-white",
  delivered: "bg-dental-gray text-dental-blue",
};

type CaseStatus = keyof typeof caseStatusColors;

const recentCases = [
  {
    id: "C-2025-042",
    patientName: "John Smith",
    dentist: "Dr. Alice Johnson",
    dentistInitials: "AJ",
    status: "in progress" as CaseStatus,
    type: "Crown",
    dueDate: "Apr 22, 2025",
  },
  {
    id: "C-2025-041",
    patientName: "Sarah Williams",
    dentist: "Dr. Robert Chen",
    dentistInitials: "RC",
    status: "new" as CaseStatus,
    type: "Veneer",
    dueDate: "Apr 25, 2025",
  },
  {
    id: "C-2025-039",
    patientName: "Michael Davis",
    dentist: "Dr. Emily Wilson",
    dentistInitials: "EW",
    status: "pending review" as CaseStatus,
    type: "Bridge",
    dueDate: "Apr 20, 2025",
  },
  {
    id: "C-2025-038",
    patientName: "Jennifer Lopez",
    dentist: "Dr. David Kim",
    dentistInitials: "DK",
    status: "completed" as CaseStatus,
    type: "Implant",
    dueDate: "Apr 18, 2025",
  },
];

const RecentCases = () => {
  return (
    <Card className="col-span-3 card-hover">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Cases</CardTitle>
          <CardDescription>Latest case updates from dentists</CardDescription>
        </div>
        <Link to="/cases">
          <Button variant="outline" size="sm">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentCases.map((dentalCase) => (
            <div
              key={dentalCase.id}
              className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-muted/50"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="" alt={dentalCase.dentist} />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    {dentalCase.dentistInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{dentalCase.patientName}</div>
                  <div className="text-sm text-muted-foreground">
                    {dentalCase.type} · {dentalCase.id}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-right">
                  <div>{dentalCase.dentist}</div>
                  <div className="text-muted-foreground">Due: {dentalCase.dueDate}</div>
                </div>
                <Badge className={caseStatusColors[dentalCase.status]}>
                  {dentalCase.status.charAt(0).toUpperCase() + dentalCase.status.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentCases;

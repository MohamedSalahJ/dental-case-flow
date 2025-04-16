
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import caseService from "@/services/caseService";

const caseStatusColors = {
  new: "bg-dental-teal text-white",
  "in progress": "bg-blue-500 text-white",
  "pending review": "bg-amber-500 text-white",
  completed: "bg-green-500 text-white",
  delivered: "bg-dental-gray text-dental-blue",
};

type CaseStatus = keyof typeof caseStatusColors;

const RecentCases = () => {
  const { data: casesData, isLoading, error } = useQuery({
    queryKey: ['recentCases'],
    queryFn: () => caseService.getAll(),
    select: (data) => data.slice(0, 4), // Only show 4 most recent cases
  });

  // Transform API case data to the format we need
  const transformCaseData = (apiCases: any[] = []) => {
    if (!apiCases.length) return [];
    
    return apiCases.map(caseItem => ({
      id: caseItem.caseNumber,
      patientName: caseItem.patientName || "Unknown Patient",
      dentist: caseItem.dentistName || "Unknown Dentist",
      dentistInitials: caseItem.dentistName ? caseItem.dentistName.split(' ').map((n: string) => n[0]).join('') : "??",
      status: caseItem.status.toLowerCase().replace(' ', '-') as CaseStatus,
      type: caseItem.title,
      dueDate: caseItem.dueDate ? new Date(caseItem.dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : "No due date",
    }));
  };

  const recentCases = casesData ? transformCaseData(casesData) : [];

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
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">Loading cases...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-destructive">
            <p className="text-sm">Failed to load recent cases.</p>
          </div>
        ) : recentCases.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No recent cases found.</p>
          </div>
        ) : (
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
                  <Badge className={caseStatusColors[dentalCase.status] || caseStatusColors.new}>
                    {dentalCase.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentCases;

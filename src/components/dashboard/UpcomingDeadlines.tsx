
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Clock, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import caseService from "@/services/caseService";

const UpcomingDeadlines = () => {
  const { data: casesData, isLoading, error } = useQuery({
    queryKey: ['upcomingDeadlines'],
    queryFn: () => caseService.getAll(),
    select: (data) => {
      // Get cases with upcoming deadlines (within the next 7 days)
      const now = new Date();
      const next7Days = new Date();
      next7Days.setDate(now.getDate() + 7);
      
      return data
        .filter(caseItem => {
          if (!caseItem.dueDate) return false;
          const dueDate = new Date(caseItem.dueDate);
          return dueDate >= now && dueDate <= next7Days;
        })
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .slice(0, 3) // Only show 3 most urgent deadlines
        .map(caseItem => {
          const dueDate = new Date(caseItem.dueDate);
          const diffTime = Math.abs(dueDate.getTime() - now.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          return {
            id: caseItem.caseNumber,
            patientName: caseItem.patientName || "Unknown Patient",
            type: caseItem.title,
            dueDate: dueDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            remainingDays: diffDays,
          };
        });
    },
  });

  const deadlines = casesData || [];

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
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">Loading deadlines...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-destructive">
            <p className="text-sm">Failed to load upcoming deadlines.</p>
          </div>
        ) : deadlines.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No upcoming deadlines within the next 7 days.</p>
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlines;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Activity = {
  id: string;
  userInitials: string;
  userName: string;
  action: string;
  caseId: string;
  timestamp: string;
};

const activities: Activity[] = [
  {
    id: "act-1",
    userInitials: "RC",
    userName: "Dr. Robert Chen",
    action: "submitted a new case",
    caseId: "C-2025-041",
    timestamp: "10 minutes ago",
  },
  {
    id: "act-2",
    userInitials: "TM",
    userName: "Tom Miller",
    action: "updated status to 'In Progress'",
    caseId: "C-2025-038",
    timestamp: "1 hour ago",
  },
  {
    id: "act-3",
    userInitials: "AJ",
    userName: "Dr. Alice Johnson",
    action: "added new comment",
    caseId: "C-2025-042",
    timestamp: "2 hours ago",
  },
  {
    id: "act-4",
    userInitials: "JW",
    userName: "James Wilson",
    action: "uploaded shade photos",
    caseId: "C-2025-039",
    timestamp: "3 hours ago",
  },
  {
    id: "act-5",
    userInitials: "EW",
    userName: "Dr. Emily Wilson",
    action: "approved design",
    caseId: "C-2025-036",
    timestamp: "5 hours ago",
  },
];

const ActivityFeed = () => {
  return (
    <Card className="col-span-2 card-hover">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions in the lab workflow</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" alt={activity.userName} />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {activity.userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.userName}</span>{" "}
                  {activity.action}
                </p>
                <p className="text-sm text-muted-foreground">
                  Case {activity.caseId}
                </p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;


import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Clipboard, CalendarClock } from "lucide-react";

interface CaseCardProps {
  id: string;
  patientName: string;
  dentist: string;
  dentistInitials: string;
  status: "new" | "in progress" | "pending review" | "completed" | "delivered";
  type: string;
  dueDate: string;
  unreadMessages?: number;
  priority?: "low" | "medium" | "high";
}

const caseStatusColors = {
  new: "bg-dental-teal text-white",
  "in progress": "bg-blue-500 text-white",
  "pending review": "bg-amber-500 text-white",
  completed: "bg-green-500 text-white",
  delivered: "bg-dental-gray text-dental-blue",
};

const priorityColors = {
  low: "bg-dental-gray text-dental-blue",
  medium: "bg-amber-400 text-amber-950",
  high: "bg-accent text-white",
};

const CaseCard = ({
  id,
  patientName,
  dentist,
  dentistInitials,
  status,
  type,
  dueDate,
  unreadMessages = 0,
  priority,
}: CaseCardProps) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className={`h-1 ${status === "new" ? "bg-dental-teal" : status === "in progress" ? "bg-blue-500" : status === "pending review" ? "bg-amber-500" : status === "completed" ? "bg-green-500" : "bg-dental-gray"}`} />
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium">{patientName}</h3>
            <p className="text-sm text-muted-foreground">{type} · {id}</p>
          </div>
          <Badge className={caseStatusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src="" alt={dentist} />
              <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                {dentistInitials}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{dentist}</span>
          </div>
          {priority && (
            <Badge variant="outline" className={priorityColors[priority]}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarClock className="mr-1 h-4 w-4" />
            <span>Due: {dueDate}</span>
          </div>
          {unreadMessages > 0 && (
            <div className="flex items-center text-accent">
              <MessageSquare className="mr-1 h-4 w-4" />
              <span>{unreadMessages} new</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-2">
        <div className="w-full flex justify-between">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Clipboard className="mr-1 h-4 w-4" />
            Prescription
          </Button>
          <Link to={`/cases/${id}`}>
            <Button size="sm" variant="secondary" className="h-8">
              View Details
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CaseCard;

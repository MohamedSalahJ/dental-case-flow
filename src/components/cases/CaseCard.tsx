
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { MessageSquare, Clock } from "lucide-react";

interface CaseCardProps {
  id: string | number;
  patientName: string;
  dentist: string;
  dentistInitials: string;
  status: string;
  type: string;
  dueDate: string;
  priority: string;
  unreadMessages: number;
}

export default function CaseCard({
  id,
  patientName,
  dentist,
  dentistInitials,
  status,
  type,
  dueDate,
  priority,
  unreadMessages,
}: CaseCardProps) {
  const statusColors = {
    new: "bg-blue-500",
    "in-progress": "bg-yellow-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
    "on-hold": "bg-purple-500",
  };

  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  const statusColor = statusColors[status as keyof typeof statusColors] || "bg-gray-500";
  const priorityColor = priorityColors[priority as keyof typeof priorityColors] || "bg-gray-100 text-gray-800";

  return (
    <Card className="overflow-hidden">
      <div className={`h-1 w-full ${statusColor}`} />
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <CardDescription>{type}</CardDescription>
            <div className="text-lg font-semibold truncate">{patientName}</div>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {dentistInitials}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
          <div className="flex items-center gap-1">
            <Badge variant="outline" className={priorityColor}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-1 justify-end text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span className="truncate">{dueDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/cases/${id}`}>View Details</Link>
        </Button>
        
        {unreadMessages > 0 && (
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 text-primary mr-1" />
            <span className="text-xs font-medium">{unreadMessages}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}


import { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import MessageThread from "../components/messaging/MessageThread";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  FileText, 
  MessageSquare, 
  Paperclip,
  Camera,
  ChevronLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import StatusUpdateDialog from "../components/cases/StatusUpdateDialog";
import { toast } from "@/components/ui/use-toast";

const mockMessages = [
  {
    id: "msg-1",
    sender: "Dr. Alice Johnson",
    senderInitials: "AJ",
    content: "Hello, I'm sending over a new crown case for John. Please see the attached prescription for details.",
    timestamp: "Yesterday at 10:23 AM",
    isCurrentUser: false,
    attachments: [
      {
        name: "John_Smith_Prescription.pdf",
        url: "#",
        type: "application/pdf",
      },
    ],
  },
  {
    id: "msg-2",
    sender: "Tom Wilson",
    senderInitials: "TW",
    content: "Thanks for the case. I've reviewed the prescription and have a question about the shade. Could you confirm if you want A2 or A3?",
    timestamp: "Yesterday at 2:45 PM",
    isCurrentUser: true,
  },
  {
    id: "msg-3",
    sender: "Dr. Alice Johnson",
    senderInitials: "AJ",
    content: "Let's go with A3 to better match the adjacent teeth. I've attached a shade photo for reference.",
    timestamp: "Yesterday at 4:12 PM",
    isCurrentUser: false,
    attachments: [
      {
        name: "Shade_Photo_John.jpg",
        url: "#",
        type: "image/jpeg",
      },
    ],
  },
  {
    id: "msg-4",
    sender: "Tom Wilson",
    senderInitials: "TW",
    content: "Perfect, I'll proceed with A3. The case is now in progress. Expected completion by the 22nd.",
    timestamp: "Today at 9:30 AM",
    isCurrentUser: true,
  },
];

const statusColors = {
  new: "bg-dental-teal text-white",
  "in progress": "bg-blue-500 text-white",
  "pending review": "bg-amber-500 text-white",
  completed: "bg-green-500 text-white",
  delivered: "bg-dental-gray text-dental-blue",
};

type CaseStatus = keyof typeof statusColors;

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("details");
  
  // In a real app, you would fetch this data based on the ID
  const [caseData, setCaseData] = useState({
    id: id || "C-2025-042",
    patientName: "John Smith",
    dentist: "Dr. Alice Johnson",
    dentistInitials: "AJ",
    status: "in progress" as CaseStatus,
    type: "Crown",
    tooth: "16",
    material: "Zirconia",
    shade: "A3",
    dueDate: "Apr 22, 2025",
    createdAt: "Apr 15, 2025",
    priority: "medium" as const,
    notes: "Patient has sensitivity on the buccal side.",
  });
  
  const [statusHistory, setStatusHistory] = useState([
    {
      status: "new" as CaseStatus,
      timestamp: "Apr 15, 2025 at 10:23 AM",
      notes: "Case received"
    },
    {
      status: "in progress" as CaseStatus,
      timestamp: "Apr 15, 2025 at 2:45 PM",
      notes: "Started processing"
    },
    {
      status: "in progress" as CaseStatus,
      timestamp: "Apr 16, 2025 at 9:30 AM",
      notes: "Working on crown preparation"
    },
  ]);

  const handleStatusUpdate = (newStatus: CaseStatus, notes: string) => {
    // In a real app, you would make an API call here
    setCaseData({ ...caseData, status: newStatus });
    
    // Add to status history
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at ${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    
    setStatusHistory([
      ...statusHistory,
      {
        status: newStatus,
        timestamp: formattedDate,
        notes: notes
      }
    ]);
    
    toast({
      title: "Status updated",
      description: `Case status changed to ${newStatus}`,
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Link to="/cases">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">
            Case {caseData.id}
          </h1>
          <Badge className={statusColors[caseData.status]}>
            {caseData.status.charAt(0).toUpperCase() + caseData.status.slice(1)}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Case Details</CardTitle>
                <CardDescription>
                  Prescription and specifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Patient</p>
                  <p className="text-sm">{caseData.patientName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Dentist</p>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="" alt={caseData.dentist} />
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                        {caseData.dentistInitials}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm">{caseData.dentist}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Type</p>
                  <p className="text-sm">{caseData.type}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Tooth</p>
                    <p className="text-sm">{caseData.tooth}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Material</p>
                    <p className="text-sm">{caseData.material}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Shade</p>
                    <p className="text-sm">{caseData.shade}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Priority</p>
                    <Badge variant="outline" className="font-normal">
                      {caseData.priority.charAt(0).toUpperCase() + caseData.priority.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Notes</p>
                  <p className="text-sm">{caseData.notes}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Created</p>
                      <p className="text-sm">{caseData.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Due Date</p>
                      <p className="text-sm">{caseData.dueDate}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex space-x-2">
                  <Button className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    View Prescription
                  </Button>
                  <Button variant="outline" className="w-10 p-0">
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-10 p-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </div>
                <div className="pt-2">
                  <StatusUpdateDialog 
                    caseId={caseData.id}
                    currentStatus={caseData.status}
                    onStatusUpdate={handleStatusUpdate}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Status Updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {statusHistory.map((update, index) => (
                  <div key={index} className={`relative pl-6 ${index !== statusHistory.length - 1 ? 'pb-6 before:absolute before:top-0 before:left-2 before:h-full before:w-[1px] before:bg-border' : ''}`}>
                    <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-primary" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{update.status.charAt(0).toUpperCase() + update.status.slice(1)}</p>
                      <p className="text-xs">{update.notes}</p>
                      <p className="text-xs text-muted-foreground">{update.timestamp}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="h-full">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle>Communication</CardTitle>
                    <TabsList>
                      <TabsTrigger value="details">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Messages
                      </TabsTrigger>
                      <TabsTrigger value="files">
                        <Paperclip className="h-4 w-4 mr-2" />
                        Files
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <CardDescription>
                    Communicate with the dentist about this case
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0 flex flex-col">
                  <TabsContent value="details" className="flex-1 m-0 px-0">
                    <MessageThread
                      caseId={caseData.id}
                      messages={mockMessages}
                    />
                  </TabsContent>
                  <TabsContent value="files" className="m-0 p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-2 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                            📄
                          </div>
                          <div>
                            <p className="font-medium">John_Smith_Prescription.pdf</p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded on Apr 15, 2025
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                            🖼️
                          </div>
                          <div>
                            <p className="font-medium">Shade_Photo_John.jpg</p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded on Apr 15, 2025
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex justify-center pt-4">
                        <Button>
                          <Paperclip className="mr-2 h-4 w-4" />
                          Upload New Files
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CaseDetail;

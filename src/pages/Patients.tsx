
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import patientService from "@/services/patientService";
import authService from "@/services/authService";

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const currentUser = authService.getCurrentUser();
  
  // Fetch patients for the current dentist
  const { data: patients, isLoading, error } = useQuery({
    queryKey: ['patients', currentUser?.id],
    queryFn: () => patientService.getDentistPatients(currentUser?.id || 0),
    enabled: !!currentUser?.id && currentUser?.role === 'dentist',
  });
  
  // Filter patients based on search query
  const filteredPatients = patients?.filter(patient => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });
  
  // Group appointments by date (today, upcoming, past)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // This would eventually come from a real appointments API
  const mockAppointments = [
    { id: 1, patientId: 1, date: new Date(today), time: "09:00 AM", type: "Checkup" },
    { id: 2, patientId: 2, date: new Date(today), time: "11:30 AM", type: "Crown Fitting" },
    { id: 3, patientId: 3, date: new Date(today.getTime() + 86400000), time: "10:15 AM", type: "Consultation" },
    { id: 4, patientId: 1, date: new Date(today.getTime() + 172800000), time: "02:00 PM", type: "Follow-up" },
    { id: 5, patientId: 4, date: new Date(today.getTime() - 86400000), time: "03:30 PM", type: "Root Canal" },
  ];
  
  const todayAppointments = mockAppointments.filter(app => {
    const appDate = new Date(app.date);
    appDate.setHours(0, 0, 0, 0);
    return appDate.getTime() === today.getTime();
  });
  
  const upcomingAppointments = mockAppointments.filter(app => {
    const appDate = new Date(app.date);
    appDate.setHours(0, 0, 0, 0);
    return appDate.getTime() > today.getTime();
  });
  
  const pastAppointments = mockAppointments.filter(app => {
    const appDate = new Date(app.date);
    appDate.setHours(0, 0, 0, 0);
    return appDate.getTime() < today.getTime();
  });
  
  // Find patient details for an appointment
  const getPatientForAppointment = (patientId: number) => {
    return patients?.find(p => p.id === patientId) || null;
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link to="/new-patient">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Patient
              </Button>
            </Link>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Patients</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading patients...</span>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center py-12 text-destructive">
                <p>Error loading patients. Please try again later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPatients && filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <Link key={patient.id} to={`/patients/${patient.id}`}>
                      <Card className="transition-all hover:shadow-md cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {patient.firstName[0]}{patient.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate">{patient.firstName} {patient.lastName}</h3>
                              {patient.email && (
                                <p className="text-sm text-muted-foreground truncate">{patient.email}</p>
                              )}
                              {patient.phone && (
                                <p className="text-sm text-muted-foreground">{patient.phone}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No patients found. Add a new patient to get started.
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="appointments" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
                {todayAppointments.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {todayAppointments.map((appointment) => {
                      const patient = getPatientForAppointment(appointment.patientId);
                      return (
                        <Card key={appointment.id} className="transition-all hover:shadow-md cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              {patient && (
                                <Avatar className="h-12 w-12">
                                  <AvatarFallback className="bg-primary text-primary-foreground">
                                    {patient.firstName[0]}{patient.lastName[0]}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">
                                  {patient ? `${patient.firstName} ${patient.lastName}` : "Unknown Patient"}
                                </h3>
                                <p className="text-sm">{appointment.time} - {appointment.type}</p>
                                <Badge variant="outline" className="mt-1">Today</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No appointments scheduled for today.
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
                {upcomingAppointments.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingAppointments.map((appointment) => {
                      const patient = getPatientForAppointment(appointment.patientId);
                      return (
                        <Card key={appointment.id} className="transition-all hover:shadow-md cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              {patient && (
                                <Avatar className="h-12 w-12">
                                  <AvatarFallback className="bg-primary text-primary-foreground">
                                    {patient.firstName[0]}{patient.lastName[0]}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">
                                  {patient ? `${patient.firstName} ${patient.lastName}` : "Unknown Patient"}
                                </h3>
                                <p className="text-sm">
                                  {appointment.date.toLocaleDateString()} at {appointment.time} - {appointment.type}
                                </p>
                                <Badge variant="outline" className="mt-1">Upcoming</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No upcoming appointments scheduled.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Patients;

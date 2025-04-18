
import { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, isToday, isFuture, isPast, parseISO, addDays, getDaysInMonth, getDay, startOfMonth } from "date-fns";
import { cn } from "@/lib/utils";
import { DayContentProps } from "react-day-picker";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Plus, Clock, Calendar as CalendarIcon, User, FileText } from "lucide-react";
import authService from "@/services/authService";
import appointmentService, { Appointment } from "@/services/appointmentService";
import caseService from "@/services/caseService";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("day");
  
  const currentUser = authService.getCurrentUser();
  const userRole = currentUser?.role || '';
  const userId = currentUser?.id;
  
  // Fetch appointments for the current dentist or cases for technician
  const { data: appointments, isLoading: isLoadingAppointments } = useQuery({
    queryKey: ['appointments', userId, date],
    queryFn: () => {
      if (!userId) return Promise.resolve([]);
      if (userRole === 'dentist') {
        // For dentists, get their appointments
        return appointmentService.getByDentistId(Number(userId));
      }
      return Promise.resolve([]);
    },
    enabled: !!userId && userRole === 'dentist',
  });
  
  // Fetch cases for technicians
  const { data: cases, isLoading: isLoadingCases } = useQuery({
    queryKey: ['calendar-cases', date],
    queryFn: () => caseService.getAll(),
    enabled: userRole === 'technician',
  });
  
  // Get events for the selected date
  const getAppointmentsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate || !appointments) return [];
    
    return appointments.filter(appointment => {
      const appointmentDate = parseISO(appointment.appointmentDate);
      return (
        appointmentDate.getDate() === selectedDate.getDate() &&
        appointmentDate.getMonth() === selectedDate.getMonth() &&
        appointmentDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  };
  
  // Get cases for the selected date (for technicians)
  const getCasesForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate || !cases) return [];
    
    return cases.filter(caseItem => {
      if (!caseItem.dueDate) return false;
      const dueDate = parseISO(caseItem.dueDate);
      return (
        dueDate.getDate() === selectedDate.getDate() &&
        dueDate.getMonth() === selectedDate.getMonth() &&
        dueDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  };
  
  const selectedDateAppointments = userRole === 'dentist' ? getAppointmentsForDate(date) : [];
  const selectedDateCases = userRole === 'technician' ? getCasesForDate(date) : [];
  
  // Format appointments for display
  const formatAppointmentTime = (appointment: Appointment) => {
    return appointment.appointmentTime.substring(0, 5); // Format HH:MM
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          {userRole === 'dentist' && (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="p-4">
              <Tabs defaultValue="day" value={view} onValueChange={(v) => setView(v as "day" | "week" | "month")}>
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full pointer-events-auto"
                components={{
                  DayContent: ({ date: dayDate }: DayContentProps) => {
                    // Highlight days with appointments or due cases
                    const hasAppointment = userRole === 'dentist' && appointments?.some(app => {
                      const appDate = parseISO(app.appointmentDate);
                      return (
                        appDate.getDate() === dayDate.getDate() &&
                        appDate.getMonth() === dayDate.getMonth() &&
                        appDate.getFullYear() === dayDate.getFullYear()
                      );
                    });
                    
                    const hasCase = userRole === 'technician' && cases?.some(c => {
                      if (!c.dueDate) return false;
                      const dueDate = parseISO(c.dueDate);
                      return (
                        dueDate.getDate() === dayDate.getDate() &&
                        dueDate.getMonth() === dayDate.getMonth() &&
                        dueDate.getFullYear() === dayDate.getFullYear()
                      );
                    });
                    
                    return (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {dayDate.getDate()}
                        {(hasAppointment || hasCase) && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                            <div 
                              className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                hasAppointment ? "bg-primary" : "bg-green-500"
                              )}
                            />
                          </div>
                        )}
                      </div>
                    );
                  },
                }}
              />
              
              <div className="mt-4 flex justify-center space-x-4">
                {userRole === 'dentist' ? (
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2" />
                    <span className="text-sm">Appointments</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                    <span className="text-sm">Case Deadlines</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">
                {date ? format(date, 'EEEE, MMMM d, yyyy') : 'Select a date'}
              </h2>
              
              {isLoadingAppointments || isLoadingCases ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Loading events...</span>
                </div>
              ) : userRole === 'dentist' ? (
                // Dentist view: Show appointments
                <>
                  {selectedDateAppointments.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDateAppointments.map((appointment) => (
                        <div 
                          key={appointment.id}
                          className="p-3 rounded-lg border border-primary/20 bg-primary/5"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-primary" />
                                <p className="font-medium">{formatAppointmentTime(appointment)}</p>
                              </div>
                              <p className="font-medium mt-1">{appointment.patientName}</p>
                              <p className="text-sm text-muted-foreground">{appointment.appointmentType}</p>
                              {appointment.notes && (
                                <p className="text-sm mt-1">{appointment.notes}</p>
                              )}
                            </div>
                            <Badge variant={appointment.status === 'scheduled' ? 'outline' : 'default'}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border rounded-lg bg-muted/10">
                      <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No appointments scheduled for this date.</p>
                      <Button variant="outline" className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Appointment
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                // Technician view: Show case deadlines
                <>
                  {selectedDateCases.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDateCases.map((caseItem) => (
                        <div 
                          key={caseItem.id}
                          className="p-3 rounded-lg border border-green-500/20 bg-green-500/5"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{caseItem.title}</p>
                              <div className="flex items-center mt-1">
                                <User className="h-4 w-4 mr-1 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">{caseItem.patientName || "Unknown Patient"}</p>
                              </div>
                              <div className="flex items-center mt-1">
                                <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Case #{caseItem.caseNumber}</p>
                              </div>
                            </div>
                            <Badge variant={caseItem.status === 'completed' ? 'default' : 'outline'} className="capitalize">
                              {caseItem.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border rounded-lg bg-muted/10">
                      <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No case deadlines for this date.</p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Calendar;

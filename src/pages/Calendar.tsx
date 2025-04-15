
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample calendar events data
  const calendarEvents = [
    { date: new Date(2025, 3, 18), cases: 2, type: "delivery" },
    { date: new Date(2025, 3, 20), cases: 3, type: "deadline" },
    { date: new Date(2025, 3, 22), cases: 1, type: "deadline" },
    { date: new Date(2025, 3, 25), cases: 4, type: "deadline" },
    { date: new Date(2025, 3, 26), cases: 2, type: "delivery" },
    { date: new Date(2025, 3, 30), cases: 1, type: "delivery" },
  ];
  
  // Get events for the selected date
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    return calendarEvents.filter(
      (event) => 
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };
  
  const selectedDateEvents = getEventsForDate(date);
  
  // Generate sample events for the selected date
  const generateDailySchedule = (date: Date | undefined) => {
    if (!date) return [];
    
    const events = [];
    
    // Sample event data - would come from API in real app
    if (date.getDate() === 18 && date.getMonth() === 3) {
      events.push(
        { time: "9:30 AM", caseId: "C-2025-038", patientName: "Jennifer Lopez", type: "Delivery", dentist: "Dr. David Kim" },
        { time: "2:00 PM", caseId: "C-2025-037", patientName: "Robert Johnson", type: "Delivery", dentist: "Dr. Susan Lee" }
      );
    } else if (date.getDate() === 20 && date.getMonth() === 3) {
      events.push(
        { time: "10:00 AM", caseId: "C-2025-039", patientName: "Michael Davis", type: "Deadline", dentist: "Dr. Emily Wilson" },
        { time: "11:30 AM", caseId: "C-2025-034", patientName: "Anna Thompson", type: "Deadline", dentist: "Dr. James Wilson" },
        { time: "3:30 PM", caseId: "C-2025-033", patientName: "Mark Rodriguez", type: "Deadline", dentist: "Dr. Thomas White" }
      );
    } else if (date.getDate() === 22 && date.getMonth() === 3) {
      events.push(
        { time: "1:00 PM", caseId: "C-2025-042", patientName: "John Smith", type: "Deadline", dentist: "Dr. Alice Johnson" }
      );
    }
    
    return events;
  };
  
  const dailySchedule = generateDailySchedule(date);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="p-4">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full pointer-events-auto"
                modifiers={{
                  delivery: calendarEvents
                    .filter(event => event.type === "delivery")
                    .map(event => event.date),
                  deadline: calendarEvents
                    .filter(event => event.type === "deadline")
                    .map(event => event.date),
                }}
                modifiersClassNames={{
                  delivery: "delivery-day",
                  deadline: "deadline-day",
                }}
                components={{
                  DayContent: ({ date, view }) => {
                    if (view !== "month") return date.getDate();
                    
                    const matchingEvents = calendarEvents.filter(
                      (event) => 
                        event.date.getDate() === date.getDate() &&
                        event.date.getMonth() === date.getMonth() &&
                        event.date.getFullYear() === date.getFullYear()
                    );
                    
                    if (matchingEvents.length === 0) return date.getDate();
                    
                    return (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {date.getDate()}
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {matchingEvents.map((event, i) => (
                            <div 
                              key={i}
                              className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                event.type === "delivery" ? "bg-primary" : "bg-accent"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  },
                }}
              />
              
              <div className="mt-4 flex justify-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mr-2" />
                  <span className="text-sm">Deliveries</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-accent mr-2" />
                  <span className="text-sm">Deadlines</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">
                {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Select a date'}
              </h2>
              
              {selectedDateEvents.length > 0 ? (
                <div className="flex space-x-2 mb-4">
                  {selectedDateEvents.map((event, index) => (
                    <Badge 
                      key={index} 
                      className={cn(
                        event.type === "delivery" ? "bg-primary" : "bg-accent"
                      )}
                    >
                      {event.cases} {event.type === "delivery" ? "Deliveries" : "Deadlines"}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground mb-4">No events scheduled for this day.</p>
              )}
              
              {dailySchedule.length > 0 ? (
                <div className="space-y-3">
                  {dailySchedule.map((event, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "p-3 rounded-lg border",
                        event.type === "Delivery" ? "border-primary/20 bg-primary/5" : "border-accent/20 bg-accent/5"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{event.time} - {event.patientName}</p>
                          <p className="text-sm text-muted-foreground">{event.caseId} • {event.type}</p>
                        </div>
                        <Badge variant="outline">{event.dentist}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-muted/10">
                  <p className="text-muted-foreground">No scheduled events for the selected date.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Calendar;

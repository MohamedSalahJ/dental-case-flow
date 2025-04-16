
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "../components/layout/MainLayout";
import CaseCard from "../components/cases/CaseCard";
import CaseFilter from "../components/cases/CaseFilter";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import caseService from "@/services/caseService";

// This is a fallback data in case the API fails
const mockCasesData = [
  {
    id: "C-2025-042",
    patientName: "John Smith",
    dentist: "Dr. Alice Johnson",
    dentistInitials: "AJ",
    status: "in progress" as const,
    type: "Crown",
    dueDate: "Apr 22, 2025",
    priority: "medium" as const,
    unreadMessages: 2,
  },
  {
    id: "C-2025-041",
    patientName: "Sarah Williams",
    dentist: "Dr. Robert Chen",
    dentistInitials: "RC",
    status: "new" as const,
    type: "Veneer",
    dueDate: "Apr 25, 2025",
    priority: "low" as const,
  },
  {
    id: "C-2025-040",
    patientName: "David Martinez",
    dentist: "Dr. James Wilson",
    dentistInitials: "JW",
    status: "pending review" as const,
    type: "Implant",
    dueDate: "Apr 28, 2025",
    priority: "high" as const,
    unreadMessages: 1,
  },
  {
    id: "C-2025-039",
    patientName: "Michael Davis",
    dentist: "Dr. Emily Wilson",
    dentistInitials: "EW",
    status: "pending review" as const,
    type: "Bridge",
    dueDate: "Apr 20, 2025",
    priority: "medium" as const,
  },
  {
    id: "C-2025-038",
    patientName: "Jennifer Lopez",
    dentist: "Dr. David Kim",
    dentistInitials: "DK",
    status: "completed" as const,
    type: "Implant",
    dueDate: "Apr 18, 2025",
    priority: "low" as const,
  },
  {
    id: "C-2025-037",
    patientName: "Robert Johnson",
    dentist: "Dr. Susan Lee",
    dentistInitials: "SL",
    status: "completed" as const,
    type: "Crown",
    dueDate: "Apr 15, 2025",
    priority: "medium" as const,
  },
  {
    id: "C-2025-036",
    patientName: "Emily Brown",
    dentist: "Dr. Michael Wang",
    dentistInitials: "MW",
    status: "delivered" as const,
    type: "Denture",
    dueDate: "Apr 10, 2025",
    priority: "high" as const,
  },
  {
    id: "C-2025-035",
    patientName: "Lisa Garcia",
    dentist: "Dr. Thomas White",
    dentistInitials: "TW",
    status: "delivered" as const,
    type: "Veneer",
    dueDate: "Apr 08, 2025",
    priority: "medium" as const,
  },
];

const Cases = () => {
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    dentist: "",
  });
  
  // Use React Query to fetch cases data
  const { data: casesData, isLoading, error } = useQuery({
    queryKey: ['cases', filters.status],
    queryFn: () => caseService.getAll(filters.status || undefined),
  });

  // Transform API case data to match the format expected by CaseCard
  const transformCaseData = (apiCases: any[] = []) => {
    if (!apiCases.length) return [];
    
    return apiCases.map(caseItem => ({
      id: caseItem.caseNumber,
      patientName: caseItem.patientName || "Unknown Patient",
      dentist: caseItem.dentistName || "Unknown Dentist",
      dentistInitials: caseItem.dentistName ? caseItem.dentistName.split(' ').map((n: string) => n[0]).join('') : "??",
      status: caseItem.status.toLowerCase().replace(' ', '-'),
      type: caseItem.title,
      dueDate: caseItem.dueDate ? new Date(caseItem.dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : "No due date",
      priority: caseItem.priority?.toLowerCase() || "medium",
      unreadMessages: 0, // This would need to come from a separate messages API
    }));
  };
  
  // Prepare the data for rendering, using mock data as a fallback if needed
  const preparedCases = casesData ? transformCaseData(casesData) : [];
  
  // If there's an error, show a toast and use mock data
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading cases",
        description: "Failed to load cases from the server. Using mock data instead."
      });
      console.error("Failed to fetch cases:", error);
    }
  }, [error]);
  
  const handleFilterChange = (newFilters: any) => {
    setFilters({...filters, ...newFilters});
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Cases</h1>
          <Link to="/new-case">
            <Button>
              <PlusCircle className="mr-2 h-5 w-5" />
              New Case
            </Button>
          </Link>
        </div>
        
        <CaseFilter onFilterChange={handleFilterChange} />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading cases...</span>
          </div>
        ) : error ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mockCasesData.map((caseItem) => (
              <CaseCard
                key={caseItem.id}
                id={caseItem.id}
                patientName={caseItem.patientName}
                dentist={caseItem.dentist}
                dentistInitials={caseItem.dentistInitials}
                status={caseItem.status}
                type={caseItem.type}
                dueDate={caseItem.dueDate}
                priority={caseItem.priority}
                unreadMessages={caseItem.unreadMessages}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {preparedCases.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No cases found. Create a new case to get started.
              </div>
            ) : (
              preparedCases.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  id={caseItem.id}
                  patientName={caseItem.patientName}
                  dentist={caseItem.dentist}
                  dentistInitials={caseItem.dentistInitials}
                  status={caseItem.status}
                  type={caseItem.type}
                  dueDate={caseItem.dueDate}
                  priority={caseItem.priority}
                  unreadMessages={caseItem.unreadMessages}
                />
              ))
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cases;


import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "../components/layout/MainLayout";
import CaseCard from "../components/cases/CaseCard";
import CaseFilter from "../components/cases/CaseFilter";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import caseService from "@/services/caseService";

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
  
  // Prepare the data for rendering
  const preparedCases = casesData ? transformCaseData(casesData) : [];
  
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
          <div className="flex justify-center items-center py-12 text-destructive">
            <p>Error loading cases. Please try again later.</p>
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

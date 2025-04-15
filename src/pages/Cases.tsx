
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import CaseCard from "../components/cases/CaseCard";
import CaseFilter from "../components/cases/CaseFilter";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const casesData = [
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
  const [filters, setFilters] = useState({});
  const [filteredCases, setFilteredCases] = useState(casesData);
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    
    // This would typically be more complex filtering logic
    // based on the actual filter values
    setFilteredCases(casesData);
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCases.map((caseItem) => (
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
      </div>
    </MainLayout>
  );
};

export default Cases;

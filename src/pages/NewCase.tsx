
import MainLayout from "../components/layout/MainLayout";
import PrescriptionForm from "../components/prescriptions/PrescriptionForm";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NewCase = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Link to="/cases">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">New Case</h1>
        </div>
        
        <PrescriptionForm />
      </div>
    </MainLayout>
  );
};

export default NewCase;

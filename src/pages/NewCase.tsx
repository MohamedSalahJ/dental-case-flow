
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import MainLayout from "../components/layout/MainLayout";
import { ChevronLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import PrescriptionForm from "../components/prescriptions/PrescriptionForm";
import DentalChart from "../components/prescriptions/DentalChart";
import caseService from "@/services/caseService";
import patientService from "@/services/patientService";
import dentistService from "@/services/dentistService";

const NewCase = () => {
  const [activeTab, setActiveTab] = useState("details");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Fetch dentists and patients for the form
  const { data: dentists } = useQuery({
    queryKey: ['dentists'],
    queryFn: () => dentistService.getAll(),
  });
  
  const { data: patients } = useQuery({
    queryKey: ['patients'],
    queryFn: () => patientService.getAll(),
  });
  
  // Mutation for creating a new case
  const createCaseMutation = useMutation({
    mutationFn: (caseData: any) => caseService.create(caseData),
    onSuccess: () => {
      toast({
        title: "Case created",
        description: "Your case has been created successfully.",
      });
      navigate("/cases");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to create case",
        description: "There was an error creating your case. Please try again.",
      });
      console.error("Failed to create case:", error);
    },
  });

  // Handle form submission
  const handleSubmit = (formData: any) => {
    createCaseMutation.mutate({
      title: formData.title,
      description: formData.description,
      status: "new",
      priority: formData.priority,
      patientId: formData.patientId,
      dentistId: formData.dentistId,
      dueDate: formData.dueDate,
    });
  };

  const handleSubmitDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your case has been saved as a draft.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/cases">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">New Case</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleSubmitDraft}>Save as Draft</Button>
            <Button 
              type="submit" 
              form="prescription-form"
              disabled={createCaseMutation.isPending}
            >
              {createCaseMutation.isPending ? "Submitting..." : "Submit Case"}
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>New Dental Case</CardTitle>
            <CardDescription>
              Please fill out the prescription form with all necessary details for the lab technician.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Patient Details</TabsTrigger>
                <TabsTrigger value="prescription">Prescription</TabsTrigger>
                <TabsTrigger value="dental-chart">Dental Chart</TabsTrigger>
                <TabsTrigger value="files">Attachments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 pt-4">
                <PrescriptionForm 
                  id="prescription-form" 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab}
                  onSubmit={handleSubmit}
                  dentists={dentists || []}
                  patients={patients || []}
                />
              </TabsContent>
              
              <TabsContent value="prescription" className="space-y-4 pt-4">
                {activeTab === "prescription" ? (
                  <PrescriptionForm 
                    id="prescription-form" 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab}
                    onSubmit={handleSubmit}
                    dentists={dentists || []}
                    patients={patients || []}
                  />
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    Please complete patient details first
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="dental-chart" className="space-y-4 pt-4">
                {activeTab === "dental-chart" ? (
                  <DentalChart />
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    Please complete prescription details first
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="files" className="space-y-4 pt-4">
                {activeTab === "files" ? (
                  <div className="space-y-4">
                    <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                      <div className="mx-auto flex flex-col items-center justify-center gap-1">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <h3 className="text-lg font-semibold">Drop files here or click to upload</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload intraoral photos, X-rays, or any other relevant files
                        </p>
                        <Button variant="secondary" size="sm">
                          Select Files
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Supported file types: JPEG, PNG, PDF, STL, DCM (max 25MB per file)
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    Please complete prescription details first
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default NewCase;

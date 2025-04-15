
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import PrescriptionForm from "../components/prescriptions/PrescriptionForm";

const NewCase = () => {
  const [activeTab, setActiveTab] = useState("details");
  const { toast } = useToast();

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
            <Button type="submit" form="prescription-form">Submit Case</Button>
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Patient Details</TabsTrigger>
                <TabsTrigger value="prescription">Prescription</TabsTrigger>
                <TabsTrigger value="files">Attachments</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <PrescriptionForm id="prescription-form" activeTab={activeTab} setActiveTab={setActiveTab} />
              </TabsContent>
              <TabsContent value="prescription" className="space-y-4 pt-4">
                <div className="text-center py-12 text-muted-foreground">
                  Please complete patient details first
                </div>
              </TabsContent>
              <TabsContent value="files" className="space-y-4 pt-4">
                <div className="text-center py-12 text-muted-foreground">
                  Please complete prescription details first
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default NewCase;

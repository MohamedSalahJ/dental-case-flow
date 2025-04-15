
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import UserGuide from "../components/help/UserGuide";
import ApiDocumentation from "../components/help/ApiDocumentation";
import ERDDiagram from "../components/help/ERDDiagram";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Help = () => {
  const [tabValue, setTabValue] = useState("user-guide");

  return (
    <MainLayout>
      <div className="space-y-6">
        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="user-guide" className="flex-1">User Guide</TabsTrigger>
            <TabsTrigger value="api-documentation" className="flex-1">API Documentation</TabsTrigger>
            <TabsTrigger value="erd-diagram" className="flex-1">ERD Diagram</TabsTrigger>
          </TabsList>
          <TabsContent value="user-guide">
            <UserGuide />
          </TabsContent>
          <TabsContent value="api-documentation">
            <ApiDocumentation />
          </TabsContent>
          <TabsContent value="erd-diagram">
            <ERDDiagram />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Help;

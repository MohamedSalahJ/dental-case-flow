
import MainLayout from "../components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import ApiDocumentation from "../components/help/ApiDocumentation";
import UserGuide from "../components/help/UserGuide";

const Help = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
          <p className="text-muted-foreground mt-1">
            Find guides, tutorials, and API documentation for DentalFlow
          </p>
        </div>

        <Tabs defaultValue="user-guide" className="space-y-4">
          <TabsList className="border-b w-full rounded-none justify-start px-0 h-auto">
            <TabsTrigger value="user-guide" className="rounded-t-lg rounded-b-none border-b-2 data-[state=active]:border-primary pb-2">
              User Guide
            </TabsTrigger>
            <TabsTrigger value="api-docs" className="rounded-t-lg rounded-b-none border-b-2 data-[state=active]:border-primary pb-2">
              API Documentation
            </TabsTrigger>
            <TabsTrigger value="faq" className="rounded-t-lg rounded-b-none border-b-2 data-[state=active]:border-primary pb-2">
              FAQ
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="user-guide">
            <UserGuide />
          </TabsContent>
          
          <TabsContent value="api-docs">
            <ApiDocumentation />
          </TabsContent>
          
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Common questions and answers about using DentalFlow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I create a new case?</AccordionTrigger>
                    <AccordionContent>
                      To create a new case, navigate to the Cases section using the sidebar menu and click on the "New Case" button. Fill out the required information in the form including patient details, case specifications, and deadlines. Once completed, click "Submit" to create the case.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do dentists and technicians communicate?</AccordionTrigger>
                    <AccordionContent>
                      DentalFlow provides a built-in messaging system. Navigate to the Messages section to see all your conversations. You can also access case-specific messages directly from the case details page. Both dentists and technicians can attach files, images, and reference specific aspects of a case in their communications.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How is inventory managed in the system?</AccordionTrigger>
                    <AccordionContent>
                      The Inventory section allows lab technicians to track materials, products, and supplies. You can add new items, categorize them, set minimum stock levels, and track usage. The system will automatically notify you when items need to be reordered. You can also generate reports on inventory usage and costs.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I export reports and data?</AccordionTrigger>
                    <AccordionContent>
                      Yes, DentalFlow allows you to generate and export various reports including case summaries, inventory status, and financial data. In the Reports section, you can customize the report parameters and export the data in Excel or PDF formats for your records or further analysis.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How are case deadlines tracked?</AccordionTrigger>
                    <AccordionContent>
                      Case deadlines are tracked in both the Cases section and the Calendar. When a case is created, its deadlines automatically appear in the calendar. You'll receive notifications as deadlines approach. The dashboard also shows upcoming deadlines for quick reference. You can filter the calendar to show only specific types of deadlines.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Help;

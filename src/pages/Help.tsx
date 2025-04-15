
import { FC } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, FileText, Calendar, Package, MessageSquare, BarChart3, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Help: FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <HelpCircle className="h-6 w-6 mr-2 text-primary" />
          <h1 className="text-3xl font-bold">Help Center</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Welcome to DentalFlow Help Center</CardTitle>
            <CardDescription>
              Learn how to use the DentalFlow system efficiently with our comprehensive guides
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Select a category below to find detailed instructions on how to use different features of the system.
              If you need additional assistance, please contact the support team.
            </p>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="getting-started">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Getting Started
                </CardTitle>
                <CardDescription>Basic information about using DentalFlow</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is DentalFlow?</AccordionTrigger>
                    <AccordionContent>
                      DentalFlow is a comprehensive dental practice management system designed to streamline your dental office operations. It helps manage patient cases, appointments, inventory, communications, and reporting all in one place.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I navigate the system?</AccordionTrigger>
                    <AccordionContent>
                      <p>The main navigation is located on the left side of the screen. You can access different sections of the application by clicking on the corresponding icons:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>Dashboard - Overview of your practice</li>
                        <li>Cases - Manage patient cases</li>
                        <li>Calendar - Schedule and manage appointments</li>
                        <li>Messages - Communication with patients and staff</li>
                        <li>Reports - Generate and view practice reports</li>
                        <li>Inventory - Manage dental supplies and equipment</li>
                      </ul>
                      <p className="mt-2">You can collapse the sidebar by clicking the arrow button at the bottom of the sidebar.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I update my profile?</AccordionTrigger>
                    <AccordionContent>
                      Click on your profile picture in the top-right corner of the screen and select "Profile" from the dropdown menu. From there, you can update your personal information, change your password, and manage notification preferences.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cases">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Managing Cases
                </CardTitle>
                <CardDescription>Learn how to create and manage patient cases</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="case-1">
                    <AccordionTrigger>How do I create a new case?</AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Navigate to the Cases section from the sidebar</li>
                        <li>Click the "New Case" button in the top-right corner</li>
                        <li>Fill in the patient information, including their personal details and dental history</li>
                        <li>Add relevant attachments such as X-rays or previous dental records</li>
                        <li>Specify the treatment plan using the dental chart</li>
                        <li>Click "Save" to create the case</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="case-2">
                    <AccordionTrigger>How do I update a case?</AccordionTrigger>
                    <AccordionContent>
                      <p>To update an existing case:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-2">
                        <li>Go to the Cases section</li>
                        <li>Find the case you want to update and click on it</li>
                        <li>On the case details page, click the "Edit" button</li>
                        <li>Make the necessary changes</li>
                        <li>Click "Save Changes" to update the case</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="case-3">
                    <AccordionTrigger>How do I use the dental chart?</AccordionTrigger>
                    <AccordionContent>
                      <p>The dental chart allows you to visually document a patient's dental condition and treatment plan:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-2">
                        <li>Click on a tooth in the chart to select it</li>
                        <li>Choose the condition or treatment from the options panel</li>
                        <li>Add notes specific to that tooth if needed</li>
                        <li>Continue selecting teeth and treatments as needed</li>
                        <li>The treatment plan will automatically update based on your selections</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Using the Calendar
                </CardTitle>
                <CardDescription>Learn how to manage appointments and schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="calendar-1">
                    <AccordionTrigger>How do I schedule an appointment?</AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Navigate to the Calendar section from the sidebar</li>
                        <li>Click on the desired date and time slot</li>
                        <li>In the popup form, select the patient name from the dropdown</li>
                        <li>Specify the appointment type and duration</li>
                        <li>Add any relevant notes</li>
                        <li>Click "Save" to create the appointment</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="calendar-2">
                    <AccordionTrigger>How do I reschedule an appointment?</AccordionTrigger>
                    <AccordionContent>
                      <p>To reschedule an existing appointment:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-2">
                        <li>Find the appointment on the calendar</li>
                        <li>Click and drag the appointment to the new time slot</li>
                        <li>Alternatively, click on the appointment and select "Edit"</li>
                        <li>Update the date and time</li>
                        <li>Click "Save Changes"</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="calendar-3">
                    <AccordionTrigger>How do I set recurring appointments?</AccordionTrigger>
                    <AccordionContent>
                      <p>To set up a recurring appointment:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-2">
                        <li>Start creating a new appointment</li>
                        <li>Check the "Recurring" option</li>
                        <li>Specify the recurrence pattern (daily, weekly, monthly)</li>
                        <li>Set an end date for the recurring appointments</li>
                        <li>Complete the rest of the appointment details</li>
                        <li>Click "Save" to create all recurring appointments</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Inventory Management
                </CardTitle>
                <CardDescription>Learn how to manage dental supplies and equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="inventory-1">
                    <AccordionTrigger>How do I add new inventory items?</AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Navigate to the Inventory section from the sidebar</li>
                        <li>Click the "Add Item" button</li>
                        <li>Fill in the item details including name, category, quantity, and price</li>
                        <li>Upload an image of the item if available</li>
                        <li>Specify the supplier information</li>
                        <li>Click "Save" to add the item to inventory</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="inventory-2">
                    <AccordionTrigger>How do I manage inventory categories?</AccordionTrigger>
                    <AccordionContent>
                      <p>To manage inventory categories:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-2">
                        <li>Go to the Inventory section</li>
                        <li>Click on "Manage Categories" in the top navigation</li>
                        <li>To add a new category, click "Add Category" and enter the details</li>
                        <li>To edit an existing category, click the edit icon next to the category name</li>
                        <li>To delete a category, click the delete icon (this will only work if no items are assigned to the category)</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="inventory-3">
                    <AccordionTrigger>How do I manage suppliers?</AccordionTrigger>
                    <AccordionContent>
                      <p>To manage suppliers:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-2">
                        <li>Go to the Inventory section</li>
                        <li>Click on "Manage Suppliers" in the top navigation</li>
                        <li>To add a new supplier, click "Add Supplier" and enter their contact information</li>
                        <li>To edit an existing supplier, click the edit icon next to the supplier name</li>
                        <li>To delete a supplier, click the delete icon (this will only work if no inventory items are associated with this supplier)</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Messages
                </CardTitle>
                <CardDescription>Learn how to communicate with patients and staff</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="message-1">
                    <AccordionTrigger>How do I send a message?</AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Navigate to the Messages section from the sidebar</li>
                        <li>Click the "New Message" button</li>
                        <li>Select the recipient(s) from the dropdown menu</li>
                        <li>Enter a subject for your message</li>
                        <li>Type your message in the text box</li>
                        <li>Add attachments if needed by clicking the paperclip icon</li>
                        <li>Click "Send" to deliver the message</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="message-2">
                    <AccordionTrigger>How do I create message templates?</AccordionTrigger>
                    <AccordionContent>
                      <p>To create reusable message templates:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-2">
                        <li>Go to the Messages section</li>
                        <li>Click on "Templates" in the sidebar</li>
                        <li>Click "Create Template"</li>
                        <li>Give your template a name</li>
                        <li>Create the message content, using placeholders like [PATIENT_NAME] where needed</li>
                        <li>Click "Save Template"</li>
                        <li>You can now select this template when composing new messages</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="message-3">
                    <AccordionTrigger>How do I set up automated messages?</AccordionTrigger>
                    <AccordionContent>
                      <p>To set up automated messages like appointment reminders:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-2">
                        <li>Go to the Messages section</li>
                        <li>Click on "Automations" in the sidebar</li>
                        <li>Click "Create Automation"</li>
                        <li>Select the trigger event (e.g., "Appointment scheduled")</li>
                        <li>Select when the message should be sent (e.g., "24 hours before appointment")</li>
                        <li>Select a template or create a new message</li>
                        <li>Click "Save Automation"</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Reports
                </CardTitle>
                <CardDescription>Learn how to generate and analyze practice reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="report-1">
                    <AccordionTrigger>How do I generate reports?</AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Navigate to the Reports section from the sidebar</li>
                        <li>Select the type of report you want to generate (financial, patient activity, inventory, etc.)</li>
                        <li>Specify the date range for the report</li>
                        <li>Select any additional filters or parameters</li>
                        <li>Click "Generate Report"</li>
                        <li>The report will be displayed on screen and can be downloaded or printed</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="report-2">
                    <AccordionTrigger>How do I schedule recurring reports?</AccordionTrigger>
                    <AccordionContent>
                      <p>To set up recurring reports:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-2">
                        <li>Go to the Reports section</li>
                        <li>Set up the report parameters as usual</li>
                        <li>Before generating, check the "Schedule" option</li>
                        <li>Specify the recurrence (daily, weekly, monthly)</li>
                        <li>Enter the email addresses of report recipients</li>
                        <li>Click "Save Schedule"</li>
                        <li>The system will automatically generate and send the reports according to the schedule</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="report-3">
                    <AccordionTrigger>How do I customize report views?</AccordionTrigger>
                    <AccordionContent>
                      <p>To customize how your reports display data:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-2">
                        <li>Generate a report as usual</li>
                        <li>Click the "Customize View" button</li>
                        <li>Select which columns or data points to include</li>
                        <li>Choose the visualization type (table, bar chart, pie chart, etc.)</li>
                        <li>Set any data grouping or aggregation methods</li>
                        <li>Click "Apply" to see the customized report</li>
                        <li>Click "Save View" to save this customization for future use</li>
                      </ol>
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

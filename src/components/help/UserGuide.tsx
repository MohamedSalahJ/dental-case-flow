import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle, Search, FileText, Calendar, UserCircle, DollarSign, Database, Settings, MessageSquare } from "lucide-react";

function GettingStartedSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Getting Started</h2>
      
      <p>Welcome to DentalFlow! This guide will help you get started with the application and understand its main features.</p>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="account-setup">
          <AccordionTrigger>Account Setup</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>To set up your account:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Click on the &quot;Register&quot; button on the homepage.</li>
              <li>Fill in the required information, such as your name, email, and password.</li>
              <li>Verify your email address by clicking the link sent to your inbox.</li>
              <li>Log in with your new credentials.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="dashboard-overview">
          <AccordionTrigger>Dashboard Overview</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>The dashboard provides a quick overview of your practice. Here&apos;s what you&apos;ll find:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Key metrics such as total revenue, outstanding invoices, and upcoming appointments.</li>
              <li>Quick access to important sections like Cases, Invoices, and Inventory.</li>
              <li>A calendar view of your upcoming appointments and tasks.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="navigation">
          <AccordionTrigger>Navigation</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>Use the main sidebar to navigate to different sections of the application:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Cases:</strong> Manage patient cases and track their progress.</li>
              <li><strong>Invoices:</strong> Create and manage invoices for your services.</li>
              <li><strong>Inventory:</strong> Keep track of your supplies and equipment.</li>
              <li><strong>Calendar:</strong> View and manage your appointments and tasks.</li>
              <li><strong>Reports:</strong> Generate reports on your practice&apos;s performance.</li>
              <li><strong>Settings:</strong> Configure your account and application settings.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function CaseManagementSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Case Management</h2>
      
      <p>The case management system allows you to track and manage patient cases from start to finish.</p>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="creating-case">
          <AccordionTrigger>Creating a New Case</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>To create a new case:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to the Cases section from the main sidebar.</li>
              <li>Click the &quot;New Case&quot; button in the top right.</li>
              <li>Fill in the required information, such as the patient, dentist, and case details.</li>
              <li>Set the case status and priority.</li>
              <li>Click &quot;Save Case&quot; to create the case.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="viewing-case">
          <AccordionTrigger>Viewing Case Details</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>To view the details of a case:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to the Cases section from the main sidebar.</li>
              <li>Click on the case you want to view.</li>
              <li>The case details will be displayed, including the patient, dentist, case details, and status.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="updating-case">
          <AccordionTrigger>Updating a Case</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>To update a case:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to the Cases section from the main sidebar.</li>
              <li>Click on the case you want to update.</li>
              <li>Click the &quot;Edit Case&quot; button.</li>
              <li>Make the necessary changes.</li>
              <li>Click &quot;Save Case&quot; to update the case.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="managing-case-status">
          <AccordionTrigger>Managing Case Status</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>You can update the status of a case to reflect its progress:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Open:</strong> The case is newly created and awaiting action.</li>
              <li><strong>In Progress:</strong> The case is currently being worked on.</li>
              <li><strong>On Hold:</strong> The case is temporarily paused.</li>
              <li><strong>Completed:</strong> The case has been successfully completed.</li>
              <li><strong>Cancelled:</strong> The case has been cancelled.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function InvoiceSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Invoices & Billing</h2>
      
      <p>The invoicing system allows you to create, manage, and track all financial transactions in your dental lab.</p>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="create-invoice">
          <AccordionTrigger>Creating a New Invoice</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>To create a new invoice:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to the Invoices section from the main sidebar</li>
              <li>Click the &quot;Create Invoice&quot; button in the top right</li>
              <li>Fill in the required information:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Select the dentist from the dropdown</li>
                  <li>Select the patient from the dropdown</li>
                  <li>Optionally link to a specific case</li>
                  <li>Set the invoice date and due date</li>
                  <li>Add line items with descriptions, quantities, and unit prices</li>
                </ul>
              </li>
              <li>Add any additional notes if needed</li>
              <li>Click &quot;Save Invoice&quot; to create the invoice</li>
            </ol>
            
            <div className="bg-muted p-4 rounded-lg flex items-start gap-3 mt-2">
              <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-semibold">Pro Tip</p>
                <p className="text-sm text-muted-foreground">
                  When creating an invoice, you can link it to a specific case to keep your financial records organized and easily track payments related to each case.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="view-invoice">
          <AccordionTrigger>Viewing Invoice Details</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>To view the details of an invoice:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to the Invoices section from the main sidebar.</li>
              <li>Click on the invoice you want to view.</li>
              <li>The invoice details will be displayed, including the invoice number, date, patient, dentist, and line items.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="managing-invoice-status">
          <AccordionTrigger>Managing Invoice Status</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>You can update the status of an invoice to reflect its payment status:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Unpaid:</strong> The invoice is awaiting payment.</li>
              <li><strong>Paid:</strong> The invoice has been paid.</li>
              <li><strong>Overdue:</strong> The invoice is past its due date.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function InventorySection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Inventory Management</h2>
      
      <p>The inventory management system allows you to keep track of your supplies and equipment.</p>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="adding-item">
          <AccordionTrigger>Adding a New Item</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>To add a new item to your inventory:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to the Inventory section from the main sidebar.</li>
              <li>Click the &quot;Add Item&quot; button in the top right.</li>
              <li>Fill in the required information, such as the item name, description, and quantity.</li>
              <li>Click &quot;Save Item&quot; to add the item to your inventory.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="viewing-item">
          <AccordionTrigger>Viewing Item Details</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>To view the details of an item:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to the Inventory section from the main sidebar.</li>
              <li>Click on the item you want to view.</li>
              <li>The item details will be displayed, including the item name, description, quantity, and supplier.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="updating-item">
          <AccordionTrigger>Updating an Item</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>To update an item:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to the Inventory section from the main sidebar.</li>
              <li>Click on the item you want to update.</li>
              <li>Click the &quot;Edit Item&quot; button.</li>
              <li>Make the necessary changes.</li>
              <li>Click &quot;Save Item&quot; to update the item.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="managing-categories">
          <AccordionTrigger>Managing Inventory Categories</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>You can categorize your inventory items to keep them organized:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Create categories such as &quot;Crowns&quot;, &quot;Impression Materials&quot;, and &quot;Temporary Materials&quot;.</li>
              <li>Assign items to the appropriate categories.</li>
              <li>Filter and sort items by category to quickly find what you need.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function CalendarSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Calendar</h2>
      
      <p>The calendar feature allows you to manage your appointments and tasks.</p>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="adding-appointment">
          <AccordionTrigger>Adding a New Appointment</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>To add a new appointment:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to the Calendar section from the main sidebar.</li>
              <li>Click on the date and time you want to add the appointment.</li>
              <li>Fill in the required information, such as the patient, dentist, and appointment details.</li>
              <li>Click &quot;Save Appointment&quot; to add the appointment to your calendar.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="viewing-appointment">
          <AccordionTrigger>Viewing Appointment Details</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>To view the details of an appointment:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to the Calendar section from the main sidebar.</li>
              <li>Click on the appointment you want to view.</li>
              <li>The appointment details will be displayed, including the patient, dentist, and appointment details.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="updating-appointment">
          <AccordionTrigger>Updating an Appointment</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>To update an appointment:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to the Calendar section from the main sidebar.</li>
              <li>Click on the appointment you want to update.</li>
              <li>Click the &quot;Edit Appointment&quot; button.</li>
              <li>Make the necessary changes.</li>
              <li>Click &quot;Save Appointment&quot; to update the appointment.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function ReportsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reports</h2>
      
      <p>The reports section allows you to generate reports on your practice&apos;s performance.</p>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="revenue-report">
          <AccordionTrigger>Generating a Revenue Report</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>To generate a revenue report:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to the Reports section from the main sidebar.</li>
              <li>Select the &quot;Revenue Report&quot; option.</li>
              <li>Specify the date range for the report.</li>
              <li>Click &quot;Generate Report&quot; to generate the report.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="inventory-report">
          <AccordionTrigger>Generating an Inventory Report</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>To generate an inventory report:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to the Reports section from the main sidebar.</li>
              <li>Select the &quot;Inventory Report&quot; option.</li>
              <li>Specify the report parameters, such as the item categories to include.</li>
              <li>Click &quot;Generate Report&quot; to generate the report.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      
      <p>The settings section allows you to configure your account and application settings.</p>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="account-settings">
          <AccordionTrigger>Account Settings</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>In the account settings, you can:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Change your password.</li>
              <li>Update your profile information.</li>
              <li>Manage your notification preferences.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="application-settings">
          <AccordionTrigger>Application Settings</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>In the application settings, you can:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Configure the default currency.</li>
              <li>Set up email integration.</li>
              <li>Customize the application&apos;s appearance.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

const UserGuide = () => {
  const [tabValue, setTabValue] = useState("getting-started");

  return (
    <div className="space-y-6">
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <h1 className="text-3xl font-bold tracking-tight">User Guide</h1>
              <p className="text-muted-foreground">
                Learn how to use DentalFlow effectively with this comprehensive user guide.
              </p>
            </div>
            <div className="col-span-1 flex items-center justify-end">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search the guide..."
                  className="border rounded-md px-3 py-2 w-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="getting-started" className="flex-1">
            <HelpCircle className="mr-2 h-4 w-4" />
            Getting Started
          </TabsTrigger>
          <TabsTrigger value="case-management" className="flex-1">
            <FileText className="mr-2 h-4 w-4" />
            Case Management
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex-1">
            <DollarSign className="mr-2 h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex-1">
            <Database className="mr-2 h-4 w-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex-1">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex-1">
            <FileText className="mr-2 h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="getting-started">
          <GettingStartedSection />
        </TabsContent>
        <TabsContent value="case-management">
          <CaseManagementSection />
        </TabsContent>
        <TabsContent value="invoices">
          <InvoiceSection />
        </TabsContent>
        <TabsContent value="inventory">
          <InventorySection />
        </TabsContent>
        <TabsContent value="calendar">
          <CalendarSection />
        </TabsContent>
        <TabsContent value="reports">
          <ReportsSection />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserGuide;

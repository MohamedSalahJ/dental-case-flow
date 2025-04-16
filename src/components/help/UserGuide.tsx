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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronRight, ImageIcon, Info, Receipt } from "lucide-react";

const UserGuide = () => {
  const [activeTab, setActiveTab] = useState("getting-started");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Guide</h1>
        <p className="text-muted-foreground">
          Learn how to use DentalFlow to manage your dental lab workflow efficiently.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="cases">Cases Management</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
        </TabsList>
        
        <TabsContent value="getting-started" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Introduction to DentalFlow</CardTitle>
              <CardDescription>
                Learn the basics of the DentalFlow platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                DentalFlow is a comprehensive dental lab management system designed to streamline the workflow between dentists and lab technicians. It helps manage cases, track inventory, handle invoicing, and facilitate communication between all parties involved in dental restorations.
              </p>
              
              <h3 className="text-lg font-semibold mt-4">Key Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="font-semibold">Case Management:</span> Track all your dental cases from submission to delivery</li>
                <li><span className="font-semibold">Invoicing:</span> Create and manage invoices for completed work</li>
                <li><span className="font-semibold">Inventory Control:</span> Track materials and supplies</li>
                <li><span className="font-semibold">Communication:</span> Direct messaging between dentists and technicians</li>
                <li><span className="font-semibold">Reporting:</span> Generate reports on lab performance and financials</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-4">System Requirements</h3>
              <p>
                DentalFlow is a web-based application that can be accessed from any modern web browser (Chrome, Firefox, Safari, Edge). No installation is required.
              </p>
              
              <h3 className="text-lg font-semibold mt-4">User Roles</h3>
              <p>
                DentalFlow supports different user roles, each with specific permissions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="font-semibold">Administrator:</span> Full access to all features</li>
                <li><span className="font-semibold">Dentist:</span> Submit cases, view case status, communicate with lab</li>
                <li><span className="font-semibold">Lab Technician:</span> Manage cases, update status, track inventory</li>
                <li><span className="font-semibold">Office Manager:</span> Handle invoicing, reports, and administrative tasks</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Steps to set up your account and start using DentalFlow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">Creating Your Account</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Visit the DentalFlow website and click on "Sign Up"</li>
                <li>Fill out the registration form with your information</li>
                <li>Select your user role (Dentist, Lab Technician, etc.)</li>
                <li>Verify your email address by clicking the link sent to your inbox</li>
                <li>Set up your profile with additional information</li>
              </ol>
              
              <h3 className="text-lg font-semibold mt-4">Navigating the Dashboard</h3>
              <p>
                After logging in, you'll be taken to your dashboard, which provides an overview of your current cases, deadlines, and recent activity. The left sidebar contains navigation to all main features of the application.
              </p>
              
              <h3 className="text-lg font-semibold mt-4">Setting Up Your Profile</h3>
              <p>
                To complete your profile setup:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Click on your profile picture in the top right corner</li>
                <li>Select "Settings" from the dropdown menu</li>
                <li>Fill out your professional information, contact details, and preferences</li>
                <li>Upload a profile picture if desired</li>
                <li>Save your changes</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cases" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="creating-case">
              <AccordionTrigger>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Creating a New Case</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    Creating a new case is the first step in the dental lab workflow. Follow these steps to create a new case:
                  </p>
                  
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Navigate to the Cases section from the sidebar</li>
                    <li>Click on the "Create New Case" button</li>
                    <li>Fill out the case details:
                      <ul className="list-disc pl-6 mt-2">
                        <li>Patient information</li>
                        <li>Case type (Crown, Bridge, Veneer, etc.)</li>
                        <li>Restoration details (material, shade, etc.)</li>
                        <li>Due date</li>
                        <li>Special instructions</li>
                      </ul>
                    </li>
                    <li>Upload any supporting files (photos, scans, X-rays)</li>
                    <li>Review the information and submit the case</li>
                  </ol>
                  
                  <div className="flex items-start p-4 bg-muted rounded-md">
                    <Info className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <p className="font-semibold">Pro Tip</p>
                      <p className="text-sm text-muted-foreground">
                        When uploading shade photos, ensure they are taken in natural light with a shade guide visible in the frame for accurate color matching.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="managing-case">
              <AccordionTrigger>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Managing Case Status</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    Keeping track of case status is essential for efficient workflow management. Here's how to update and manage case status:
                  </p>
                  
                  <h4 className="font-semibold">Understanding Case Statuses</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><span className="font-semibold">New:</span> Case has been submitted but not yet started</li>
                    <li><span className="font-semibold">In Progress:</span> Work has begun on the case</li>
                    <li><span className="font-semibold">Pending Review:</span> Case is ready for quality check or dentist approval</li>
                    <li><span className="font-semibold">Completed:</span> Work is finished and ready for pickup/delivery</li>
                    <li><span className="font-semibold">Delivered:</span> Case has been delivered to the dentist</li>
                  </ul>
                  
                  <h4 className="font-semibold mt-4">Updating Case Status</h4>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Navigate to the specific case details page</li>
                    <li>Click on the "Update Status" button</li>
                    <li>Select the new status from the dropdown menu</li>
                    <li>Add notes about the status change (required)</li>
                    <li>Save the changes</li>
                  </ol>
                  
                  <h4 className="font-semibold mt-4">Status Change Notifications</h4>
                  <p>
                    When a case status is updated, notifications are automatically sent to all involved parties:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Dentists receive notifications when their cases progress to a new stage</li>
                    <li>Lab managers are notified of all status changes</li>
                    <li>Technicians are notified of cases assigned to them</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="case-communication">
              <AccordionTrigger>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Communication and Comments</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    Effective communication is crucial for successful case completion. DentalFlow provides several ways to communicate within the context of a case:
                  </p>
                  
                  <h4 className="font-semibold">Adding Comments to a Case</h4>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Navigate to the case details page</li>
                    <li>Scroll down to the "Comments" section</li>
                    <li>Type your comment in the text field</li>
                    <li>Attach files if needed</li>
                    <li>Click "Post Comment"</li>
                  </ol>
                  
                  <h4 className="font-semibold mt-4">Direct Messaging</h4>
                  <p>
                    For private communication between dentists and technicians:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Navigate to the Messages section from the sidebar</li>
                    <li>Select an existing conversation or start a new one</li>
                    <li>Type your message and send</li>
                    <li>You can reference specific cases by using the # symbol followed by the case ID</li>
                  </ol>
                  
                  <div className="flex items-start p-4 bg-muted rounded-md">
                    <Info className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <p className="font-semibold">Pro Tip</p>
                      <p className="text-sm text-muted-foreground">
                        When discussing specific aspects of a case, use the &quot;Tag Area&quot; feature on images to highlight exactly what you&apos;re referring to.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="creating-invoice">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Receipt className="mr-2 h-5 w-5 text-primary" />
                  <span>Creating Invoices</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    DentalFlow makes it easy to create professional invoices for completed dental work. Follow these steps to create a new invoice:
                  </p>
                  
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Navigate to the Invoices section from the sidebar</li>
                    <li>Click on the "Create Invoice" button</li>
                    <li>Fill out the invoice details:
                      <ul className="list-disc pl-6 mt-2">
                        <li>Select the dentist/patient</li>
                        <li>Optionally link to a specific case</li>
                        <li>Set the invoice date and due date</li>
                        <li>Add line items for products and services</li>
                        <li>Enter quantity and unit price for each item</li>
                        <li>Add any notes or payment instructions</li>
                      </ul>
                    </li>
                    <li>Review the invoice and click "Save Invoice"</li>
                  </ol>
                  
                  <h4 className="font-semibold mt-4">Auto-Populating from Cases</h4>
                  <p>
                    If you link an invoice to a case, you can auto-populate the invoice with the case details:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Select the related case from the dropdown</li>
                    <li>Click "Import Case Details"</li>
                    <li>The patient, dentist, and work details will be automatically filled in</li>
                    <li>You can still edit any information as needed</li>
                  </ol>
                  
                  <div className="flex items-start p-4 bg-muted rounded-md">
                    <Info className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <p className="font-semibold">Pro Tip</p>
                      <p className="text-sm text-muted-foreground">
                        Set up invoice templates for common procedures to save time when creating new invoices.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="managing-payments">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Receipt className="mr-2 h-5 w-5 text-primary" />
                  <span>Managing Payments</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    Keeping track of payments is essential for maintaining healthy cash flow. Here's how to record and manage payments in DentalFlow:
                  </p>
                  
                  <h4 className="font-semibold">Recording a Payment</h4>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Navigate to the specific invoice</li>
                    <li>Click on the "Record Payment" button</li>
                    <li>Enter the payment details:
                      <ul className="list-disc pl-6 mt-2">
                        <li>Payment amount</li>
                        <li>Payment method (credit card, cash, bank transfer, etc.)</li>
                        <li>Payment date</li>
                        <li>Reference number (if applicable)</li>
                      </ul>
                    </li>
                    <li>Click "Record Payment"</li>
                  </ol>
                  
                  <h4 className="font-semibold mt-4">Partial Payments</h4>
                  <p>
                    DentalFlow supports partial payments for invoices:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>If the payment amount is less than the invoice total, the invoice status remains "Unpaid"</li>
                    <li>The remaining balance is calculated automatically</li>
                    <li>You can record multiple payments against the same invoice</li>
                    <li>Once the total paid amount equals the invoice amount, the status changes to "Paid"</li>
                  </ul>
                  
                  <h4 className="font-semibold mt-4">Payment Reports</h4>
                  <p>
                    Generate reports on payments and outstanding invoices:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Navigate to the Reports section from the sidebar</li>
                    <li>Select "Financial Reports" from the report types</li>
                    <li>Choose the desired report (e.g., "Payment Summary," "Aging Report")</li>
                    <li>Set the date range and other filters</li>
                    <li>Generate the report</li>
                  </ol>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="sending-invoices">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Receipt className="mr-2 h-5 w-5 text-primary" />
                  <span>Sending Invoices</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    DentalFlow offers multiple ways to share invoices with your clients:
                  </p>
                  
                  <h4 className="font-semibold">Email Delivery</h4>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Open the invoice you want to send</li>
                    <li>Click on the "Send Invoice" button</li>
                    <li>Select "Email" as the delivery method</li>
                    <li>The recipient's email will be pre-filled if available</li>
                    <li>Customize the email message if needed</li>
                    <li>Click "Send"</li>
                  </ol>
                  
                  <h4 className="font-semibold mt-4">PDF Download</h4>
                  <p>
                    To download an invoice as a PDF for printing or manual sending:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Open the invoice</li>
                    <li>Click on the "Download" button</li>
                    <li>The invoice will be generated as a PDF and downloaded to your device</li>
                    <li>You can then print or attach it to an email manually</li>
                  </ol>
                  
                  <h4 className="font-semibold mt-4">Client Portal Sharing</h4>
                  <p>
                    If your clients have access to the DentalFlow client portal:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Open the invoice</li>
                    <li>Click on the "Share to Portal" button</li>
                    <li>The client will receive a notification that a new invoice is available</li>
                    <li>They can log in to view and pay the invoice online</li>
                  </ol>
                  
                  <div className="flex items-start p-4 bg-muted rounded-md">
                    <Info className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <p className="font-semibold">Auto-Reminders</p>
                      <p className="text-sm text-muted-foreground">
                        DentalFlow can automatically send payment reminders for overdue invoices. Configure this feature in Settings > Invoice Settings.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="workflows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Overview</CardTitle>
              <CardDescription>
                Understanding the end-to-end workflow in DentalFlow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                DentalFlow streamlines the entire workflow between dental offices and labs. Here's an overview of the typical workflow:
              </p>
              
              <div className="relative mt-6">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-muted-foreground/20"></div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-2 top-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">1</span>
                  </div>
                  <h3 className="text-lg font-semibold">Case Submission</h3>
                  <p className="text-muted-foreground mt-1">
                    Dentist creates a new case with all required details and uploads supporting files.
                  </p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-2 top-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">2</span>
                  </div>
                  <h3 className="text-lg font-semibold">Case Review</h3>
                  <p className="text-muted-foreground mt-1">
                    Lab receives the case and reviews the details. If any information is missing, they can request it through the messaging system.
                  </p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-2 top-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">3</span>
                  </div>
                  <h3 className="text-lg font-semibold">Production</h3>
                  <p className="text-muted-foreground mt-1">
                    Lab updates the case status to "In Progress" and begins production. Updates are added as work progresses.
                  </p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-2 top-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">4</span>
                  </div>
                  <h3 className="text-lg font-semibold">Quality Check</h3>
                  <p className="text-muted-foreground mt-1">
                    When the work is complete, it undergoes quality control. Status is updated to "Pending Review" if dentist approval is needed.
                  </p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-2 top-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">5</span>
                  </div>
                  <h3 className="text-lg font-semibold">Completion and Delivery</h3>
                  <p className="text-muted-foreground mt-1">
                    Once approved, the status is updated to "Completed" and the work is prepared for delivery or pickup.
                  </p>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-2 top-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">6</span>
                  </div>
                  <h3 className="text-lg font-semibold">Invoicing and Payment</h3>
                  <p className="text-muted-foreground mt-1">
                    An invoice is created for the completed work. Once delivered, the case status is updated to "Delivered" and payment is processed.
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mt-6">Benefits of the Streamlined Workflow</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reduced administrative work</li>
                <li>Improved communication</li>
                <li>Real-time status updates</li>
                <li>Faster turnaround times</li>
                <li>Better inventory management</li>
                <li>Comprehensive tracking of all cases</li>
                <li>Simplified invoicing and payment processing</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Common Workflow Scenarios</CardTitle>
              <CardDescription>
                Detailed examples of typical workflows in DentalFlow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-2">1</span>
                  Crown Restoration Workflow
                </h3>
                <div className="ml-10 mt-2 space-y-2">
                  <p className="text-muted-foreground">
                    A typical workflow for a crown restoration:
                  </p>
                  <ol className="list-decimal pl-6 space-y-1">
                    <li>Dentist submits a new crown case with prep scans</li>
                    <li>Lab reviews and confirms receipt</li>
                    <li>Technician designs the crown and sends a digital mockup for approval</li>
                    <li>Dentist approves the design</li>
                    <li>Technician fabricates the crown</li>
                    <li>Quality control checks the final product</li>
                    <li>Crown is prepared for delivery</li>
                    <li>Invoice is generated</li>
                    <li>Crown is delivered to the dental office</li>
                    <li>Payment is processed</li>
                  </ol>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-2">2</span>
                  Denture Repair Workflow
                </h3>
                <div className="ml-10 mt-2 space-y-2">
                  <p className="text-muted-foreground">
                    Workflow for a denture repair:
                  </p>
                  <ol className="list-decimal pl-6 space-y-1">
                    <li>Dentist creates a new repair case</li>
                    <li>Physical denture is sent to the lab</li>
                    <li>Lab confirms receipt and updates status</li>
                    <li>Technician assesses the repair needed</li>
                    <li>Repair is completed</li>
                    <li>Quality check is performed</li>
                    <li>Repaired denture is prepared for return</li>
                    <li>Invoice is generated</li>
                    <li>Denture is returned to the dental office</li>
                    <li>Payment is processed</li>
                  </ol>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-2">3</span>
                  Multiple Unit Bridge Workflow
                </h3>
                <div className="ml-10 mt-2 space-y-2">
                  <p className="text-muted-foreground">
                    Workflow for a complex bridge restoration:
                  </p>
                  <ol className="list-decimal pl-6 space-y-1">
                    <li>Dentist submits case with detailed specifications</li>
                    <li>Lab reviews and requests additional information if needed</li>
                    <li>Design phase begins with regular updates</li>
                    <li>Digital design is sent for dentist approval</li>
                    <li>Dentist requests minor adjustments</li>
                    <li>Design is updated and resubmitted</li>
                    <li>Dentist approves final design</li>
                    <li>Fabrication begins</li>
                    <li>Quality control checks</li>
                    <li>Bridge is prepared for delivery</li>
                    <li>Invoice is generated</li>
                    <li>Bridge is delivered to the dental office</li>
                    <li>Dentist confirms fit and final approval</li>
                    <li>Payment is processed</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserGuide;

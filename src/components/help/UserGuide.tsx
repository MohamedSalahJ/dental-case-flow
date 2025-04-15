
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const UserGuide = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Getting Started with DentalFlow</CardTitle>
          <CardDescription>
            A comprehensive guide to using the DentalFlow dental lab management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cases">Cases</TabsTrigger>
              <TabsTrigger value="workflow">Workflow</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="prose max-w-none">
                <h3>Welcome to DentalFlow</h3>
                <p>
                  DentalFlow is a comprehensive dental lab management system designed to streamline 
                  communication between dentists and lab technicians, manage case workflows, 
                  track inventory, and provide detailed reporting.
                </p>
                
                <h4>System Roles</h4>
                <p>
                  DentalFlow supports three main user roles:
                </p>
                <ul>
                  <li>
                    <strong>Dentists</strong> - Submit cases, communicate with technicians, 
                    track case progress, and review completed work.
                  </li>
                  <li>
                    <strong>Technicians</strong> - Process cases, update case status, manage inventory, 
                    and communicate with dentists.
                  </li>
                  <li>
                    <strong>Administrators</strong> - Manage users, generate reports, configure system settings, 
                    and oversee all aspects of the system.
                  </li>
                </ul>
                
                <h4>Main Features</h4>
                <p>
                  DentalFlow includes these core features:
                </p>
                <ul>
                  <li>
                    <strong>Case Management</strong> - Create, track, and update dental cases through their lifecycle.
                  </li>
                  <li>
                    <strong>Communication</strong> - Direct messaging between dentists and technicians.
                  </li>
                  <li>
                    <strong>Calendar</strong> - Track deadlines, appointments, and important dates.
                  </li>
                  <li>
                    <strong>Inventory Management</strong> - Track materials, supplies, and equipment.
                  </li>
                  <li>
                    <strong>Reporting</strong> - Generate detailed reports on cases, inventory, and finances.
                  </li>
                </ul>
                
                <h4>Dashboard Overview</h4>
                <p>
                  The DentalFlow dashboard provides a quick overview of your key metrics:
                </p>
                <ul>
                  <li>Active cases count and trends</li>
                  <li>Cases pending approval</li>
                  <li>Cases due this week</li>
                  <li>Recently completed cases</li>
                  <li>Case status distribution</li>
                  <li>Upcoming deadlines</li>
                  <li>Recent activity feed</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="cases" className="space-y-4">
              <div className="prose max-w-none">
                <h3>Case Management</h3>
                <p>
                  The Cases section allows you to manage all dental cases in the system.
                </p>
                
                <h4>Creating a New Case</h4>
                <p>
                  To create a new case:
                </p>
                <ol>
                  <li>Click on the "New Case" button in the Cases section</li>
                  <li>Fill in the patient information</li>
                  <li>Select the case type (Crown, Bridge, Denture, etc.)</li>
                  <li>Indicate tooth numbers involved</li>
                  <li>Specify material and shade requirements</li>
                  <li>Add any special instructions or notes</li>
                  <li>Upload relevant files (scans, photos, etc.)</li>
                  <li>Set priority and due date</li>
                  <li>Assign to a technician (if known)</li>
                  <li>Submit the case</li>
                </ol>
                
                <h4>Case Statuses</h4>
                <p>
                  Cases progress through various statuses:
                </p>
                <ul>
                  <li>
                    <strong>New</strong> - Case has been submitted but not yet started
                  </li>
                  <li>
                    <strong>In Progress</strong> - Technician is actively working on the case
                  </li>
                  <li>
                    <strong>Pending Review</strong> - Case is ready for review by the dentist
                  </li>
                  <li>
                    <strong>Completed</strong> - Case has been finished and approved
                  </li>
                  <li>
                    <strong>Delivered</strong> - Case has been delivered to the dentist
                  </li>
                </ul>
                
                <h4>Updating Case Status</h4>
                <p>
                  Technicians can update case status:
                </p>
                <ol>
                  <li>Open the case from the Cases list</li>
                  <li>Click the "Update Status" button</li>
                  <li>Select the new status</li>
                  <li>Add any notes about the status change</li>
                  <li>Save the changes</li>
                </ol>
                
                <h4>Filtering and Searching Cases</h4>
                <p>
                  You can filter cases by:
                </p>
                <ul>
                  <li>Status (New, In Progress, Pending Review, Completed, Delivered)</li>
                  <li>Priority (Low, Medium, High, Urgent)</li>
                  <li>Date range (created or due date)</li>
                  <li>Case type (Crown, Bridge, Denture, etc.)</li>
                  <li>Assigned technician</li>
                </ul>
                <p>
                  Use the search box to find specific cases by patient name, case ID, or tooth numbers.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="workflow" className="space-y-4">
              <div className="prose max-w-none">
                <h3>Case Workflow Management</h3>
                <p>
                  DentalFlow implements a structured workflow for case progression from creation to delivery.
                </p>
                
                <h4>Workflow Overview</h4>
                <p>Each case follows a standard workflow:</p>
                
                <ol>
                  <li>
                    <strong>Case Creation</strong> - Dentist submits a new case with prescription details
                    <ul>
                      <li>Status: New</li>
                      <li>Assigned to: Unassigned or pre-selected technician</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Case Assignment</strong> - Lab manager assigns case to a technician
                    <ul>
                      <li>Status: New</li>
                      <li>Assigned to: Selected technician</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Work in Progress</strong> - Technician begins working on the case
                    <ul>
                      <li>Status: In Progress</li>
                      <li>Technician can communicate with dentist for clarifications</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Quality Review</strong> - Case is ready for review
                    <ul>
                      <li>Status: Pending Review</li>
                      <li>Dentist is notified to review the work</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Completion</strong> - Dentist approves the work
                    <ul>
                      <li>Status: Completed</li>
                      <li>Lab prepares for delivery</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Delivery</strong> - Case is delivered to the dentist
                    <ul>
                      <li>Status: Delivered</li>
                      <li>Billing information is updated</li>
                    </ul>
                  </li>
                </ol>
                
                <h4>Status Change Procedures</h4>
                
                <p>To change a case status as a technician:</p>
                
                <ol>
                  <li>Navigate to the case detail page</li>
                  <li>Click on the "Update Status" button</li>
                  <li>Select the new status from the dropdown</li>
                  <li>Add notes explaining the change (required)</li>
                  <li>Click "Save Status"</li>
                </ol>
                
                <p>
                  The system records all status changes in the case history, including who made the change,
                  when it was made, and any notes provided.
                </p>
                
                <h4>Status Notifications</h4>
                
                <p>
                  When a case status changes, the system automatically notifies relevant parties:
                </p>
                
                <ul>
                  <li>Dentist receives notifications when:
                    <ul>
                      <li>Case moves to "Pending Review" (action required)</li>
                      <li>Case is marked as "Completed"</li>
                      <li>Case is "Delivered"</li>
                    </ul>
                  </li>
                  <li>Technicians receive notifications when:
                    <ul>
                      <li>New case is assigned to them</li>
                      <li>Dentist provides feedback during review</li>
                    </ul>
                  </li>
                  <li>Lab managers receive notifications for:
                    <ul>
                      <li>All new cases</li>
                      <li>Cases approaching due dates</li>
                      <li>Cases with status issues (e.g., stuck in one status too long)</li>
                    </ul>
                  </li>
                </ul>
                
                <h4>Status Dashboard</h4>
                
                <p>
                  The dashboard provides a quick overview of case statuses:
                </p>
                
                <ul>
                  <li>Count of cases by status</li>
                  <li>Cases requiring immediate attention</li>
                  <li>Status distribution chart</li>
                  <li>Status change timeline for individual cases</li>
                </ul>
                
                <h4>Status Reporting</h4>
                
                <p>
                  Generate reports on case status metrics:
                </p>
                
                <ul>
                  <li>Average time spent in each status</li>
                  <li>Technician efficiency metrics</li>
                  <li>Status bottleneck identification</li>
                  <li>Historical trends in status progression</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="calendar" className="space-y-4">
              <div className="prose max-w-none">
                <h3>Calendar Management</h3>
                <p>
                  The Calendar section helps you track all important dates and deadlines.
                </p>
                
                <h4>Calendar Views</h4>
                <p>
                  The calendar offers multiple views:
                </p>
                <ul>
                  <li>
                    <strong>Month View</strong> - Overview of the entire month
                  </li>
                  <li>
                    <strong>Week View</strong> - Detailed view of a single week
                  </li>
                  <li>
                    <strong>Day View</strong> - Hour-by-hour breakdown of a single day
                  </li>
                  <li>
                    <strong>Agenda View</strong> - List of upcoming events in chronological order
                  </li>
                </ul>
                
                <h4>Event Types</h4>
                <p>
                  The calendar displays different types of events:
                </p>
                <ul>
                  <li>
                    <strong>Case Deadlines</strong> - Due dates for cases
                  </li>
                  <li>
                    <strong>Appointments</strong> - Scheduled meetings or consultations
                  </li>
                  <li>
                    <strong>Deliveries</strong> - Expected delivery dates for materials or completed cases
                  </li>
                  <li>
                    <strong>Reminders</strong> - Custom reminders set by users
                  </li>
                </ul>
                
                <h4>Adding Calendar Events</h4>
                <p>
                  To add a new event to the calendar:
                </p>
                <ol>
                  <li>Click on the desired date or time slot</li>
                  <li>Select the event type</li>
                  <li>Fill in the event details (title, description, time)</li>
                  <li>Link to a case if applicable</li>
                  <li>Set reminder notifications if needed</li>
                  <li>Save the event</li>
                </ol>
                
                <h4>Filtering the Calendar</h4>
                <p>
                  You can filter the calendar to show only specific types of events:
                </p>
                <ul>
                  <li>Case deadlines only</li>
                  <li>Appointments only</li>
                  <li>Deliveries only</li>
                  <li>Filter by priority</li>
                  <li>Filter by technician or dentist</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="messages" className="space-y-4">
              <div className="prose max-w-none">
                <h3>Messaging System</h3>
                <p>
                  The Messages section enables direct communication between dentists and technicians.
                </p>
                
                <h4>Starting a New Conversation</h4>
                <p>
                  To start a new conversation:
                </p>
                <ol>
                  <li>Click the "New Message" button</li>
                  <li>Select the recipient (dentist or technician)</li>
                  <li>Link to a specific case if applicable</li>
                  <li>Write your message</li>
                  <li>Attach files if needed</li>
                  <li>Send the message</li>
                </ol>
                
                <h4>Case-Specific Messages</h4>
                <p>
                  For case-specific communication:
                </p>
                <ol>
                  <li>Open the case from the Cases section</li>
                  <li>Click on the "Messages" tab within the case</li>
                  <li>All messages related to this case will be displayed</li>
                  <li>Write your message and send it</li>
                </ol>
                <p>
                  This keeps all case-related communication in one place for easy reference.
                </p>
                
                <h4>Attaching Files</h4>
                <p>
                  You can attach various files to messages:
                </p>
                <ul>
                  <li>Images (photos of the case, shade references, etc.)</li>
                  <li>Documents (prescription forms, patient information)</li>
                  <li>3D files (scans, digital designs)</li>
                </ul>
                <p>
                  Click the attachment icon in the message compose area to add files.
                </p>
                
                <h4>Message Notifications</h4>
                <p>
                  You'll receive notifications for new messages:
                </p>
                <ul>
                  <li>In-app notifications appear in the notification bell</li>
                  <li>Email notifications (if enabled in settings)</li>
                  <li>Unread message count is displayed in the sidebar</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="inventory" className="space-y-4">
              <div className="prose max-w-none">
                <h3>Inventory Management</h3>
                <p>
                  The Inventory section helps lab technicians track materials, supplies, and equipment.
                </p>
                
                <h4>Adding Inventory Items</h4>
                <p>
                  To add a new inventory item:
                </p>
                <ol>
                  <li>Click the "Add Item" button in the Inventory section</li>
                  <li>Fill in the item details (name, description, SKU)</li>
                  <li>Select a category</li>
                  <li>Select a supplier</li>
                  <li>Set the current quantity</li>
                  <li>Set the minimum quantity threshold for reorder alerts</li>
                  <li>Enter the unit price</li>
                  <li>Specify the storage location</li>
                  <li>Save the item</li>
                </ol>
                
                <h4>Managing Categories</h4>
                <p>
                  To organize your inventory, you can create categories:
                </p>
                <ol>
                  <li>Click the "Manage Categories" link in the Inventory section</li>
                  <li>View existing categories</li>
                  <li>Click "Add Category" to create a new one</li>
                  <li>Enter the category name and description</li>
                  <li>Save the category</li>
                </ol>
                
                <h4>Managing Suppliers</h4>
                <p>
                  To track your suppliers:
                </p>
                <ol>
                  <li>Click the "Manage Suppliers" link in the Inventory section</li>
                  <li>View existing suppliers</li>
                  <li>Click "Add Supplier" to create a new one</li>
                  <li>Enter the supplier details (name, contact, address)</li>
                  <li>Save the supplier</li>
                </ol>
                
                <h4>Updating Inventory Quantities</h4>
                <p>
                  When using or receiving inventory:
                </p>
                <ol>
                  <li>Find the item in the inventory list</li>
                  <li>Click "Update Quantity"</li>
                  <li>Enter the new quantity or the amount to add/subtract</li>
                  <li>Add notes about the update (optional)</li>
                  <li>Save the changes</li>
                </ol>
                
                <h4>Low Stock Alerts</h4>
                <p>
                  The system will alert you when items fall below their minimum quantity:
                </p>
                <ul>
                  <li>Items with low stock appear highlighted in the inventory list</li>
                  <li>You'll see low stock alerts on the dashboard</li>
                  <li>Email notifications are sent for items that need reordering</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-4">
              <div className="prose max-w-none">
                <h3>Reports</h3>
                <p>
                  The Reports section provides detailed insights into your dental lab operations.
                </p>
                
                <h4>Available Reports</h4>
                <p>
                  DentalFlow offers several types of reports:
                </p>
                <ul>
                  <li>
                    <strong>Case Reports</strong> - Overview of cases by status, type, dentist, or technician
                  </li>
                  <li>
                    <strong>Productivity Reports</strong> - Track completion times and technician workload
                  </li>
                  <li>
                    <strong>Inventory Reports</strong> - Stock levels, usage, and costs
                  </li>
                  <li>
                    <strong>Financial Reports</strong> - Revenue, expenses, and profitability
                  </li>
                  <li>
                    <strong>Custom Reports</strong> - Create reports with specific parameters
                  </li>
                </ul>
                
                <h4>Generating Reports</h4>
                <p>
                  To generate a report:
                </p>
                <ol>
                  <li>Select the report type from the Reports section</li>
                  <li>Set the date range for the report</li>
                  <li>Choose any additional filters or parameters</li>
                  <li>Click "Generate Report"</li>
                  <li>View the report on screen</li>
                </ol>
                
                <h4>Exporting Reports</h4>
                <p>
                  Reports can be exported in various formats:
                </p>
                <ul>
                  <li>PDF for printing or sharing</li>
                  <li>Excel for further analysis</li>
                  <li>CSV for data processing</li>
                </ul>
                <p>
                  Click the "Export" button and select your preferred format.
                </p>
                
                <h4>Scheduled Reports</h4>
                <p>
                  You can schedule regular reports:
                </p>
                <ol>
                  <li>Configure a report with your desired parameters</li>
                  <li>Click "Schedule Report"</li>
                  <li>Set the frequency (daily, weekly, monthly)</li>
                  <li>Choose the delivery method (email, save to system)</li>
                  <li>Specify recipients if applicable</li>
                  <li>Save the schedule</li>
                </ol>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserGuide;

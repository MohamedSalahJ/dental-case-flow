
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ApiDocumentation = () => {
  return (
    <div className="space-y-6">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          This documentation is for backend developers who need to integrate with the DentalFlow API.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle>Entity Relationship Diagram</CardTitle>
          <CardDescription>
            Visual representation of the DentalFlow database structure and relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-muted/30">
            <AspectRatio ratio={16/9}>
              <div className="w-full h-full bg-white p-4 overflow-auto">
                <pre className="text-xs font-mono">
{`
+----------------+       +----------------+       +----------------+
|     USERS      |       |     CASES      |       |  CASE_STATUS   |
+----------------+       +----------------+       +----------------+
| id (PK)        |       | id (PK)        |       | id (PK)        |
| name           |       | patient_name   |       | case_id (FK)   |
| email          |<----->| dentist_id (FK)|       | status         |
| password_hash  |       | technician_id  |<----->| changed_by (FK)|
| role           |       | type           |       | timestamp      |
| clinic         |       | tooth          |       | notes          |
| created_at     |       | material       |       +----------------+
| updated_at     |       | shade          |
+----------------+       | status         |       +----------------+
        ^                | priority       |       |   MESSAGES     |
        |                | notes          |       +----------------+
        |                | due_date       |       | id (PK)        |
        |                | created_at     |       | case_id (FK)   |
        |                | updated_at     |<----->| sender_id (FK) |
        |                +----------------+       | content        |
        |                        ^                | timestamp      |
        |                        |                | attachments    |
+----------------+               |                +----------------+
|   INVENTORY    |               |
+----------------+       +----------------+       +----------------+
| id (PK)        |       | CASE_ATTACHMENTS|      |    SUPPLIERS   |
| name           |       +----------------+       +----------------+
| category_id    |       | id (PK)        |       | id (PK)        |
| supplier_id    |<----->| case_id (FK)   |       | name           |
| quantity       |       | name           |       | contact_name   |
| min_quantity   |       | file_type      |       | email          |
| price          |       | url            |       | phone          |
| location       |       | uploaded_by    |       | address        |
| created_at     |       | created_at     |       | created_at     |
| updated_at     |       +----------------+       | updated_at     |
+----------------+                                +----------------+
        ^
        |
+----------------+
|   CATEGORIES   |
+----------------+
| id (PK)        |
| name           |
| description    |
| created_at     |
| updated_at     |
+----------------+
`}
                </pre>
              </div>
            </AspectRatio>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Backend API Documentation</CardTitle>
          <CardDescription>
            Complete reference for the DentalFlow REST API endpoints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="authentication" className="space-y-4">
            <TabsList>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="cases">Cases</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="status">Status Management</TabsTrigger>
            </TabsList>
            
            <TabsContent value="authentication" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Authentication Endpoints</h3>
                  <p className="text-muted-foreground mb-4">
                    DentalFlow uses JWT (JSON Web Tokens) for authentication. All authenticated API requests should include the JWT token in the Authorization header.
                  </p>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">POST</span>
                      <span className="font-mono text-sm">/api/auth/login</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Login and get JWT token</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div>
                      <h4 className="font-medium">Request Body</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`{
  "email": "user@example.com",
  "password": "yourpassword"
}`}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium">Response (200 OK)</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "dentist"
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">POST</span>
                      <span className="font-mono text-sm">/api/auth/register</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Register new user</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div>
                      <h4 className="font-medium">Request Body</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "yourpassword",
  "role": "dentist",
  "clinic": "Bright Smile Dental"
}`}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium">Response (201 Created)</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`{
  "message": "User created successfully",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "dentist"
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">POST</span>
                      <span className="font-mono text-sm">/api/auth/logout</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Logout user</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div>
                      <h4 className="font-medium">Headers</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium">Response (200 OK)</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`{
  "message": "Successfully logged out"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="cases" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Cases Endpoints</h3>
                  <p className="text-muted-foreground mb-4">
                    Manage dental cases including creation, status updates, and details retrieval.
                  </p>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                      <span className="font-mono text-sm">/api/cases</span>
                    </div>
                    <span className="text-sm text-muted-foreground">List all cases</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div>
                      <h4 className="font-medium">Headers</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium">Query Parameters</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`?status=active&page=1&limit=20&sort=createdAt&order=desc`}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium">Response (200 OK)</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`{
  "cases": [
    {
      "id": "case-123",
      "patientName": "Alice Smith",
      "caseType": "Crown",
      "status": "in-progress",
      "priority": "high",
      "createdAt": "2023-04-15T10:30:00Z",
      "dueDate": "2023-04-30T10:30:00Z",
      "dentistId": "user-456",
      "technicianId": "user-789"
    },
    // More cases...
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">POST</span>
                      <span className="font-mono text-sm">/api/cases</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Create new case</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div>
                      <h4 className="font-medium">Headers</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium">Request Body</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`{
  "patientName": "Alice Smith",
  "patientId": "patient-123",
  "caseType": "Crown",
  "toothNumbers": [14, 15],
  "material": "Zirconia",
  "shade": "A3",
  "instructions": "Patient has metal allergies",
  "priority": "high",
  "dueDate": "2023-04-30T10:30:00Z",
  "technicianId": "user-789",
  "attachments": [
    {
      "name": "scan.stl",
      "url": "https://dentalflow.com/files/scan-123.stl"
    }
  ]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                      <span className="font-mono text-sm">/api/cases/:id</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Get case details</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div>
                      <h4 className="font-medium">Path Parameters</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`id - The case ID`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold mr-2">PUT</span>
                      <span className="font-mono text-sm">/api/cases/:id</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Update case</span>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold mr-2">DELETE</span>
                      <span className="font-mono text-sm">/api/cases/:id</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Delete case</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Users Endpoints</h3>
                  <p className="text-muted-foreground mb-4">
                    Manage users, roles, and permissions for both dentists and technicians.
                  </p>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                      <span className="font-mono text-sm">/api/users</span>
                    </div>
                    <span className="text-sm text-muted-foreground">List all users</span>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                      <span className="font-mono text-sm">/api/users/:id</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Get user details</span>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold mr-2">PUT</span>
                      <span className="font-mono text-sm">/api/users/:id</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Update user</span>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold mr-2">DELETE</span>
                      <span className="font-mono text-sm">/api/users/:id</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Delete user</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="inventory" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Inventory Endpoints</h3>
                  <p className="text-muted-foreground mb-4">
                    Manage inventory items, categories, suppliers, and stock levels.
                  </p>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                      <span className="font-mono text-sm">/api/inventory</span>
                    </div>
                    <span className="text-sm text-muted-foreground">List all inventory items</span>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">POST</span>
                      <span className="font-mono text-sm">/api/inventory</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Create inventory item</span>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                      <span className="font-mono text-sm">/api/inventory/categories</span>
                    </div>
                    <span className="text-sm text-muted-foreground">List all categories</span>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                      <span className="font-mono text-sm">/api/inventory/suppliers</span>
                    </div>
                    <span className="text-sm text-muted-foreground">List all suppliers</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="messages" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Messages Endpoints</h3>
                  <p className="text-muted-foreground mb-4">
                    Manage communications between dentists and technicians.
                  </p>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                      <span className="font-mono text-sm">/api/messages</span>
                    </div>
                    <span className="text-sm text-muted-foreground">List conversations</span>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                      <span className="font-mono text-sm">/api/messages/:conversationId</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Get conversation messages</span>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">POST</span>
                      <span className="font-mono text-sm">/api/messages</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Send message</span>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                      <span className="font-mono text-sm">/api/messages/case/:caseId</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Get case-specific messages</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="status" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Case Status Management Endpoints</h3>
                  <p className="text-muted-foreground mb-4">
                    Endpoints for managing and tracking case status changes throughout the dental workflow.
                  </p>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">PUT</span>
                      <span className="font-mono text-sm">/api/cases/:id/status</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Update case status</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div>
                      <h4 className="font-medium">Headers</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium">Request Body</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`{
  "status": "in progress",
  "notes": "Started working on the crown preparation"
}`}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium">Response (200 OK)</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`{
  "id": "case-123",
  "status": "in progress",
  "previousStatus": "new",
  "updatedAt": "2025-04-16T09:30:00Z",
  "updatedBy": {
    "id": "user-789",
    "name": "Tom Wilson"
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                      <span className="font-mono text-sm">/api/cases/:id/status-history</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Get case status history</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div>
                      <h4 className="font-medium">Headers</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium">Response (200 OK)</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`{
  "caseId": "case-123",
  "currentStatus": "in progress",
  "history": [
    {
      "status": "new",
      "timestamp": "2025-04-15T10:23:00Z",
      "changedBy": {
        "id": "user-456",
        "name": "Dr. Alice Johnson"
      },
      "notes": "Case created"
    },
    {
      "status": "in progress",
      "timestamp": "2025-04-16T09:30:00Z",
      "changedBy": {
        "id": "user-789",
        "name": "Tom Wilson"
      },
      "notes": "Started working on the crown preparation"
    }
  ]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center">
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
                      <span className="font-mono text-sm">/api/cases/status-counts</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Get counts of cases by status</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div>
                      <h4 className="font-medium">Headers</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium">Query Parameters</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`?period=week&technicianId=user-789  # Optional filters`}
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium">Response (200 OK)</h4>
                      <pre className="bg-muted p-2 rounded-md mt-1 text-sm font-mono overflow-x-auto">
{`{
  "counts": {
    "new": 5,
    "in progress": 12,
    "pending review": 3,
    "completed": 8,
    "delivered": 15
  },
  "total": 43
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Database Schema</CardTitle>
          <CardDescription>
            Core data models for the DentalFlow backend
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Users</h3>
            <pre className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
{`Table: users
- id (PK): UUID
- name: STRING
- email: STRING (unique)
- password_hash: STRING
- role: ENUM ['dentist', 'technician', 'admin']
- clinic: STRING
- created_at: TIMESTAMP
- updated_at: TIMESTAMP`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Cases</h3>
            <pre className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
{`Table: cases
- id (PK): UUID
- patient_name: STRING
- patient_id: STRING (ref to external system)
- case_type: STRING
- tooth_numbers: ARRAY[INTEGER]
- material: STRING
- shade: STRING
- instructions: TEXT
- status: ENUM ['new', 'in progress', 'pending review', 'completed', 'delivered']
- priority: ENUM ['low', 'medium', 'high', 'urgent']
- dentist_id: UUID (FK to users)
- technician_id: UUID (FK to users)
- due_date: TIMESTAMP
- completed_date: TIMESTAMP
- created_at: TIMESTAMP
- updated_at: TIMESTAMP`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Case Status History</h3>
            <pre className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
{`Table: case_status_history
- id (PK): UUID
- case_id: UUID (FK to cases)
- status: ENUM ['new', 'in progress', 'pending review', 'completed', 'delivered']
- previous_status: ENUM ['new', 'in progress', 'pending review', 'completed', 'delivered']
- changed_by: UUID (FK to users)
- notes: TEXT
- timestamp: TIMESTAMP`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Case Attachments</h3>
            <pre className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
{`Table: case_attachments
- id (PK): UUID
- case_id: UUID (FK to cases)
- name: STRING
- file_type: STRING
- url: STRING
- uploaded_by: UUID (FK to users)
- created_at: TIMESTAMP`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Messages</h3>
            <pre className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
{`Table: messages
- id (PK): UUID
- conversation_id: UUID
- sender_id: UUID (FK to users)
- recipient_id: UUID (FK to users)
- case_id: UUID (FK to cases, nullable)
- content: TEXT
- read: BOOLEAN
- created_at: TIMESTAMP
- updated_at: TIMESTAMP`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Message Attachments</h3>
            <pre className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
{`Table: message_attachments
- id (PK): UUID
- message_id: UUID (FK to messages)
- name: STRING
- file_type: STRING
- url: STRING
- created_at: TIMESTAMP`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Inventory Items</h3>
            <pre className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
{`Table: inventory_items
- id (PK): UUID
- name: STRING
- description: TEXT
- sku: STRING
- category_id: UUID (FK to inventory_categories)
- supplier_id: UUID (FK to inventory_suppliers)
- quantity: INTEGER
- min_quantity: INTEGER
- unit_price: DECIMAL
- location: STRING
- last_ordered: TIMESTAMP
- created_at: TIMESTAMP
- updated_at: TIMESTAMP`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Inventory Categories</h3>
            <pre className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
{`Table: inventory_categories
- id (PK): UUID
- name: STRING
- description: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Inventory Suppliers</h3>
            <pre className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">
{`Table: inventory_suppliers
- id (PK): UUID
- name: STRING
- contact_name: STRING
- email: STRING
- phone: STRING
- address: TEXT
- website: STRING
- created_at: TIMESTAMP
- updated_at: TIMESTAMP`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiDocumentation;

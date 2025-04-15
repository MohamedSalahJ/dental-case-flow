
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

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
- status: ENUM ['pending', 'in-progress', 'review', 'completed', 'cancelled']
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


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
import { Badge } from "@/components/ui/badge";

const ApiDocumentation = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
        <p className="text-muted-foreground">
          Comprehensive guide to integrating with the DentalFlow API.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="cases">Cases</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Learn how to integrate with the DentalFlow API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The DentalFlow API is a RESTful API that allows you to integrate your dental practice management system with DentalFlow. It provides access to cases, invoices, patients, dentists, and more.
              </p>
              
              <h3 className="text-lg font-semibold mt-4">Base URL</h3>
              <pre className="bg-muted p-4 rounded-md overflow-auto">
                <code>https://api.dentalflow.com/v1</code>
              </pre>
              
              <h3 className="text-lg font-semibold mt-4">Rate Limiting</h3>
              <p>
                The API is rate limited to 100 requests per minute per API key. If you exceed this limit, you will receive a 429 Too Many Requests response.
              </p>
              
              <h3 className="text-lg font-semibold mt-4">Response Format</h3>
              <p>
                All responses are returned in JSON format with the following structure:
              </p>
              <pre className="bg-muted p-4 rounded-md overflow-auto">
                <code>{`{
  "status": "success",
  "data": {
    // Response data
  }
}`}</code>
              </pre>
              
              <h3 className="text-lg font-semibold mt-4">Error Handling</h3>
              <p>
                Errors are returned with an appropriate HTTP status code and a JSON response with the following structure:
              </p>
              <pre className="bg-muted p-4 rounded-md overflow-auto">
                <code>{`{
  "status": "error",
  "message": "Error message",
  "code": "ERROR_CODE"
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="auth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                Learn how to authenticate with the DentalFlow API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The DentalFlow API uses API keys for authentication. You can generate API keys from the Settings page in your DentalFlow account.
              </p>
              
              <h3 className="text-lg font-semibold mt-4">API Key Authentication</h3>
              <p>
                Include your API key in the Authorization header of your request:
              </p>
              <pre className="bg-muted p-4 rounded-md overflow-auto">
                <code>Authorization: Bearer YOUR_API_KEY</code>
              </pre>
              
              <h3 className="text-lg font-semibold mt-4">Example Request</h3>
              <pre className="bg-muted p-4 rounded-md overflow-auto">
                <code>{`curl -X GET "https://api.dentalflow.com/v1/cases" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cases" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="get-cases">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Badge className="mr-2 bg-blue-500">GET</Badge>
                  <span>/cases</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>Retrieve a list of all cases.</p>
                  
                  <h4 className="font-semibold">Query Parameters</h4>
                  <ul className="list-disc pl-6">
                    <li><span className="font-mono">status</span> - Filter by case status</li>
                    <li><span className="font-mono">dentist_id</span> - Filter by dentist</li>
                    <li><span className="font-mono">patient_id</span> - Filter by patient</li>
                    <li><span className="font-mono">limit</span> - Number of cases to return (default: 50)</li>
                    <li><span className="font-mono">offset</span> - Offset for pagination (default: 0)</li>
                  </ul>
                  
                  <h4 className="font-semibold">Example Response</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
                    <code>{`{
  "status": "success",
  "data": {
    "cases": [
      {
        "id": "C-2025-042",
        "patient": {
          "id": "P-001",
          "name": "John Smith"
        },
        "dentist": {
          "id": "D-001",
          "name": "Dr. Alice Johnson"
        },
        "status": "in progress",
        "type": "Crown",
        "created_at": "2025-04-15T10:30:00Z",
        "due_date": "2025-04-22T10:30:00Z"
      },
      // More cases...
    ],
    "meta": {
      "total": 120,
      "limit": 50,
      "offset": 0
    }
  }
}`}</code>
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="get-case">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Badge className="mr-2 bg-blue-500">GET</Badge>
                  <span>/cases/:id</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>Retrieve details of a specific case.</p>
                  
                  <h4 className="font-semibold">Path Parameters</h4>
                  <ul className="list-disc pl-6">
                    <li><span className="font-mono">id</span> - The ID of the case</li>
                  </ul>
                  
                  <h4 className="font-semibold">Example Response</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
                    <code>{`{
  "status": "success",
  "data": {
    "id": "C-2025-042",
    "patient": {
      "id": "P-001",
      "name": "John Smith",
      "contact": {
        "email": "john.smith@example.com",
        "phone": "555-123-4567"
      }
    },
    "dentist": {
      "id": "D-001",
      "name": "Dr. Alice Johnson",
      "contact": {
        "email": "alice.johnson@example.com",
        "phone": "555-987-6543"
      }
    },
    "status": "in progress",
    "type": "Crown",
    "restoration_type": "Porcelain",
    "shade": "A2",
    "created_at": "2025-04-15T10:30:00Z",
    "due_date": "2025-04-22T10:30:00Z",
    "last_updated": "2025-04-16T14:20:00Z",
    "notes": "Patient prefers a natural look",
    "attachments": [
      {
        "id": "ATT-001",
        "name": "X-Ray",
        "url": "https://api.dentalflow.com/v1/attachments/ATT-001",
        "content_type": "image/jpeg",
        "created_at": "2025-04-15T10:35:00Z"
      }
    ],
    "status_history": [
      {
        "status": "new",
        "changed_at": "2025-04-15T10:30:00Z",
        "changed_by": {
          "id": "D-001",
          "name": "Dr. Alice Johnson"
        },
        "notes": "Case created"
      },
      {
        "status": "in progress",
        "changed_at": "2025-04-16T14:20:00Z",
        "changed_by": {
          "id": "T-001",
          "name": "Tom Miller"
        },
        "notes": "Started working on the crown"
      }
    ]
  }
}`}</code>
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="post-case-status">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Badge className="mr-2 bg-green-500">POST</Badge>
                  <span>/cases/:id/status</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>Update the status of a case.</p>
                  
                  <h4 className="font-semibold">Path Parameters</h4>
                  <ul className="list-disc pl-6">
                    <li><span className="font-mono">id</span> - The ID of the case</li>
                  </ul>
                  
                  <h4 className="font-semibold">Request Body</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
                    <code>{`{
  "status": "in progress",
  "notes": "Started working on the crown"
}`}</code>
                  </pre>
                  
                  <h4 className="font-semibold">Example Response</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
                    <code>{`{
  "status": "success",
  "data": {
    "id": "C-2025-042",
    "status": "in progress",
    "status_updated_at": "2025-04-16T14:20:00Z",
    "status_history": [
      {
        "status": "new",
        "changed_at": "2025-04-15T10:30:00Z",
        "changed_by": {
          "id": "D-001",
          "name": "Dr. Alice Johnson"
        },
        "notes": "Case created"
      },
      {
        "status": "in progress",
        "changed_at": "2025-04-16T14:20:00Z",
        "changed_by": {
          "id": "T-001",
          "name": "Tom Miller"
        },
        "notes": "Started working on the crown"
      }
    ]
  }
}`}</code>
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="get-invoices">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Badge className="mr-2 bg-blue-500">GET</Badge>
                  <span>/invoices</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>Retrieve a list of all invoices.</p>
                  
                  <h4 className="font-semibold">Query Parameters</h4>
                  <ul className="list-disc pl-6">
                    <li><span className="font-mono">status</span> - Filter by invoice status (paid, unpaid, overdue)</li>
                    <li><span className="font-mono">dentist_id</span> - Filter by dentist</li>
                    <li><span className="font-mono">patient_id</span> - Filter by patient</li>
                    <li><span className="font-mono">case_id</span> - Filter by related case</li>
                    <li><span className="font-mono">start_date</span> - Filter by invoice date (start)</li>
                    <li><span className="font-mono">end_date</span> - Filter by invoice date (end)</li>
                    <li><span className="font-mono">limit</span> - Number of invoices to return (default: 50)</li>
                    <li><span className="font-mono">offset</span> - Offset for pagination (default: 0)</li>
                  </ul>
                  
                  <h4 className="font-semibold">Example Response</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
                    <code>{`{
  "status": "success",
  "data": {
    "invoices": [
      {
        "id": "INV-2025-042",
        "patient": {
          "id": "P-001",
          "name": "John Smith"
        },
        "dentist": {
          "id": "D-001",
          "name": "Dr. Alice Johnson"
        },
        "case_id": "C-2025-042",
        "status": "unpaid",
        "amount": 1350.00,
        "date": "2025-04-15",
        "due_date": "2025-04-30"
      },
      // More invoices...
    ],
    "meta": {
      "total": 85,
      "limit": 50,
      "offset": 0
    }
  }
}`}</code>
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="get-invoice">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Badge className="mr-2 bg-blue-500">GET</Badge>
                  <span>/invoices/:id</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>Retrieve details of a specific invoice.</p>
                  
                  <h4 className="font-semibold">Path Parameters</h4>
                  <ul className="list-disc pl-6">
                    <li><span className="font-mono">id</span> - The ID of the invoice</li>
                  </ul>
                  
                  <h4 className="font-semibold">Example Response</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
                    <code>{`{
  "status": "success",
  "data": {
    "id": "INV-2025-042",
    "patient": {
      "id": "P-001",
      "name": "John Smith",
      "contact": {
        "email": "john.smith@example.com",
        "phone": "555-123-4567"
      }
    },
    "dentist": {
      "id": "D-001",
      "name": "Dr. Alice Johnson",
      "contact": {
        "email": "alice.johnson@example.com",
        "phone": "555-987-6543"
      }
    },
    "case_id": "C-2025-042",
    "status": "unpaid",
    "date": "2025-04-15",
    "due_date": "2025-04-30",
    "items": [
      {
        "id": 1,
        "description": "Crown - Porcelain/Ceramic",
        "quantity": 1,
        "unit_price": 950.00,
        "amount": 950.00
      },
      {
        "id": 2,
        "description": "Impression - Digital Scan",
        "quantity": 1,
        "unit_price": 120.00,
        "amount": 120.00
      },
      {
        "id": 3,
        "description": "Temporary Crown",
        "quantity": 1,
        "unit_price": 180.00,
        "amount": 180.00
      }
    ],
    "subtotal": 1250.00,
    "tax": 100.00,
    "total": 1350.00,
    "notes": "Please ensure payment is made before the due date. Thank you for your business.",
    "payments": []
  }
}`}</code>
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="post-payment">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Badge className="mr-2 bg-green-500">POST</Badge>
                  <span>/invoices/:id/payments</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>Record a payment for an invoice.</p>
                  
                  <h4 className="font-semibold">Path Parameters</h4>
                  <ul className="list-disc pl-6">
                    <li><span className="font-mono">id</span> - The ID of the invoice</li>
                  </ul>
                  
                  <h4 className="font-semibold">Request Body</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
                    <code>{`{
  "amount": 1350.00,
  "method": "credit",
  "date": "2025-04-18",
  "reference": "TRANS-12345"
}`}</code>
                  </pre>
                  
                  <h4 className="font-semibold">Example Response</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
                    <code>{`{
  "status": "success",
  "data": {
    "id": "PAY-001",
    "invoice_id": "INV-2025-042",
    "amount": 1350.00,
    "method": "credit",
    "date": "2025-04-18",
    "reference": "TRANS-12345",
    "created_at": "2025-04-18T10:30:00Z",
    "created_by": {
      "id": "U-001",
      "name": "Jane Doe"
    }
  }
}`}</code>
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="get-dentists">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Badge className="mr-2 bg-blue-500">GET</Badge>
                  <span>/dentists</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>Retrieve a list of all dentists.</p>
                  
                  <h4 className="font-semibold">Query Parameters</h4>
                  <ul className="list-disc pl-6">
                    <li><span className="font-mono">limit</span> - Number of dentists to return (default: 50)</li>
                    <li><span className="font-mono">offset</span> - Offset for pagination (default: 0)</li>
                  </ul>
                  
                  <h4 className="font-semibold">Example Response</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
                    <code>{`{
  "status": "success",
  "data": {
    "dentists": [
      {
        "id": "D-001",
        "name": "Dr. Alice Johnson",
        "email": "alice.johnson@example.com",
        "phone": "555-987-6543",
        "practice": "Johnson Dental Clinic",
        "created_at": "2025-01-15T10:30:00Z"
      },
      // More dentists...
    ],
    "meta": {
      "total": 25,
      "limit": 50,
      "offset": 0
    }
  }
}`}</code>
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="get-technicians">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Badge className="mr-2 bg-blue-500">GET</Badge>
                  <span>/technicians</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>Retrieve a list of all lab technicians.</p>
                  
                  <h4 className="font-semibold">Query Parameters</h4>
                  <ul className="list-disc pl-6">
                    <li><span className="font-mono">limit</span> - Number of technicians to return (default: 50)</li>
                    <li><span className="font-mono">offset</span> - Offset for pagination (default: 0)</li>
                  </ul>
                  
                  <h4 className="font-semibold">Example Response</h4>
                  <pre className="bg-muted p-4 rounded-md overflow-auto">
                    <code>{`{
  "status": "success",
  "data": {
    "technicians": [
      {
        "id": "T-001",
        "name": "Tom Miller",
        "email": "tom.miller@example.com",
        "phone": "555-111-2222",
        "specialization": "Crowns and Bridges",
        "created_at": "2025-01-20T10:30:00Z"
      },
      // More technicians...
    ],
    "meta": {
      "total": 15,
      "limit": 50,
      "offset": 0
    }
  }
}`}</code>
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiDocumentation;

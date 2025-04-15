
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ERDDiagram = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Database Schema</h1>
        <p className="text-muted-foreground">
          Entity Relationship Diagram (ERD) for the DentalFlow system
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Entity Relationship Diagram</CardTitle>
          <CardDescription>
            Visual representation of the database schema with entity relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto p-4 border rounded-md bg-white dark:bg-gray-900">
            <svg width="900" height="700" viewBox="0 0 900 700" className="mx-auto">
              {/* Users Table */}
              <g transform="translate(50, 50)">
                <rect width="200" height="180" rx="5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                <text x="100" y="30" textAnchor="middle" fontWeight="bold" fontSize="16">Users</text>
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94a3b8" strokeWidth="2" />
                
                <text x="30" y="65" fontSize="13">id (PK)</text>
                <text x="30" y="90" fontSize="13">name</text>
                <text x="30" y="115" fontSize="13">email</text>
                <text x="30" y="140" fontSize="13">role (dentist, technician)</text>
                <text x="30" y="165" fontSize="13">created_at</text>
              </g>
              
              {/* Cases Table */}
              <g transform="translate(350, 50)">
                <rect width="200" height="230" rx="5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                <text x="100" y="30" textAnchor="middle" fontWeight="bold" fontSize="16">Cases</text>
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94a3b8" strokeWidth="2" />
                
                <text x="30" y="65" fontSize="13">id (PK)</text>
                <text x="30" y="90" fontSize="13">patient_id (FK)</text>
                <text x="30" y="115" fontSize="13">dentist_id (FK)</text>
                <text x="30" y="140" fontSize="13">technician_id (FK)</text>
                <text x="30" y="165" fontSize="13">status</text>
                <text x="30" y="190" fontSize="13">due_date</text>
                <text x="30" y="215" fontSize="13">created_at</text>
              </g>
              
              {/* Patients Table */}
              <g transform="translate(650, 50)">
                <rect width="200" height="180" rx="5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                <text x="100" y="30" textAnchor="middle" fontWeight="bold" fontSize="16">Patients</text>
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94a3b8" strokeWidth="2" />
                
                <text x="30" y="65" fontSize="13">id (PK)</text>
                <text x="30" y="90" fontSize="13">name</text>
                <text x="30" y="115" fontSize="13">contact_info</text>
                <text x="30" y="140" fontSize="13">dentist_id (FK)</text>
                <text x="30" y="165" fontSize="13">created_at</text>
              </g>
              
              {/* CaseDetails Table */}
              <g transform="translate(350, 330)">
                <rect width="200" height="180" rx="5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                <text x="100" y="30" textAnchor="middle" fontWeight="bold" fontSize="16">CaseDetails</text>
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94a3b8" strokeWidth="2" />
                
                <text x="30" y="65" fontSize="13">id (PK)</text>
                <text x="30" y="90" fontSize="13">case_id (FK)</text>
                <text x="30" y="115" fontSize="13">type</text>
                <text x="30" y="140" fontSize="13">restoration_type</text>
                <text x="30" y="165" fontSize="13">notes</text>
              </g>
              
              {/* StatusHistory Table */}
              <g transform="translate(50, 330)">
                <rect width="200" height="180" rx="5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                <text x="100" y="30" textAnchor="middle" fontWeight="bold" fontSize="16">StatusHistory</text>
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94a3b8" strokeWidth="2" />
                
                <text x="30" y="65" fontSize="13">id (PK)</text>
                <text x="30" y="90" fontSize="13">case_id (FK)</text>
                <text x="30" y="115" fontSize="13">status</text>
                <text x="30" y="140" fontSize="13">changed_by (FK)</text>
                <text x="30" y="165" fontSize="13">notes</text>
              </g>
              
              {/* Invoices Table */}
              <g transform="translate(650, 330)">
                <rect width="200" height="230" rx="5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                <text x="100" y="30" textAnchor="middle" fontWeight="bold" fontSize="16">Invoices</text>
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94a3b8" strokeWidth="2" />
                
                <text x="30" y="65" fontSize="13">id (PK)</text>
                <text x="30" y="90" fontSize="13">case_id (FK)</text>
                <text x="30" y="115" fontSize="13">patient_id (FK)</text>
                <text x="30" y="140" fontSize="13">dentist_id (FK)</text>
                <text x="30" y="165" fontSize="13">status</text>
                <text x="30" y="190" fontSize="13">amount</text>
                <text x="30" y="215" fontSize="13">due_date</text>
              </g>
              
              {/* Invoice Items Table */}
              <g transform="translate(650, 560)">
                <rect width="200" height="130" rx="5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                <text x="100" y="30" textAnchor="middle" fontWeight="bold" fontSize="16">InvoiceItems</text>
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94a3b8" strokeWidth="2" />
                
                <text x="30" y="65" fontSize="13">id (PK)</text>
                <text x="30" y="90" fontSize="13">invoice_id (FK)</text>
                <text x="30" y="115" fontSize="13">description</text>
              </g>
              
              {/* Payments Table */}
              <g transform="translate(350, 560)">
                <rect width="200" height="130" rx="5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                <text x="100" y="30" textAnchor="middle" fontWeight="bold" fontSize="16">Payments</text>
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94a3b8" strokeWidth="2" />
                
                <text x="30" y="65" fontSize="13">id (PK)</text>
                <text x="30" y="90" fontSize="13">invoice_id (FK)</text>
                <text x="30" y="115" fontSize="13">amount</text>
              </g>
              
              {/* Messages Table */}
              <g transform="translate(50, 560)">
                <rect width="200" height="130" rx="5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                <text x="100" y="30" textAnchor="middle" fontWeight="bold" fontSize="16">Messages</text>
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94a3b8" strokeWidth="2" />
                
                <text x="30" y="65" fontSize="13">id (PK)</text>
                <text x="30" y="90" fontSize="13">sender_id (FK)</text>
                <text x="30" y="115" fontSize="13">recipient_id (FK)</text>
              </g>
              
              {/* Relationship Lines */}
              {/* Users to Cases (dentist) */}
              <line x1="250" y1="110" x2="350" y2="115" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="345,110 355,115 345,120" fill="#94a3b8" />
              
              {/* Users to Cases (technician) */}
              <line x1="250" y1="120" x2="350" y2="140" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="345,135 355,140 345,145" fill="#94a3b8" />
              
              {/* Patients to Cases */}
              <line x1="650" y1="115" x2="550" y2="90" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="545,85 555,90 545,95" fill="#94a3b8" />
              
              {/* Cases to CaseDetails */}
              <line x1="450" y1="280" x2="450" y2="330" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="445,325 450,335 455,325" fill="#94a3b8" />
              
              {/* Cases to StatusHistory */}
              <line x1="350" y1="165" x2="250" y2="330" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="245,325 250,335 255,325" fill="#94a3b8" />
              
              {/* Cases to Invoices */}
              <line x1="550" y1="165" x2="650" y2="330" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="645,325 655,335 655,325" fill="#94a3b8" />
              
              {/* Invoices to InvoiceItems */}
              <line x1="750" y1="560" x2="750" y2="510" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="745,515 750,505 755,515" fill="#94a3b8" />
              
              {/* Invoices to Payments */}
              <line x1="650" y1="445" x2="550" y2="560" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="545,555 550,565 555,555" fill="#94a3b8" />
              
              {/* Users to Messages (sender) */}
              <line x1="150" y1="230" x2="150" y2="560" stroke="#94a3b8" strokeWidth="2" />
              <polygon points="145,555 150,565 155,555" fill="#94a3b8" />
            </svg>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Key Relationships</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Users can be dentists or technicians and are associated with cases</li>
              <li>Cases are linked to patients, dentists, and technicians</li>
              <li>Each case has detailed information (CaseDetails)</li>
              <li>Status changes are tracked in StatusHistory</li>
              <li>Invoices are generated for cases and can contain multiple items</li>
              <li>Payments are recorded against invoices</li>
              <li>Messages can be sent between users (dentists and technicians)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Database Design Considerations</CardTitle>
          <CardDescription>
            Important aspects of the database design
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Case Status Workflow</h3>
              <p className="text-muted-foreground mt-1">
                The case status transitions follow a specific workflow:
              </p>
              <ol className="list-decimal pl-6 mt-2">
                <li>New → In Progress → Pending Review → Completed → Delivered</li>
              </ol>
              <p className="text-muted-foreground mt-1">
                Each status change is recorded in the StatusHistory table with notes and the user who made the change.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">Invoice Status Tracking</h3>
              <p className="text-muted-foreground mt-1">
                Invoices have different statuses:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Unpaid: New invoice with no payments</li>
                <li>Partially Paid: Some payments recorded but not covering the full amount</li>
                <li>Paid: Full amount has been paid</li>
                <li>Overdue: Past due date with no or partial payment</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">Role-Based Access Control</h3>
              <p className="text-muted-foreground mt-1">
                The user role determines their permissions in the system:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Dentists: Can create cases, view case status, and message technicians</li>
                <li>Technicians: Can update case status, add notes, and message dentists</li>
                <li>Administrators: Have full access to all features and data</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ERDDiagram;

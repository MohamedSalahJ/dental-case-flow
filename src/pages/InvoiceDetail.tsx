
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Printer, 
  Download, 
  Send,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableFooter, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { InvoiceStatusBadge } from "@/components/invoice/InvoiceStatusBadge";
import { InvoicePaymentDialog } from "@/components/invoice/InvoicePaymentDialog";

const mockInvoice = {
  id: "INV-2025-042",
  status: "unpaid",
  patient: "John Smith",
  dentist: "Dr. Alice Johnson",
  dentistInitials: "AJ",
  date: "April 15, 2025",
  dueDate: "April 30, 2025",
  items: [
    { id: 1, description: "Crown - Porcelain/Ceramic", quantity: 1, unitPrice: 950.00 },
    { id: 2, description: "Impression - Digital Scan", quantity: 1, unitPrice: 120.00 },
    { id: 3, description: "Temporary Crown", quantity: 1, unitPrice: 180.00 },
  ],
  subtotal: 1250.00,
  tax: 100.00,
  total: 1350.00,
  notes: "Please ensure payment is made before the due date. Thank you for your business."
};

const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/invoices">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Invoice {id}</h1>
            <InvoiceStatusBadge status={mockInvoice.status} />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Send className="mr-2 h-4 w-4" /> 
              Send Invoice
            </Button>
            {mockInvoice.status === "unpaid" && (
              <Button onClick={() => setShowPaymentDialog(true)}>
                <CheckCircle2 className="mr-2 h-4 w-4" /> 
                Record Payment
              </Button>
            )}
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">DF</span>
                  </div>
                  <span className="font-semibold text-lg">DentalFlow</span>
                </div>
                <CardDescription className="mt-2">
                  1234 Dental Street, Suite 100<br />
                  San Francisco, CA 94110<br />
                  contact@dentalflow.com<br />
                  (555) 123-4567
                </CardDescription>
              </div>
              <div className="text-right">
                <CardTitle>INVOICE</CardTitle>
                <CardDescription className="mt-2">
                  Invoice Number: {mockInvoice.id}<br />
                  Date: {mockInvoice.date}<br />
                  Due Date: {mockInvoice.dueDate}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-semibold mb-2">Bill To:</h3>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{mockInvoice.dentistInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{mockInvoice.dentist}</p>
                    <p className="text-sm text-muted-foreground">
                      Patient: {mockInvoice.patient}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    {mockInvoice.status === "unpaid" ? (
                      <Clock className="h-4 w-4 text-amber-500" />
                    ) : mockInvoice.status === "paid" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <p className="font-medium">
                      {mockInvoice.status === "unpaid" ? "Payment Due" : mockInvoice.status === "paid" ? "Paid" : "Overdue"}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {mockInvoice.status === "unpaid" ? 
                      `Due on ${mockInvoice.dueDate}` : 
                      mockInvoice.status === "paid" ? 
                      "Paid on April 18, 2025" : 
                      "Overdue by 5 days"}
                  </p>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[100px] text-right">Quantity</TableHead>
                  <TableHead className="w-[150px] text-right">Unit Price</TableHead>
                  <TableHead className="w-[150px] text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoice.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="text-right">Subtotal</TableCell>
                  <TableCell className="text-right">${mockInvoice.subtotal.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="text-right">Tax (8%)</TableCell>
                  <TableCell className="text-right">${mockInvoice.tax.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">${mockInvoice.total.toFixed(2)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            
            <div className="mt-6 bg-muted/30 p-4 rounded-lg">
              <h3 className="text-sm font-semibold mb-2">Notes:</h3>
              <p className="text-sm text-muted-foreground">{mockInvoice.notes}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <InvoicePaymentDialog 
        open={showPaymentDialog} 
        onOpenChange={setShowPaymentDialog}
        invoiceId={mockInvoice.id}
        amount={mockInvoice.total}
      />
    </MainLayout>
  );
};

export default InvoiceDetail;

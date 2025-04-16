
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Printer, 
  Download, 
  Send, 
  CheckCircle2, 
  ArrowLeft,
  Clock,
  XCircle,
  Loader2
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
import { useToast } from "@/components/ui/use-toast";
import invoiceService, { Invoice } from "@/services/invoiceService";
import { format } from "date-fns";

const mockInvoice = {
  id: "INV-2025-042",
  invoiceNumber: "INV-2025-042",
  status: "unpaid" as "unpaid" | "paid" | "overdue",
  patientId: 1,
  patientName: "John Smith",
  dentistId: 1,
  dentistName: "Dr. Alice Johnson",
  dentistInitials: "AJ",
  amount: 1350.00,
  tax: 135.00,
  total: 1485.00,
  notes: "Please pay by due date",
  issueDate: "2025-04-15",
  dueDate: "2025-04-30",
  createdAt: "2025-04-15T10:00:00Z",
  updatedAt: "2025-04-15T10:00:00Z",
  items: [
    { id: 1, description: "Porcelain Crown", quantity: 1, unitPrice: 950.00, amount: 950.00 },
    { id: 2, description: "Digital Impression", quantity: 1, unitPrice: 200.00, amount: 200.00 },
    { id: 3, description: "Temporary Crown", quantity: 1, unitPrice: 200.00, amount: 200.00 }
  ]
};

const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await invoiceService.getById(id);
        setInvoice(data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
        toast({
          variant: "destructive",
          title: "Error loading invoice",
          description: "Could not load invoice details. Using mock data.",
        });
        // Use mock data as fallback
        setInvoice(mockInvoice);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id, toast]);

  const handleRecordPayment = async () => {
    if (!invoice || !id) return;
    
    try {
      setIsUpdating(true);
      const updatedInvoice = await invoiceService.updateStatus(id, "paid");
      setInvoice(updatedInvoice);
      toast({
        title: "Payment recorded",
        description: `Invoice ${invoice.invoiceNumber} has been marked as paid.`,
      });
    } catch (error) {
      console.error("Error updating invoice status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to record payment. Please try again.",
      });
    } finally {
      setShowPaymentDialog(false);
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[80vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading invoice...</span>
        </div>
      </MainLayout>
    );
  }

  if (!invoice) {
    return (
      <MainLayout>
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">Invoice not found</p>
          <Button asChild className="mt-4">
            <Link to="/invoices">Back to Invoices</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const getStatusIcon = () => {
    switch(invoice.status) {
      case 'paid':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'overdue':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="/invoices">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Invoice {invoice.invoiceNumber}</h1>
            <InvoiceStatusBadge status={invoice.status} />
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
            {invoice.status !== "paid" && (
              <Button 
                onClick={() => setShowPaymentDialog(true)}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" /> 
                    Record Payment
                  </>
                )}
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
                    <span className="text-primary-foreground font-semibold">
                      {invoice.dentistName ? invoice.dentistName.split(' ').map(n => n[0]).join('') : 'DD'}
                    </span>
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
                  Invoice Number: {invoice.invoiceNumber}<br />
                  Date: {new Date(invoice.issueDate).toLocaleDateString()}<br />
                  Due Date: {new Date(invoice.dueDate).toLocaleDateString()}
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
                    <AvatarFallback>
                      {invoice.patientName ? invoice.patientName.split(' ').map(n => n[0]).join('') : 'P'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{invoice.patientName}</p>
                    <p className="text-sm text-muted-foreground">
                      Patient of {invoice.dentistName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    {getStatusIcon()}
                    <span className="font-medium">
                      {invoice.status === 'paid' ? 'Paid' : 
                       invoice.status === 'overdue' ? 'Overdue' : 'Payment Due'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {invoice.status === 'paid' 
                      ? `Paid on ${invoice.paidDate ? new Date(invoice.paidDate).toLocaleDateString() : 'N/A'}`
                      : invoice.status === 'overdue' 
                        ? `Due date was ${new Date(invoice.dueDate).toLocaleDateString()}`
                        : `Due on ${new Date(invoice.dueDate).toLocaleDateString()}`
                    }
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
                {invoice.items.map((item, index) => (
                  <TableRow key={item.id || index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${(item.amount || (item.quantity * item.unitPrice)).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">Subtotal</TableCell>
                  <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">Tax</TableCell>
                  <TableCell className="text-right">${invoice.tax.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
                  <TableCell className="text-right font-bold">${invoice.total.toFixed(2)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            
            {invoice.notes && (
              <div className="mt-6 bg-muted/30 p-4 rounded-lg">
                <h3 className="text-sm font-semibold mb-2">Notes:</h3>
                <p className="text-sm text-muted-foreground">{invoice.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <InvoicePaymentDialog 
        open={showPaymentDialog} 
        onOpenChange={setShowPaymentDialog}
        invoiceId={invoice.id?.toString() || ''}
        amount={invoice.total}
        onConfirm={handleRecordPayment}
      />
    </MainLayout>
  );
};

export default InvoiceDetail;

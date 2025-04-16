
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, AlertTriangle, Loader2 } from "lucide-react";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";
import { useToast } from "@/components/ui/use-toast";
import invoiceService, { Invoice } from "@/services/invoiceService";

interface InvoiceListProps {
  filter: string;
}

export const InvoiceList = ({ filter }: InvoiceListProps) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await invoiceService.getAll(filter === "all" ? undefined : filter as any);
        setInvoices(data);
      } catch (err) {
        console.error("Failed to fetch invoices:", err);
        setError("Failed to load invoices. Please try again later.");
        toast({
          variant: "destructive",
          title: "Error loading invoices",
          description: "Using mock data as fallback.",
        });
        // Use mock data as fallback
        setInvoices(mockInvoices);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [filter, toast]);

  if (loading) {
    return (
      <div className="border rounded-md p-8 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
        <p className="text-sm text-muted-foreground">Loading invoices...</p>
      </div>
    );
  }

  // Mock data for fallback
  const mockInvoices: Invoice[] = [
    {
      id: "INV-2025-042",
      invoiceNumber: "INV-2025-042",
      patientId: 1,
      patientName: "John Smith",
      dentistId: 1,
      dentistName: "Dr. Alice Johnson",
      amount: 1350.00,
      tax: 135.00,
      total: 1485.00,
      status: "unpaid",
      issueDate: "2025-04-15",
      dueDate: "2025-04-30",
      createdAt: "2025-04-15T10:00:00Z",
      updatedAt: "2025-04-15T10:00:00Z",
      items: []
    },
    {
      id: "INV-2025-041",
      invoiceNumber: "INV-2025-041",
      patientId: 2,
      patientName: "Sarah Williams",
      dentistId: 2,
      dentistName: "Dr. Robert Chen",
      amount: 2100.00,
      tax: 210.00,
      total: 2310.00,
      status: "unpaid",
      issueDate: "2025-04-14",
      dueDate: "2025-04-29",
      createdAt: "2025-04-14T10:00:00Z",
      updatedAt: "2025-04-14T10:00:00Z",
      items: []
    },
    {
      id: "INV-2025-040",
      invoiceNumber: "INV-2025-040",
      patientId: 3,
      patientName: "Michael Davis",
      dentistId: 3,
      dentistName: "Dr. Emily Wilson",
      amount: 950.00,
      tax: 95.00,
      total: 1045.00,
      status: "overdue",
      issueDate: "2025-04-01",
      dueDate: "2025-04-08",
      createdAt: "2025-04-01T10:00:00Z",
      updatedAt: "2025-04-01T10:00:00Z",
      items: []
    },
    {
      id: "INV-2025-039",
      invoiceNumber: "INV-2025-039",
      patientId: 4,
      patientName: "Jennifer Lopez",
      dentistId: 4,
      dentistName: "Dr. David Kim",
      amount: 1750.00,
      tax: 175.00,
      total: 1925.00,
      status: "paid",
      issueDate: "2025-03-25",
      dueDate: "2025-04-10",
      paidDate: "2025-04-05",
      createdAt: "2025-03-25T10:00:00Z",
      updatedAt: "2025-04-05T10:00:00Z",
      items: []
    },
    {
      id: "INV-2025-038",
      invoiceNumber: "INV-2025-038",
      patientId: 5,
      patientName: "Robert Johnson",
      dentistId: 1,
      dentistName: "Dr. Alice Johnson",
      amount: 850.00,
      tax: 85.00,
      total: 935.00,
      status: "paid",
      issueDate: "2025-03-20",
      dueDate: "2025-04-05",
      paidDate: "2025-04-02",
      createdAt: "2025-03-20T10:00:00Z",
      updatedAt: "2025-04-02T10:00:00Z",
      items: []
    }
  ];

  const filteredInvoices = filter === "all" 
    ? invoices 
    : invoices.filter(invoice => invoice.status === filter);

  return (
    <div className="border rounded-md">
      {error && (
        <div className="bg-amber-50 border-b border-amber-200 p-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <p className="text-sm text-amber-700">{error}</p>
        </div>
      )}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Dentist</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                No invoices found matching the selected filter.
              </TableCell>
            </TableRow>
          ) : (
            filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
                  <Link to={`/invoices/${invoice.id}`} className="hover:underline">
                    {invoice.invoiceNumber}
                  </Link>
                </TableCell>
                <TableCell>{invoice.patientName}</TableCell>
                <TableCell>{invoice.dentistName}</TableCell>
                <TableCell>{new Date(invoice.issueDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>${invoice.total.toFixed(2)}</TableCell>
                <TableCell>
                  <InvoiceStatusBadge status={invoice.status} />
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/invoices/${invoice.id}`} className="cursor-pointer flex items-center">
                            <Eye className="mr-2 h-4 w-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={`mailto:${invoice.patientName?.replace(' ', '.')}@example.com?subject=Invoice ${invoice.invoiceNumber}&body=Please find your invoice attached.`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" /> Send
                          </a>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

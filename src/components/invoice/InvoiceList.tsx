
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";

type Invoice = {
  id: string;
  patient: string;
  dentist: string;
  amount: number;
  status: "paid" | "unpaid" | "overdue";
  date: string;
  dueDate: string;
};

const mockInvoices: Invoice[] = [
  {
    id: "INV-2025-042",
    patient: "John Smith",
    dentist: "Dr. Alice Johnson",
    amount: 1350.00,
    status: "unpaid",
    date: "Apr 15, 2025",
    dueDate: "Apr 30, 2025",
  },
  {
    id: "INV-2025-041",
    patient: "Sarah Williams",
    dentist: "Dr. Robert Chen",
    amount: 2100.00,
    status: "unpaid",
    date: "Apr 14, 2025",
    dueDate: "Apr 29, 2025",
  },
  {
    id: "INV-2025-040",
    patient: "Michael Davis",
    dentist: "Dr. Emily Wilson",
    amount: 950.00,
    status: "overdue",
    date: "Apr 01, 2025",
    dueDate: "Apr 08, 2025",
  },
  {
    id: "INV-2025-039",
    patient: "Jennifer Lopez",
    dentist: "Dr. David Kim",
    amount: 1750.00,
    status: "paid",
    date: "Mar 25, 2025",
    dueDate: "Apr 10, 2025",
  },
  {
    id: "INV-2025-038",
    patient: "Robert Johnson",
    dentist: "Dr. Alice Johnson",
    amount: 850.00,
    status: "paid",
    date: "Mar 20, 2025",
    dueDate: "Apr 05, 2025",
  },
];

interface InvoiceListProps {
  filter: string;
}

export const InvoiceList = ({ filter }: InvoiceListProps) => {
  const filteredInvoices = filter === "all" 
    ? mockInvoices
    : mockInvoices.filter(invoice => invoice.status === filter);
  
  return (
    <div className="border rounded-md">
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
                    {invoice.id}
                  </Link>
                </TableCell>
                <TableCell>{invoice.patient}</TableCell>
                <TableCell>{invoice.dentist}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
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
                          <Link to={`/invoices/${invoice.id}`} className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" /> Send
                          </span>
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

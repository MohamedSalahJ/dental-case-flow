
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, AlertTriangle, Loader2 } from "lucide-react";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import invoiceService, { Invoice } from "@/services/invoiceService";

interface InvoiceListProps {
  filter: string;
}

export const InvoiceList = ({ filter }: InvoiceListProps) => {
  const { toast } = useToast();

  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ['invoices', filter],
    queryFn: () => invoiceService.getAll(filter === "all" ? undefined : filter as any),
  });

  if (isLoading) {
    return (
      <div className="border rounded-md p-8 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
        <p className="text-sm text-muted-foreground">Loading invoices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border rounded-md p-8 flex flex-col items-center justify-center">
        <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
        <p className="text-sm text-destructive">Failed to load invoices. Please try again later.</p>
      </div>
    );
  }

  const filteredInvoices = filter === "all" 
    ? invoices 
    : invoices?.filter(invoice => invoice.status === filter) || [];

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

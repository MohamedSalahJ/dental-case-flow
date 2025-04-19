
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, MoreHorizontal, Printer, FileEdit, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import invoiceService, { Invoice } from "@/services/invoiceService";

interface InvoiceListProps {
  filter: string;
}

export function InvoiceList({ filter }: InvoiceListProps) {
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);

  const { data: invoices, isLoading, isError, refetch } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => invoiceService.getAll(),
  });

  useEffect(() => {
    if (invoices) {
      if (filter === 'all') {
        setFilteredInvoices(invoices);
      } else {
        setFilteredInvoices(invoices.filter(invoice => invoice.status === filter));
      }
    }
  }, [invoices, filter]);

  const handleDeleteInvoice = async (id: number | string) => {
    try {
      await invoiceService.delete(id);
      toast({
        title: "Invoice deleted",
        description: "The invoice has been deleted successfully.",
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete invoice. Please try again.",
      });
      console.error("Failed to delete invoice:", error);
    }
  };

  const handleUpdateStatus = async (id: number | string, status: 'paid' | 'unpaid' | 'overdue') => {
    try {
      await invoiceService.updateStatus(id, status);
      toast({
        title: "Status updated",
        description: `Invoice status updated to ${status}.`,
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update status. Please try again.",
      });
      console.error("Failed to update invoice status:", error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-destructive">Failed to load invoices. Please try again later.</p>
            <Button variant="outline" className="mt-2" onClick={() => refetch()}>Retry</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredInvoices.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No invoices found for the selected filter.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <Link to={`/invoices/${invoice.id}`} className="font-medium hover:underline">
                      {invoice.invoiceNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{invoice.patientName}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{new Date(invoice.issueDate).toLocaleDateString()}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(invoice.issueDate), { addSuffix: true })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${invoice.total?.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice.status === 'paid'
                          ? 'default'
                          : invoice.status === 'overdue'
                          ? 'destructive'
                          : 'outline'
                      }
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/invoices/${invoice.id}`}>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/invoices/${invoice.id}/edit`}>
                            <FileEdit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.print()}>
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {invoice.status !== 'paid' && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(invoice.id!, 'paid')}>
                            Mark as Paid
                          </DropdownMenuItem>
                        )}
                        {invoice.status !== 'unpaid' && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(invoice.id!, 'unpaid')}>
                            Mark as Unpaid
                          </DropdownMenuItem>
                        )}
                        {invoice.status !== 'overdue' && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(invoice.id!, 'overdue')}>
                            Mark as Overdue
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the invoice.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => handleDeleteInvoice(invoice.id!)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

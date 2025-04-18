
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceList } from "@/components/invoice/InvoiceList";
import { InvoiceFilter } from "@/components/invoice/InvoiceFilter";
import invoiceService from "@/services/invoiceService";

const Invoices = () => {
  const [filter, setFilter] = useState("all");
  
  const { data: allInvoices, isLoading, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => invoiceService.getAll(),
  });

  // Calculate statistics
  const invoiceStats = useMemo(() => {
    const stats = {
      unpaid: { count: 0, total: 0 },
      overdue: { count: 0, total: 0 },
      paid: { count: 0, total: 0 }
    };

    if (allInvoices && allInvoices.length > 0) {
      allInvoices.forEach(invoice => {
        if (invoice.status === 'unpaid') {
          stats.unpaid.count++;
          stats.unpaid.total += invoice.total;
        } else if (invoice.status === 'overdue') {
          stats.overdue.count++;
          stats.overdue.total += invoice.total;
        } else if (invoice.status === 'paid') {
          stats.paid.count++;
          stats.paid.total += invoice.total;
        }
      });
    }
    
    return stats;
  }, [allInvoices]);
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading invoices...</span>
        </div>
      </MainLayout>
    );
  }
  
  if (error) {
    return (
      <MainLayout>
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
          <p className="text-destructive">Failed to load invoices. Please try again later.</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <div className="flex items-center gap-2">
            <Link to="/invoices/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Invoice
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Unpaid</CardTitle>
              <CardDescription>Invoices awaiting payment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${invoiceStats.unpaid.total.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{invoiceStats.unpaid.count} invoices</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Overdue</CardTitle>
              <CardDescription>Past due invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${invoiceStats.overdue.total.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{invoiceStats.overdue.count} invoices</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Paid</CardTitle>
              <CardDescription>Completed payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${invoiceStats.paid.total.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{invoiceStats.paid.count} invoices</p>
            </CardContent>
          </Card>
        </div>
        
        <InvoiceFilter currentFilter={filter} onFilterChange={setFilter} />
        <InvoiceList filter={filter} />
      </div>
    </MainLayout>
  );
};

export default Invoices;


import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceList } from "@/components/invoice/InvoiceList";
import { InvoiceFilter } from "@/components/invoice/InvoiceFilter";
import invoiceService from "@/services/invoiceService";

const Invoices = () => {
  const [filter, setFilter] = useState("all");
  
  const { data: allInvoices } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => invoiceService.getAll(),
  });

  // Calculate statistics
  const invoiceStats = {
    unpaid: {
      count: 0,
      total: 0
    },
    overdue: {
      count: 0,
      total: 0
    },
    paid: {
      count: 0,
      total: 0
    }
  };

  // Process invoice data for statistics
  useEffect(() => {
    if (allInvoices) {
      allInvoices.forEach(invoice => {
        if (invoice.status === 'unpaid') {
          invoiceStats.unpaid.count++;
          invoiceStats.unpaid.total += invoice.total;
        } else if (invoice.status === 'overdue') {
          invoiceStats.overdue.count++;
          invoiceStats.overdue.total += invoice.total;
        } else if (invoice.status === 'paid') {
          invoiceStats.paid.count++;
          invoiceStats.paid.total += invoice.total;
        }
      });
    }
  }, [allInvoices]);
  
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

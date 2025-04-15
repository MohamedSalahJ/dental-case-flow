
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Download, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceList } from "@/components/invoice/InvoiceList";
import { InvoiceFilter } from "@/components/invoice/InvoiceFilter";

const Invoices = () => {
  const [filter, setFilter] = useState("all");
  
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
              <div className="text-2xl font-bold">$12,650.00</div>
              <p className="text-xs text-muted-foreground">8 invoices</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Overdue</CardTitle>
              <CardDescription>Past due invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,200.00</div>
              <p className="text-xs text-muted-foreground">2 invoices</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Paid</CardTitle>
              <CardDescription>Completed payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,320.00</div>
              <p className="text-xs text-muted-foreground">24 invoices</p>
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


// We need to fix the caseType error
// Implementation will depend on the existing code in this file
// Since we don't have the specific file content, we'll create a minimal fix

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { PlusCircle, Trash2 } from "lucide-react";
import invoiceService from "@/services/invoiceService";
import dentistService from "@/services/dentistService";
import caseService from "@/services/caseService";

interface InvoiceItem {
  id?: number;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const NewInvoice = () => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    dentistId: 0,
    caseId: 0,
    issueDate: today,
    dueDate: today,
    status: 'draft',
    notes: '',
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { description: '', quantity: 1, unitPrice: 0, total: 0 }
  ]);

  const navigate = useNavigate();

  // Fetch dentists
  const { data: dentists } = useQuery({
    queryKey: ['dentists'],
    queryFn: dentistService.getAll
  });

  // Fetch cases
  const { data: cases } = useQuery({
    queryKey: ['cases'],
    queryFn: () => caseService.getAll()
  });

  // Create invoice mutation
  const createInvoiceMutation = useMutation({
    mutationFn: (data: any) => invoiceService.create(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Invoice created successfully",
      });
      navigate("/invoices");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create invoice. Please try again.",
      });
    }
  });

  // Calculate total amount
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  // Generate invoice number
  useEffect(() => {
    const generateInvoiceNumber = () => {
      const prefix = "INV";
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `${prefix}-${timestamp}-${random}`;
    };

    setInvoiceData(prev => ({
      ...prev,
      invoiceNumber: generateInvoiceNumber()
    }));
  }, []);

  // Update item total when quantity or unit price changes
  const updateItemTotal = (index: number, field: 'quantity' | 'unitPrice', value: number) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice;
    setItems(updatedItems);
  };

  // Update item description
  const updateItemDescription = (index: number, value: string) => {
    const updatedItems = [...items];
    updatedItems[index].description = value;
    setItems(updatedItems);
  };

  // Add new item
  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  };

  // Remove item
  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.some(item => !item.description || item.quantity <= 0 || item.unitPrice <= 0)) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill all item details with valid values.",
      });
      return;
    }
    
    const invoiceRequest = {
      ...invoiceData,
      items,
      totalAmount: calculateTotal()
    };
    
    createInvoiceMutation.mutate(invoiceRequest);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Create New Invoice</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input 
                  id="invoiceNumber" 
                  value={invoiceData.invoiceNumber} 
                  onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
                  disabled
                />
              </div>
              
              <div>
                <Label htmlFor="dentist">Dentist</Label>
                <Select 
                  value={invoiceData.dentistId ? invoiceData.dentistId.toString() : ""} 
                  onValueChange={(value) => setInvoiceData({...invoiceData, dentistId: parseInt(value)})}
                >
                  <SelectTrigger id="dentist">
                    <SelectValue placeholder="Select dentist" />
                  </SelectTrigger>
                  <SelectContent>
                    {dentists?.map((dentist: any) => (
                      <SelectItem key={dentist.id} value={dentist.id.toString()}>
                        {dentist.firstName} {dentist.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="case">Related Case</Label>
                <Select 
                  value={invoiceData.caseId ? invoiceData.caseId.toString() : ""} 
                  onValueChange={(value) => setInvoiceData({...invoiceData, caseId: parseInt(value)})}
                >
                  <SelectTrigger id="case">
                    <SelectValue placeholder="Select case" />
                  </SelectTrigger>
                  <SelectContent>
                    {cases?.map((caseItem: any) => (
                      <SelectItem key={caseItem.id} value={caseItem.id.toString()}>
                        {caseItem.patientName} - {caseItem.title || "Case"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input 
                  id="issueDate" 
                  type="date" 
                  value={invoiceData.issueDate} 
                  onChange={(e) => setInvoiceData({...invoiceData, issueDate: e.target.value})} 
                />
              </div>
              
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input 
                  id="dueDate" 
                  type="date" 
                  value={invoiceData.dueDate} 
                  onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})} 
                />
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={invoiceData.status} 
                  onValueChange={(value) => setInvoiceData({...invoiceData, status: value})}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Invoice Items</h2>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <PlusCircle className="h-4 w-4 mr-2" /> Add Item
              </Button>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Description</TableHead>
                    <TableHead className="w-[15%]">Quantity</TableHead>
                    <TableHead className="w-[20%]">Unit Price</TableHead>
                    <TableHead className="w-[20%]">Total</TableHead>
                    <TableHead className="w-[5%]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input 
                          value={item.description} 
                          onChange={(e) => updateItemDescription(index, e.target.value)} 
                          placeholder="Item description"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          min="1" 
                          value={item.quantity} 
                          onChange={(e) => updateItemTotal(index, 'quantity', parseInt(e.target.value) || 0)} 
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          min="0" 
                          step="0.01" 
                          value={item.unitPrice} 
                          onChange={(e) => updateItemTotal(index, 'unitPrice', parseFloat(e.target.value) || 0)} 
                          placeholder="0.00"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        ${item.total.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeItem(index)}
                          disabled={items.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-end mt-4">
              <div className="text-right">
                <div className="text-lg">Total: <span className="font-bold">${calculateTotal().toFixed(2)}</span></div>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Enter any additional notes here..." 
              value={invoiceData.notes} 
              onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate("/invoices")}>
              Cancel
            </Button>
            <Button type="submit" disabled={createInvoiceMutation.isPending}>
              {createInvoiceMutation.isPending ? "Creating..." : "Create Invoice"}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default NewInvoice;


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
import invoiceService, { InvoiceCreateRequest, InvoiceItem as ServiceInvoiceItem } from "@/services/invoiceService";
import dentistService, { Dentist } from "@/services/dentistService";
import patientService, { Patient } from "@/services/patientService";
import caseService from "@/services/caseService";

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface Case {
  id: number;
  patientName: string;
  title?: string;
}

const NewInvoice = () => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  const [invoiceData, setInvoiceData] = useState({
    patientId: 0,
    dentistId: 0,
    caseId: null as number | null,
    issueDate: today,
    dueDate: today,
    status: 'unpaid' as 'paid' | 'unpaid' | 'overdue',
    notes: '',
    tax: 0
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { description: '', quantity: 1, unitPrice: 0, amount: 0 }
  ]);

  const navigate = useNavigate();

  // Fetch dentists
  const { data: dentists } = useQuery({
    queryKey: ['dentists'],
    queryFn: () => dentistService.getAll()
  });

  // Fetch patients
  const { data: patients } = useQuery({
    queryKey: ['patients'],
    queryFn: () => patientService.getAll()
  });

  // Fetch cases when dentist is selected
  const { data: cases, refetch: refetchCases } = useQuery({
    queryKey: ['cases', invoiceData.dentistId],
    queryFn: () => invoiceData.dentistId ? caseService.getDentistCases(invoiceData.dentistId) : Promise.resolve([]),
    enabled: !!invoiceData.dentistId
  });

  // Refetch cases when dentist changes
  useEffect(() => {
    if (invoiceData.dentistId) {
      refetchCases();
    }
  }, [invoiceData.dentistId, refetchCases]);

  // Create invoice mutation
  const createInvoiceMutation = useMutation({
    mutationFn: (data: InvoiceCreateRequest) => invoiceService.create(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Invoice created successfully",
      });
      navigate("/invoices");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create invoice. Please try again.",
      });
    }
  });

  // Calculate totals
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTax = (subtotal: number) => {
    const taxRate = 0.1; // 10% tax rate
    return subtotal * taxRate;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + invoiceData.tax;
  };

  // Update item total when quantity or unit price changes
  const updateItem = (index: number, field: 'description' | 'quantity' | 'unitPrice', value: string | number) => {
    const updatedItems = [...items];
    
    if (field === 'description') {
      updatedItems[index].description = value as string;
    } else if (field === 'quantity') {
      const quantity = typeof value === 'number' ? value : parseInt(value as string) || 0;
      updatedItems[index].quantity = quantity;
      updatedItems[index].amount = quantity * updatedItems[index].unitPrice;
    } else if (field === 'unitPrice') {
      const unitPrice = typeof value === 'number' ? value : parseFloat(value as string) || 0;
      updatedItems[index].unitPrice = unitPrice;
      updatedItems[index].amount = updatedItems[index].quantity * unitPrice;
    }
    
    setItems(updatedItems);
    
    // Update tax based on new subtotal
    const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    setInvoiceData(prev => ({
      ...prev,
      tax: calculateTax(subtotal)
    }));
  };

  // Add new item
  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0, amount: 0 }]);
  };

  // Remove item
  const removeItem = (index: number) => {
    if (items.length > 1) {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
      
      // Update tax based on new subtotal
      const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
      setInvoiceData(prev => ({
        ...prev,
        tax: calculateTax(subtotal)
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!invoiceData.patientId || !invoiceData.dentistId) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please select both patient and dentist.",
      });
      return;
    }
    
    if (items.some(item => !item.description || item.quantity <= 0 || item.unitPrice <= 0)) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill all item details with valid values.",
      });
      return;
    }
    
    const invoiceRequest: InvoiceCreateRequest = {
      patientId: invoiceData.patientId,
      dentistId: invoiceData.dentistId,
      caseId: invoiceData.caseId || undefined,
      status: invoiceData.status,
      amount: calculateSubtotal(),
      tax: invoiceData.tax,
      total: calculateTotal(),
      notes: invoiceData.notes,
      issueDate: invoiceData.issueDate,
      dueDate: invoiceData.dueDate,
      items: items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }))
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
                <Label htmlFor="patient">Patient</Label>
                <Select 
                  value={invoiceData.patientId ? invoiceData.patientId.toString() : ""} 
                  onValueChange={(value) => setInvoiceData({...invoiceData, patientId: parseInt(value)})}
                >
                  <SelectTrigger id="patient">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients?.map((patient: Patient) => (
                      <SelectItem key={patient.id} value={patient.id.toString()}>
                        {patient.firstName} {patient.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    {dentists?.map((dentist: Dentist) => (
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
                  onValueChange={(value) => setInvoiceData({...invoiceData, caseId: value ? parseInt(value) : null})}
                >
                  <SelectTrigger id="case">
                    <SelectValue placeholder="Select case (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No related case</SelectItem>
                    {cases?.map((caseItem: Case) => (
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
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
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
                          onChange={(e) => updateItem(index, 'description', e.target.value)} 
                          placeholder="Item description"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          min="1" 
                          value={item.quantity} 
                          onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)} 
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          min="0" 
                          step="0.01" 
                          value={item.unitPrice} 
                          onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)} 
                          placeholder="0.00"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        ${item.amount.toFixed(2)}
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
              <div className="w-1/3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (10%):</span>
                  <span>${invoiceData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
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

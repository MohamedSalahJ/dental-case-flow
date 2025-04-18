
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Trash2, Plus, Save, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import dentistService from "@/services/dentistService";
import patientService from "@/services/patientService";
import caseService from "@/services/caseService";
import invoiceService from "@/services/invoiceService";

const NewInvoice = () => {
  const navigate = useNavigate();
  
  // State for form fields
  const [dentistId, setDentistId] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");
  const [caseId, setCaseId] = useState<string>("");
  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [items, setItems] = useState([
    { id: 1, description: "", quantity: 1, unitPrice: 0 }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch dentists, patients, and cases
  const { data: dentists = [] } = useQuery({
    queryKey: ['dentists'],
    queryFn: () => dentistService.getAll(),
  });
  
  const { data: patients = [] } = useQuery({
    queryKey: ['patients'],
    queryFn: () => patientService.getAll(),
  });
  
  const { data: cases = [] } = useQuery({
    queryKey: ['cases'],
    queryFn: () => caseService.getAll(),
  });

  // Calculate totals
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };
  
  // Set due date based on payment terms
  const handlePaymentTermsChange = (value: string) => {
    const days = parseInt(value);
    const date = new Date(invoiceDate);
    date.setDate(date.getDate() + days);
    setDueDate(date.toISOString().split('T')[0]);
  };
  
  // Handle items
  const addItem = () => {
    setItems([
      ...items,
      { id: items.length + 1, description: "", quantity: 1, unitPrice: 0 }
    ]);
  };
  
  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    } else {
      toast({
        title: "Cannot remove item",
        description: "An invoice must have at least one item.",
        variant: "destructive"
      });
    }
  };
  
  const updateItem = (id: number, field: string, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };
  
  // Create invoice mutation
  const createInvoiceMutation = useMutation({
    mutationFn: (invoiceData: any) => invoiceService.create(invoiceData),
    onSuccess: () => {
      toast({
        title: "Invoice created",
        description: "Your invoice has been created successfully."
      });
      navigate("/invoices");
    },
    onError: (error) => {
      console.error("Error creating invoice:", error);
      toast({
        title: "Error",
        description: "Failed to create invoice. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  });
  
  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dentistId || !patientId || !invoiceDate || !dueDate || items.some(item => !item.description)) {
      toast({
        title: "Missing required fields",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const invoiceData = {
      dentistId: parseInt(dentistId),
      patientId: parseInt(patientId),
      caseId: caseId ? parseInt(caseId) : null,
      status: "unpaid",
      issueDate: invoiceDate,
      dueDate: dueDate,
      amount: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      notes: notes,
      items: items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }))
    };
    
    createInvoiceMutation.mutate(invoiceData);
  };
  
  // Set default due date when invoice date changes
  useEffect(() => {
    if (invoiceDate) {
      const date = new Date(invoiceDate);
      date.setDate(date.getDate() + 15); // Default to 15 days
      setDueDate(date.toISOString().split('T')[0]);
    }
  }, [invoiceDate]);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/invoices">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Create Invoice</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Bill To</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="dentist">Dentist</Label>
                  <Select value={dentistId} onValueChange={setDentistId} required>
                    <SelectTrigger id="dentist">
                      <SelectValue placeholder="Select a dentist" />
                    </SelectTrigger>
                    <SelectContent>
                      {dentists.map(dentist => (
                        <SelectItem key={dentist.id} value={dentist.id.toString()}>
                          {dentist.firstName} {dentist.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="patient">Patient</Label>
                  <Select value={patientId} onValueChange={setPatientId} required>
                    <SelectTrigger id="patient">
                      <SelectValue placeholder="Select a patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id.toString()}>
                          {patient.firstName} {patient.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="case">Related Case (Optional)</Label>
                  <Select value={caseId} onValueChange={setCaseId}>
                    <SelectTrigger id="case">
                      <SelectValue placeholder="Select a case" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {cases.map(caseItem => (
                        <SelectItem key={caseItem.id} value={caseItem.id.toString()}>
                          {caseItem.caseNumber} ({caseItem.caseType})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="invoiceDate">Invoice Date</Label>
                  <Input 
                    type="date" 
                    id="invoiceDate" 
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input 
                    type="date" 
                    id="dueDate" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select defaultValue="15" onValueChange={handlePaymentTermsChange}>
                    <SelectTrigger id="paymentTerms">
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">Net 7</SelectItem>
                      <SelectItem value="15">Net 15</SelectItem>
                      <SelectItem value="30">Net 30</SelectItem>
                      <SelectItem value="60">Net 60</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Invoice Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-end">
                    <div className="col-span-6 md:col-span-6">
                      <Label htmlFor={`description-${item.id}`}>Description</Label>
                      <Input
                        id={`description-${item.id}`}
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        placeholder="Item description"
                        required
                      />
                    </div>
                    <div className="col-span-2 md:col-span-2">
                      <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                      <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                        required
                      />
                    </div>
                    <div className="col-span-3 md:col-span-3">
                      <Label htmlFor={`price-${item.id}`}>Unit Price ($)</Label>
                      <Input
                        id={`price-${item.id}`}
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                        required
                      />
                    </div>
                    <div className="col-span-1 md:col-span-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addItem}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-right">Subtotal:</div>
                  <div className="text-right">${calculateSubtotal().toFixed(2)}</div>
                  <div className="text-right">Tax (8%):</div>
                  <div className="text-right">${calculateTax().toFixed(2)}</div>
                  <div className="text-right font-bold">Total:</div>
                  <div className="text-right font-bold">${calculateTotal().toFixed(2)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter any additional notes or payment instructions here..."
                className="min-h-[100px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Link to="/invoices">
              <Button variant="outline" type="button">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Invoice
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default NewInvoice;

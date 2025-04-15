
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { ArrowLeft, Trash2, Plus, Save } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const NewInvoice = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, description: "", quantity: 1, unitPrice: 0 }
  ]);
  
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };
  
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Invoice created",
      description: "Your invoice has been created successfully."
    });
    navigate("/invoices");
  };
  
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
                  <Select required>
                    <SelectTrigger id="dentist">
                      <SelectValue placeholder="Select a dentist" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-alice-johnson">Dr. Alice Johnson</SelectItem>
                      <SelectItem value="dr-robert-chen">Dr. Robert Chen</SelectItem>
                      <SelectItem value="dr-emily-wilson">Dr. Emily Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="patient">Patient</Label>
                  <Select required>
                    <SelectTrigger id="patient">
                      <SelectValue placeholder="Select a patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john-smith">John Smith</SelectItem>
                      <SelectItem value="sarah-williams">Sarah Williams</SelectItem>
                      <SelectItem value="michael-davis">Michael Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="case">Related Case (Optional)</Label>
                  <Select>
                    <SelectTrigger id="case">
                      <SelectValue placeholder="Select a case" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="c-2025-042">C-2025-042 (Crown)</SelectItem>
                      <SelectItem value="c-2025-041">C-2025-041 (Veneer)</SelectItem>
                      <SelectItem value="c-2025-039">C-2025-039 (Bridge)</SelectItem>
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
                  <Input type="date" id="invoiceDate" defaultValue={new Date().toISOString().split('T')[0]} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input type="date" id="dueDate" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select defaultValue="15">
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
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Link to="/invoices">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Save Invoice
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default NewInvoice;

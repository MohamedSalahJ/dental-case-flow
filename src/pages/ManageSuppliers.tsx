
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeft, Plus, Pencil, Trash2, Save, X, Mail, Phone, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Mock data for suppliers
const initialSuppliers = [
  { 
    id: "SUP001", 
    name: "Ivoclar Vivadent", 
    contactPerson: "John Smith", 
    email: "sales@ivoclarvivadent.com", 
    phone: "+1 (888) 555-1234", 
    website: "ivoclarvivadent.com" 
  },
  { 
    id: "SUP002", 
    name: "VITA", 
    contactPerson: "Jane Doe", 
    email: "info@vita-zahnfabrik.com", 
    phone: "+1 (877) 555-5678", 
    website: "vita-zahnfabrik.com" 
  },
  { 
    id: "SUP003", 
    name: "3M ESPE", 
    contactPerson: "Robert Johnson", 
    email: "dental@3m.com", 
    phone: "+1 (800) 555-9012", 
    website: "3m.com/dental" 
  },
  { 
    id: "SUP004", 
    name: "Nobel Biocare", 
    contactPerson: "Sarah Wilson", 
    email: "support@nobelbiocare.com", 
    phone: "+1 (866) 555-3456", 
    website: "nobelbiocare.com" 
  },
  { 
    id: "SUP005", 
    name: "Kuraray Noritake", 
    contactPerson: "David Lee", 
    email: "info@kuraraynoritake.com", 
    phone: "+1 (855) 555-7890", 
    website: "kuraraynoritake.com" 
  },
  { 
    id: "SUP006", 
    name: "GC America", 
    contactPerson: "Michael Brown", 
    email: "info@gcamerica.com", 
    phone: "+1 (844) 555-2345", 
    website: "gcamerica.com" 
  },
  { 
    id: "SUP007", 
    name: "Dentsply Sirona", 
    contactPerson: "Lisa Taylor", 
    email: "contact@dentsplysirona.com", 
    phone: "+1 (833) 555-6789", 
    website: "dentsplysirona.com" 
  },
];

// Define the form schema using Zod
const supplierFormSchema = z.object({
  name: z.string().min(2, { message: "Supplier name must be at least 2 characters." }),
  contactPerson: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
  phone: z.string().optional(),
  website: z.string().optional(),
});

type SupplierFormValues = z.infer<typeof supplierFormSchema>;

const ManageSuppliers = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [editingSupplier, setEditingSupplier] = useState<null | { id: string }>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize the form with React Hook Form
  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      website: "",
    },
  });

  // Handle form submission for new supplier
  const onSubmit = (data: SupplierFormValues) => {
    const newSupplier = {
      id: `SUP${(suppliers.length + 1).toString().padStart(3, '0')}`,
      name: data.name,
      contactPerson: data.contactPerson || "",
      email: data.email || "",
      phone: data.phone || "",
      website: data.website || "",
    };
    
    setSuppliers([...suppliers, newSupplier]);
    
    toast({
      title: "Supplier Added",
      description: `${data.name} has been added to suppliers.`,
    });
    
    setIsAddDialogOpen(false);
    form.reset();
  };

  // Handle supplier deletion
  const handleDeleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    
    toast({
      title: "Supplier Deleted",
      description: "The supplier has been removed.",
    });
  };

  // Handle supplier edit form submission
  const handleEditSubmit = (id: string, formData: { 
    name: string, 
    contactPerson: string, 
    email: string, 
    phone: string, 
    website: string 
  }) => {
    setSuppliers(
      suppliers.map(supplier => 
        supplier.id === id 
          ? { ...supplier, ...formData } 
          : supplier
      )
    );
    
    setEditingSupplier(null);
    
    toast({
      title: "Supplier Updated",
      description: `${formData.name} has been updated.`,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => navigate("/inventory")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              Manage Suppliers
            </h1>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Supplier</DialogTitle>
                <DialogDescription>
                  Create a new supplier for inventory items.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter supplier name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact person" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter website" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save Supplier
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Suppliers</CardTitle>
            <CardDescription>
              Manage suppliers for your inventory items.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.id}</TableCell>
                    {editingSupplier?.id === supplier.id ? (
                      <>
                        <TableCell>
                          <Input 
                            defaultValue={supplier.name}
                            id={`name-${supplier.id}`}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            defaultValue={supplier.contactPerson}
                            id={`contactPerson-${supplier.id}`}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <Input 
                                defaultValue={supplier.email}
                                id={`email-${supplier.id}`}
                                className="w-full"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <Input 
                                defaultValue={supplier.phone}
                                id={`phone-${supplier.id}`}
                                className="w-full"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <Input 
                                defaultValue={supplier.website}
                                id={`website-${supplier.id}`}
                                className="w-full"
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                const nameEl = document.getElementById(`name-${supplier.id}`) as HTMLInputElement;
                                const contactPersonEl = document.getElementById(`contactPerson-${supplier.id}`) as HTMLInputElement;
                                const emailEl = document.getElementById(`email-${supplier.id}`) as HTMLInputElement;
                                const phoneEl = document.getElementById(`phone-${supplier.id}`) as HTMLInputElement;
                                const websiteEl = document.getElementById(`website-${supplier.id}`) as HTMLInputElement;
                                
                                if (nameEl && contactPersonEl && emailEl && phoneEl && websiteEl) {
                                  handleEditSubmit(supplier.id, {
                                    name: nameEl.value,
                                    contactPerson: contactPersonEl.value,
                                    email: emailEl.value,
                                    phone: phoneEl.value,
                                    website: websiteEl.value,
                                  });
                                }
                              }}
                            >
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingSupplier(null)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{supplier.name}</TableCell>
                        <TableCell>{supplier.contactPerson}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{supplier.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{supplier.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{supplier.website}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingSupplier({ id: supplier.id })}
                            >
                              <Pencil className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteSupplier(supplier.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
                {suppliers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No suppliers found. Click "Add Supplier" to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ManageSuppliers;

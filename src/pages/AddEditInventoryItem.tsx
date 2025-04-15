
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the form schema using Zod
const inventoryFormSchema = z.object({
  name: z.string().min(2, { message: "Item name must be at least 2 characters." }),
  category: z.string().min(1, { message: "Category is required." }),
  stock: z.coerce.number().min(0, { message: "Stock cannot be negative." }),
  threshold: z.coerce.number().min(0, { message: "Threshold cannot be negative." }),
  unit: z.string().min(1, { message: "Unit is required." }),
  supplier: z.string().min(1, { message: "Supplier is required." }),
});

type InventoryFormValues = z.infer<typeof inventoryFormSchema>;

// Mock data for the inventory categories and suppliers
const categories = ["Ceramic", "Zirconia", "Porcelain", "Implant Components", "Tools", "Consumables"];
const units = ["pack", "piece", "disc", "set", "box", "kit"];
const suppliers = ["Ivoclar Vivadent", "VITA", "3M ESPE", "Nobel Biocare", "Kuraray Noritake", "GC America", "Dentsply Sirona"];

// Mock inventory data (same as in Inventory.tsx)
const inventoryData = [
  {
    id: "INV001",
    name: "IPS e.max Press Ingot",
    category: "Ceramic",
    stock: 42,
    threshold: 10,
    lastOrdered: "Mar 15, 2025",
    unit: "pack",
    supplier: "Ivoclar Vivadent",
  },
  {
    id: "INV002",
    name: "Vita Enamic Block",
    category: "Ceramic",
    stock: 8,
    threshold: 10,
    lastOrdered: "Mar 28, 2025",
    unit: "pack",
    supplier: "VITA",
  },
  {
    id: "INV003",
    name: "3M ESPE Lava Zirconia Disc",
    category: "Zirconia",
    stock: 15,
    threshold: 5,
    lastOrdered: "Feb 12, 2025",
    unit: "disc",
    supplier: "3M ESPE",
  },
  {
    id: "INV004",
    name: "Nobel Biocare Temporary Abutment",
    category: "Implant Components",
    stock: 3,
    threshold: 5,
    lastOrdered: "Mar 05, 2025",
    unit: "piece",
    supplier: "Nobel Biocare",
  },
  {
    id: "INV005",
    name: "Noritake CZR Press LF Porcelain",
    category: "Porcelain",
    stock: 18,
    threshold: 8,
    lastOrdered: "Jan 28, 2025",
    unit: "set",
    supplier: "Kuraray Noritake",
  },
  {
    id: "INV006",
    name: "GC Initial LiSi Press",
    category: "Ceramic",
    stock: 22,
    threshold: 15,
    lastOrdered: "Feb 18, 2025",
    unit: "pack",
    supplier: "GC America",
  },
];

const AddEditInventoryItem = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;

  // Initialize the form with React Hook Form
  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(inventoryFormSchema),
    defaultValues: {
      name: "",
      category: "",
      stock: 0,
      threshold: 5,
      unit: "pack",
      supplier: "",
    },
  });

  // When editing, load the item data
  useEffect(() => {
    if (isEditMode) {
      const itemToEdit = inventoryData.find(item => item.id === id);
      if (itemToEdit) {
        form.reset({
          name: itemToEdit.name,
          category: itemToEdit.category,
          stock: itemToEdit.stock,
          threshold: itemToEdit.threshold,
          unit: itemToEdit.unit,
          supplier: itemToEdit.supplier,
        });
      } else {
        toast({
          title: "Item not found",
          description: "The item you're trying to edit doesn't exist.",
          variant: "destructive",
        });
        navigate("/inventory");
      }
    }
  }, [id, isEditMode, form, navigate, toast]);

  // Handle form submission
  const onSubmit = (data: InventoryFormValues) => {
    // In a real app, this would make an API call to save the data
    // For now, we'll just show a success toast and navigate back
    toast({
      title: isEditMode ? "Item Updated" : "Item Added",
      description: isEditMode 
        ? `${data.name} has been updated successfully.` 
        : `${data.name} has been added to inventory.`,
    });
    navigate("/inventory");
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
              {isEditMode ? "Edit Inventory Item" : "Add Inventory Item"}
            </h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isEditMode ? "Edit Item Details" : "New Inventory Item"}</CardTitle>
            <CardDescription>
              {isEditMode 
                ? "Update the details of the existing inventory item." 
                : "Enter the details for the new inventory item."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter item name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Stock</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="threshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Low Stock Threshold</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormDescription>
                          You'll be alerted when stock falls below this number.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit of Measurement</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {units.map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                {unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supplier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select supplier" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {suppliers.map((supplier) => (
                              <SelectItem key={supplier} value={supplier}>
                                {supplier}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => navigate("/inventory")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    {isEditMode ? "Update Item" : "Add Item"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddEditInventoryItem;

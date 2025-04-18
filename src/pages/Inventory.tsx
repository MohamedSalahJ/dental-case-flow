
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "../components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, AlertTriangle, RefreshCw, Package, FileText, Pencil, Tag, Truck, Loader2 } from "lucide-react";
import inventoryService from "@/services/inventoryService";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const { data: inventoryData, isLoading, error } = useQuery({
    queryKey: ['inventoryItems'],
    queryFn: () => inventoryService.getAllItems(),
  });

  const filteredItems = inventoryData?.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  const lowStockItems = inventoryData?.filter(item => 
    item.quantity <= item.reorderLevel
  ) || [];
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading inventory...</span>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[60vh] text-destructive">
          <p>Error loading inventory. Please try again.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => navigate("/inventory/categories")}>
              <Tag className="mr-2 h-5 w-5" />
              Manage Categories
            </Button>
            <Button variant="outline" onClick={() => navigate("/inventory/suppliers")}>
              <Truck className="mr-2 h-5 w-5" />
              Manage Suppliers
            </Button>
            <Button onClick={() => navigate("/inventory/add")}>
              <Plus className="mr-2 h-5 w-5" />
              Add New Item
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Items
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryData?.length}</div>
              <p className="text-xs text-muted-foreground">
                Across {new Set(inventoryData?.map(item => item.categoryName)).size} categories
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Low Stock Items
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockItems.length}</div>
              <p className="text-xs text-muted-foreground">
                Items below threshold
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Orders
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                In the last 30 days
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
            <CardDescription>
              Manage your inventory items, track stock levels, and place orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="all">All Items</TabsTrigger>
                  <TabsTrigger value="low-stock">
                    Low Stock
                    {lowStockItems.length > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {lowStockItems.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
                
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search inventory..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <TabsContent value="all">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Last Ordered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.categoryName}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{item.quantity} {item.unit}</span>
                              {item.quantity <= item.reorderLevel && (
                                <Badge variant="destructive" className="h-5 px-1.5">Low</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{item.supplierName}</TableCell>
                          <TableCell>{item.lastOrdered || "N/A"}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => navigate(`/inventory/edit/${item.id}`)}
                              >
                                <Pencil className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm">
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Reorder
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No items found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="low-stock">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Threshold</TableHead>
                      <TableHead>Last Ordered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowStockItems.length > 0 ? (
                      lowStockItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.categoryName}</TableCell>
                          <TableCell>
                            <Badge variant="destructive" className="mr-2">
                              {item.quantity} {item.unit}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.reorderLevel} {item.unit}</TableCell>
                          <TableCell>{item.lastOrdered || "N/A"}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => navigate(`/inventory/edit/${item.id}`)}
                              >
                                <Pencil className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button variant="default" size="sm">
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Reorder
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No low stock items.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredItems.length} of {inventoryData?.length} items
            </div>
            <Button variant="outline" size="sm">
              Export Inventory
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Inventory;

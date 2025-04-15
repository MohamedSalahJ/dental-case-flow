
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cases from "./pages/Cases";
import CaseDetail from "./pages/CaseDetail";
import NewCase from "./pages/NewCase";
import Calendar from "./pages/Calendar";
import Messages from "./pages/Messages";
import Reports from "./pages/Reports";
import Inventory from "./pages/Inventory";
import AddEditInventoryItem from "./pages/AddEditInventoryItem";
import ManageCategories from "./pages/ManageCategories";
import ManageSuppliers from "./pages/ManageSuppliers";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Index />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/:id" element={<CaseDetail />} />
          <Route path="/new-case" element={<NewCase />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/add" element={<AddEditInventoryItem />} />
          <Route path="/inventory/edit/:id" element={<AddEditInventoryItem />} />
          <Route path="/inventory/categories" element={<ManageCategories />} />
          <Route path="/inventory/suppliers" element={<ManageSuppliers />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cases from "./pages/Cases";
import CaseDetail from "./pages/CaseDetail";
import NewCase from "./pages/NewCase";
import Calendar from "./pages/Calendar";
import Messages from "./pages/Messages";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./pages/InvoiceDetail";
import NewInvoice from "./pages/NewInvoice";
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
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes for All Authenticated Users */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } />
          <Route path="/calendar" element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          } />
          <Route path="/help" element={
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          
          {/* Protected Routes for Dentists and Admins */}
          <Route path="/cases" element={
            <ProtectedRoute allowedRoles={['dentist', 'admin']}>
              <Cases />
            </ProtectedRoute>
          } />
          <Route path="/cases/:id" element={
            <ProtectedRoute allowedRoles={['dentist', 'admin']}>
              <CaseDetail />
            </ProtectedRoute>
          } />
          <Route path="/new-case" element={
            <ProtectedRoute allowedRoles={['dentist', 'admin']}>
              <NewCase />
            </ProtectedRoute>
          } />
          <Route path="/messages" element={
            <ProtectedRoute allowedRoles={['dentist', 'admin']}>
              <Messages />
            </ProtectedRoute>
          } />
          
          {/* Protected Routes for Technicians and Admins */}
          <Route path="/reports" element={
            <ProtectedRoute allowedRoles={['technician', 'admin']}>
              <Reports />
            </ProtectedRoute>
          } />
          <Route path="/inventory" element={
            <ProtectedRoute allowedRoles={['technician', 'admin']}>
              <Inventory />
            </ProtectedRoute>
          } />
          <Route path="/inventory/add" element={
            <ProtectedRoute allowedRoles={['technician', 'admin']}>
              <AddEditInventoryItem />
            </ProtectedRoute>
          } />
          <Route path="/inventory/edit/:id" element={
            <ProtectedRoute allowedRoles={['technician', 'admin']}>
              <AddEditInventoryItem />
            </ProtectedRoute>
          } />
          <Route path="/inventory/categories" element={
            <ProtectedRoute allowedRoles={['technician', 'admin']}>
              <ManageCategories />
            </ProtectedRoute>
          } />
          <Route path="/inventory/suppliers" element={
            <ProtectedRoute allowedRoles={['technician', 'admin']}>
              <ManageSuppliers />
            </ProtectedRoute>
          } />
          
          {/* Protected Routes for All Roles */}
          <Route path="/invoices" element={
            <ProtectedRoute>
              <Invoices />
            </ProtectedRoute>
          } />
          <Route path="/invoices/:id" element={
            <ProtectedRoute>
              <InvoiceDetail />
            </ProtectedRoute>
          } />
          <Route path="/invoices/new" element={
            <ProtectedRoute allowedRoles={['technician', 'admin']}>
              <NewInvoice />
            </ProtectedRoute>
          } />
          
          {/* Catch All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

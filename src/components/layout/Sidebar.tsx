
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Package, 
  Settings,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Receipt
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Cases", href: "/cases", icon: FileText },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Invoices", href: "/invoices", icon: Receipt },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Help", href: "/help", icon: HelpCircle },
  { name: "Settings", href: "/settings", icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  
  return (
    <aside 
      className={cn(
        "bg-card border-r border-border transition-all duration-300 ease-in-out h-screen sticky top-0 flex flex-col",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-border">
        <Link to="/" className="flex items-center">
          {expanded ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">DL</span>
              </div>
              <span className="font-semibold text-lg">DentalFlow</span>
            </div>
          ) : (
            <div className="w-10 h-10 mx-auto rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">DL</span>
            </div>
          )}
        </Link>
      </div>
      
      <div className="flex-1 py-6 px-4 flex flex-col">
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== '/' && location.pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  !expanded && "justify-center px-2"
                )}
              >
                <item.icon className="h-5 w-5" />
                {expanded && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-border">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setExpanded(!expanded)}
          className="w-full flex justify-center"
        >
          {expanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;

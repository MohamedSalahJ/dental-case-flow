
import { Button } from "@/components/ui/button";

interface InvoiceFilterProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export const InvoiceFilter = ({ currentFilter, onFilterChange }: InvoiceFilterProps) => {
  return (
    <div className="flex space-x-2 pb-4 border-b">
      <Button
        variant={currentFilter === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("all")}
      >
        All
      </Button>
      <Button
        variant={currentFilter === "unpaid" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("unpaid")}
      >
        Unpaid
      </Button>
      <Button
        variant={currentFilter === "overdue" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("overdue")}
      >
        Overdue
      </Button>
      <Button
        variant={currentFilter === "paid" ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange("paid")}
      >
        Paid
      </Button>
    </div>
  );
};

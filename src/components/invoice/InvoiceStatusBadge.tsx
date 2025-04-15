
import { Badge } from "@/components/ui/badge";
import { Check, Clock, XCircle } from "lucide-react";

interface InvoiceStatusBadgeProps {
  status: "paid" | "unpaid" | "overdue";
}

export const InvoiceStatusBadge = ({ status }: InvoiceStatusBadgeProps) => {
  switch (status) {
    case "paid":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <Check className="mr-1 h-3 w-3" /> Paid
        </Badge>
      );
    case "unpaid":
      return (
        <Badge className="bg-amber-500 hover:bg-amber-600">
          <Clock className="mr-1 h-3 w-3" /> Unpaid
        </Badge>
      );
    case "overdue":
      return (
        <Badge className="bg-red-500 hover:bg-red-600">
          <XCircle className="mr-1 h-3 w-3" /> Overdue
        </Badge>
      );
    default:
      return null;
  }
};

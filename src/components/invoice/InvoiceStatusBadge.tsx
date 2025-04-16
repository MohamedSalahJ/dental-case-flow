
import { Badge } from "@/components/ui/badge";
import { cva } from "class-variance-authority";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const badgeVariantMap = {
  paid: "success",
  unpaid: "outline",
  overdue: "destructive"
} as const;

const badgeIconMap = {
  paid: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
  unpaid: <Clock className="h-3.5 w-3.5 mr-1" />,
  overdue: <XCircle className="h-3.5 w-3.5 mr-1" />
};

interface InvoiceStatusBadgeProps {
  status: 'paid' | 'unpaid' | 'overdue' | string;
}

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  // Ensure status is a valid key, default to 'unpaid'
  const validStatus = (status && Object.keys(badgeVariantMap).includes(status)) 
    ? status as keyof typeof badgeVariantMap 
    : 'unpaid';
  
  const variant = badgeVariantMap[validStatus];
  const icon = badgeIconMap[validStatus];
  
  return (
    <Badge variant={variant} className="font-medium flex items-center">
      {icon}
      {validStatus.charAt(0).toUpperCase() + validStatus.slice(1)}
    </Badge>
  );
}

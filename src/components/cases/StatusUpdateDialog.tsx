
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

type CaseStatus = "new" | "in progress" | "pending review" | "completed" | "delivered";

const statusOptions: { value: CaseStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "in progress", label: "In Progress" },
  { value: "pending review", label: "Pending Review" },
  { value: "completed", label: "Completed" },
  { value: "delivered", label: "Delivered" },
];

interface StatusUpdateDialogProps {
  caseId: string;
  currentStatus: CaseStatus;
  onStatusUpdate: (newStatus: CaseStatus, notes: string) => void;
}

const StatusUpdateDialog = ({
  caseId,
  currentStatus,
  onStatusUpdate,
}: StatusUpdateDialogProps) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<CaseStatus>(currentStatus);
  const [notes, setNotes] = useState("");
  
  const handleSubmit = () => {
    if (!notes.trim()) {
      toast({
        variant: "destructive",
        title: "Notes required",
        description: "Please provide notes about this status change.",
      });
      return;
    }
    
    onStatusUpdate(status, notes);
    setOpen(false);
    // Reset form
    setStatus(currentStatus);
    setNotes("");
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Update Status</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Case Status</DialogTitle>
          <DialogDescription>
            Change the status of case {caseId}. Current status: {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="status">New Status</Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as CaseStatus)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select a new status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.value === currentStatus}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Status Change Notes</Label>
            <Textarea
              id="notes"
              placeholder="Provide details about this status change..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Save Status</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusUpdateDialog;

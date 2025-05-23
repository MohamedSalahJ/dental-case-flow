
import { useState, Dispatch, SetStateAction, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, Save, Upload } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export interface PrescriptionFormProps {
  id?: string;
  activeTab?: string;
  setActiveTab?: Dispatch<SetStateAction<string>>;
  onSubmit?: (formData: any) => void;
  dentists?: any[];
  patients?: any[];
}

const PrescriptionForm = ({ 
  id, 
  activeTab, 
  setActiveTab, 
  onSubmit,
  dentists = [],
  patients = []
}: PrescriptionFormProps) => {
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    patientId: '',
    dentistId: '',
    priority: 'standard',
    dueDate: '',
    material: 'zirconia',
    teeth: [] as number[],
    shadeGuide: '',
    shade: '',
  });
  
  const handleInputChange = (field: string, value: string | string[] | number[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleToothToggle = (toothNumber: number) => {
    setFormData(prev => {
      const teeth = [...prev.teeth];
      const index = teeth.indexOf(toothNumber);
      
      if (index >= 0) {
        // Remove the tooth if it's already selected
        teeth.splice(index, 1);
      } else {
        // Add the tooth if it's not selected
        teeth.push(toothNumber);
      }
      
      return { ...prev, teeth };
    });
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };
  
  const handleNextTab = () => {
    if (setActiveTab && activeTab === 'details') {
      setActiveTab('prescription');
    } else if (setActiveTab && activeTab === 'prescription') {
      setActiveTab('dental-chart');
    } else if (setActiveTab && activeTab === 'dental-chart') {
      setActiveTab('files');
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto prescription-paper">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Digital Prescription</CardTitle>
        <CardDescription>
          Complete all fields for accurate case processing
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        <form id={id} onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dentist-name">Dentist</Label>
              <Select 
                value={formData.dentistId} 
                onValueChange={(value) => handleInputChange('dentistId', value)}
              >
                <SelectTrigger id="dentist-name">
                  <SelectValue placeholder="Select dentist" />
                </SelectTrigger>
                <SelectContent>
                  {dentists.length === 0 ? (
                    <SelectItem value="loading" disabled>Loading dentists...</SelectItem>
                  ) : (
                    dentists.map(dentist => (
                      <SelectItem key={dentist.id} value={String(dentist.id)}>
                        Dr. {dentist.firstName} {dentist.lastName}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="patient-name">Patient</Label>
              <Select 
                value={formData.patientId} 
                onValueChange={(value) => handleInputChange('patientId', value)}
              >
                <SelectTrigger id="patient-name">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.length === 0 ? (
                    <SelectItem value="loading" disabled>Loading patients...</SelectItem>
                  ) : (
                    patients.map(patient => (
                      <SelectItem key={patient.id} value={String(patient.id)}>
                        {patient.firstName} {patient.lastName}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="restoration-type">Restoration Type</Label>
              <Select 
                value={formData.title}
                onValueChange={(value) => handleInputChange('title', value)}
              >
                <SelectTrigger id="restoration-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crown">Crown</SelectItem>
                  <SelectItem value="bridge">Bridge</SelectItem>
                  <SelectItem value="veneer">Veneer</SelectItem>
                  <SelectItem value="inlay">Inlay/Onlay</SelectItem>
                  <SelectItem value="implant">Implant</SelectItem>
                  <SelectItem value="denture">Denture</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formData.priority}
                onValueChange={(value) => handleInputChange('priority', value)}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="rush">Rush</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="due-date">Required By</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    id="due-date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? (
                      format(dueDate, "PPP")
                    ) : (
                      <span>Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => {
                      setDueDate(date);
                      if (date) {
                        handleInputChange('dueDate', date.toISOString());
                      }
                    }}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            <Label>Tooth Number(s)</Label>
            <div className="border rounded-md p-4 bg-background">
              <div className="grid grid-cols-16 gap-1 text-center mb-4">
                {Array.from({ length: 16 }, (_, i) => (
                  <div key={`upper-${i + 1}`} className="relative">
                    <Checkbox 
                      id={`tooth-${i + 1}`} 
                      className="peer sr-only" 
                      checked={formData.teeth.includes(16 - i)}
                      onCheckedChange={() => handleToothToggle(16 - i)}
                    />
                    <Label
                      htmlFor={`tooth-${i + 1}`}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                    >
                      {16 - i}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-16 gap-1 text-center">
                {Array.from({ length: 16 }, (_, i) => (
                  <div key={`lower-${i + 1}`} className="relative">
                    <Checkbox 
                      id={`tooth-${i + 17}`} 
                      className="peer sr-only" 
                      checked={formData.teeth.includes(i + 17)}
                      onCheckedChange={() => handleToothToggle(i + 17)}
                    />
                    <Label
                      htmlFor={`tooth-${i + 17}`}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                    >
                      {i + 17}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            <Label>Material</Label>
            <RadioGroup 
              value={formData.material}
              onValueChange={(value) => handleInputChange('material', value)}
              className="grid grid-cols-3 gap-2"
            >
              <div>
                <RadioGroupItem 
                  value="zirconia" 
                  id="zirconia" 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor="zirconia"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>Zirconia</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem 
                  value="emax" 
                  id="emax" 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor="emax"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>E.max</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem 
                  value="pfm" 
                  id="pfm" 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor="pfm"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>PFM</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2 mt-4">
            <Label htmlFor="shade">Shade</Label>
            <div className="flex space-x-4">
              <Select
                value={formData.shadeGuide}
                onValueChange={(value) => handleInputChange('shadeGuide', value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select shade guide" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vita-classical">VITA Classical</SelectItem>
                  <SelectItem value="vita-3d">VITA 3D Master</SelectItem>
                  <SelectItem value="chromascop">Chromascop</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={formData.shade}
                onValueChange={(value) => handleInputChange('shade', value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select shade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a1">A1</SelectItem>
                  <SelectItem value="a2">A2</SelectItem>
                  <SelectItem value="a3">A3</SelectItem>
                  <SelectItem value="a3.5">A3.5</SelectItem>
                  <SelectItem value="a4">A4</SelectItem>
                  <SelectItem value="b1">B1</SelectItem>
                  <SelectItem value="b2">B2</SelectItem>
                  <SelectItem value="b3">B3</SelectItem>
                  <SelectItem value="b4">B4</SelectItem>
                  <SelectItem value="c1">C1</SelectItem>
                  <SelectItem value="c2">C2</SelectItem>
                  <SelectItem value="c3">C3</SelectItem>
                  <SelectItem value="c4">C4</SelectItem>
                  <SelectItem value="d2">D2</SelectItem>
                  <SelectItem value="d3">D3</SelectItem>
                  <SelectItem value="d4">D4</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="w-[180px]">
                <Upload className="mr-2 h-4 w-4" />
                Upload Shade Photo
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            <Label htmlFor="special-instructions">Special Instructions</Label>
            <Textarea
              id="special-instructions"
              placeholder="Enter any special instructions or additional details..."
              className="min-h-[120px]"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        {activeTab === 'details' || activeTab === 'prescription' || activeTab === 'dental-chart' ? (
          <Button onClick={handleNextTab}>
            Next
          </Button>
        ) : (
          <Button type="submit" form={id}>
            <Save className="mr-2 h-4 w-4" />
            Save Prescription
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PrescriptionForm;

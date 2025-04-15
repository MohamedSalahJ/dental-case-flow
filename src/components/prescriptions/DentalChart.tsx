
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DentalChart = () => {
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([36, 37, 38]);
  
  const toggleTooth = (toothNumber: number) => {
    setSelectedTeeth(prev => 
      prev.includes(toothNumber) 
        ? prev.filter(t => t !== toothNumber) 
        : [...prev, toothNumber]
    );
  };
  
  const upperTeeth = Array.from({ length: 16 }, (_, i) => 16 - i);
  const lowerTeeth = Array.from({ length: 16 }, (_, i) => i + 17);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="md:col-span-1 h-fit">
        <CardContent className="p-4">
          <div className="text-center mb-4">
            <span className="text-sm font-semibold">Tooth Chart Selection</span>
          </div>
          
          <div className="mb-6">
            <div className="text-center mb-1 text-xs font-medium text-muted-foreground">Upper</div>
            <div className="grid grid-cols-8 gap-1 text-center mb-6">
              {upperTeeth.map((tooth) => (
                <div key={`upper-${tooth}`} className="relative">
                  <button
                    onClick={() => toggleTooth(tooth)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                      selectedTeeth.includes(tooth)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted bg-background text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    {tooth}
                  </button>
                </div>
              ))}
            </div>
            
            <div className="h-16 flex items-center justify-center">
              <div className="w-full h-0.5 bg-muted"></div>
            </div>
            
            <div className="text-center mb-1 text-xs font-medium text-muted-foreground">Lower</div>
            <div className="grid grid-cols-8 gap-1 text-center">
              {lowerTeeth.map((tooth) => (
                <div key={`lower-${tooth}`} className="relative">
                  <button
                    onClick={() => toggleTooth(tooth)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                      selectedTeeth.includes(tooth)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted bg-background text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    {tooth}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardContent className="p-4">
          <Tabs defaultValue="images" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="chart">Treatment Plan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="images" className="mt-4">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem className="basis-1/2 md:basis-1/3">
                    <div className="p-1">
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src="/lovable-uploads/48244be2-00a2-4375-89e7-e05ddba6f64c.png"
                          alt="Dental scan"
                          className="w-full h-auto object-cover aspect-square"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-1/2 md:basis-1/3">
                    <div className="p-1">
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                          alt="Dental implants"
                          className="w-full h-auto object-cover aspect-square"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-1/2 md:basis-1/3">
                    <div className="p-1">
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
                          alt="Dental scan"
                          className="w-full h-auto object-cover aspect-square"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </TabsContent>
            
            <TabsContent value="chart" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Selected Teeth</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedTeeth.map(tooth => (
                      <span 
                        key={tooth} 
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {tooth}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Treatment</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedTeeth.length > 0 
                      ? `Implant restoration for teeth ${selectedTeeth.join(', ')}`
                      : 'No teeth selected for treatment'}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DentalChart;

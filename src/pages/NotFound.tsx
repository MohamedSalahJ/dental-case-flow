
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <ShieldAlert className="h-24 w-24 text-primary" />
        </div>
        <h1 className="mb-2 text-5xl font-bold tracking-tight">404</h1>
        <h2 className="mb-6 text-3xl font-semibold tracking-tight">Page Not Found</h2>
        
        <Alert className="mb-8">
          <AlertTitle>We've looked everywhere</AlertTitle>
          <AlertDescription>
            The page you're looking for doesn't exist or has been moved to another URL.
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="default" asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" /> Go Home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <div className="inline-block w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
          <span className="text-primary-foreground font-semibold text-lg">DF</span>
        </div>
        <h3 className="text-xl font-semibold">DentalFlow</h3>
        <p className="text-muted-foreground">Streamlined dental lab management</p>
      </div>
    </div>
  );
}

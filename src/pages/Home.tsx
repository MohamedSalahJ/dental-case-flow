
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Calendar, 
  MessageSquare, 
  Package, 
  ArrowRight, 
  CheckCircle,
  ShieldCheck,
  Clock,
  Users
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">DF</span>
            </div>
            <span className="font-semibold text-lg">DentalFlow</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/register">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Streamlined Dental Lab Management
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect dentists and lab technicians in a seamless workflow. Manage cases, inventory, and communications in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/help">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-8 shadow-lg">
            <img 
              src="/placeholder.svg" 
              alt="DentalFlow Dashboard Preview" 
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Key Features</h2>
            <p className="text-muted-foreground mt-2">Everything you need to manage your dental cases efficiently</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-lg p-6 border shadow-sm">
              <FileText className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Case Management</h3>
              <p className="text-muted-foreground">Track all your dental cases from start to finish with detailed status updates.</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 border shadow-sm">
              <Calendar className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Scheduling</h3>
              <p className="text-muted-foreground">Manage deadlines, appointments, and track case timelines efficiently.</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 border shadow-sm">
              <MessageSquare className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Communication</h3>
              <p className="text-muted-foreground">Direct messaging between dentists and technicians with case context.</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 border shadow-sm">
              <Package className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Inventory Control</h3>
              <p className="text-muted-foreground">Track materials, supplies, and equipment with automated alerts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img 
              src="/placeholder.svg" 
              alt="DentalFlow Benefits" 
              className="w-full h-auto rounded-lg border shadow-lg"
            />
          </div>
          <div className="space-y-8 order-1 md:order-2">
            <h2 className="text-3xl font-bold">Why Choose DentalFlow?</h2>
            
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Save Time</h3>
                <p className="text-muted-foreground">Reduce administrative work and focus on what matters most.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Improve Accuracy</h3>
                <p className="text-muted-foreground">Minimize errors with detailed case specifications and notifications.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Better Collaboration</h3>
                <p className="text-muted-foreground">Connect dentists and technicians for seamless workflow.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Secure & Compliant</h3>
                <p className="text-muted-foreground">HIPAA-compliant system to keep patient data safe and secure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to streamline your dental workflow?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join dentists and lab technicians who are already using DentalFlow to improve their productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary">
                Get Started Today
              </Button>
            </Link>
            <Link to="/help">
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link to="/help" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
                <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Support</Link></li>
                <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Training</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Privacy</Link></li>
                <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Terms</Link></li>
                <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} DentalFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

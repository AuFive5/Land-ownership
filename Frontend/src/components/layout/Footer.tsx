import { Link } from 'react-router-dom';
import { Landmark, Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Landmark className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">LandChain</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Revolutionizing land registry with blockchain technology. Secure, transparent, and efficient property transactions.
            </p>
            <div className="mt-6 flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8">
            <div>
              <h3 className="text-base font-medium mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Land Registration
                  </Link>
                </li>
                <li>
                  <Link to="/transfer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Transfer Ownership
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/guides" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link to="/documentation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} LandChain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
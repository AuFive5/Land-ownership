import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/contexts/Web3Context';
import { useAuth } from '@/contexts/AuthContext';
import { 
  SheetTrigger, 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { 
  Landmark, 
  Menu, 
  UserCircle, 
  ChevronDown, 
  LogOut,
  ClipboardList,
  Wallet,
  Home,
  CircleDollarSign,
  LayoutDashboard,
  Shield
} from 'lucide-react';

const Navbar = () => {
  const { walletInfo, connectWallet, disconnectWallet, isConnected, connecting } = useWeb3();
  const { user, isAdmin, isVerifier, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getShortAddress = () => {
    if (!walletInfo?.address) return '';
    return `${walletInfo.address.substring(0, 6)}...${walletInfo.address.substring(walletInfo.address.length - 4)}`;
  };

  const navItems = [
    { label: 'Home', path: '/', icon: <Home className="h-4 w-4 mr-2" /> },
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
    { label: 'Register', path: '/register', icon: <ClipboardList className="h-4 w-4 mr-2" /> },
    { label: 'Transfer', path: '/transfer', icon: <CircleDollarSign className="h-4 w-4 mr-2" /> },
  ];

  // Add admin route if user is admin
  if (isAdmin || isVerifier) {
    navItems.push({ 
      label: 'Admin', 
      path: '/admin', 
      icon: <Shield className="h-4 w-4 mr-2" /> 
    });
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Landmark className="h-6 w-6 text-primary" />
              <span className="font-bold hidden sm:inline-block text-xl">LandChain</span>
            </Link>
            
            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex ml-6">
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link 
                      to={item.path} 
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        location.pathname === item.path ? "bg-accent text-accent-foreground" : "text-foreground/70"
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex items-center gap-4">
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Wallet className="h-4 w-4" />
                    <span className="hidden sm:inline">{getShortAddress()}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <p className="text-sm font-medium">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {walletInfo?.address}
                    </p>
                    <p className="text-xs font-medium mt-1">
                      Balance: {walletInfo?.balance} ETH
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => connectWallet('nami')} 
                disabled={connecting}
                className="gap-2"
              >
                <Wallet className="h-4 w-4" />
                <span>{connecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </Button>
            )}
            
            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <Landmark className="h-6 w-6 text-primary" />
                      <span className="font-bold text-xl">LandChain</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-2 px-2 py-1 rounded-md",
                        location.pathname === item.path 
                          ? "bg-accent text-accent-foreground font-medium" 
                          : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="text-lg font-heading font-bold text-foreground">CivicPulse</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/">
            <Button variant={isActive("/") ? "secondary" : "ghost"} size="sm">Home</Button>
          </Link>
          <Link to="/citizen/login">
            <Button variant={isActive("/citizen/login") ? "secondary" : "ghost"} size="sm">Citizen Portal</Button>
          </Link>
          <Link to="/authority/login">
            <Button variant={isActive("/authority/login") ? "secondary" : "ghost"} size="sm">Authority Login</Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t bg-card px-4 pb-4 flex flex-col gap-1">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">Home</Button>
          </Link>
          <Link to="/citizen/login" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">Citizen Portal</Button>
          </Link>
          <Link to="/authority/login" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">Authority Login</Button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;

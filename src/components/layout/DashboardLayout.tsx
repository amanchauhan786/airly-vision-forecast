
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BarChart4, 
  MapPin, 
  Cloud, 
  Activity, 
  AlertCircle, 
  Menu, 
  X,
  BookOpen
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 mb-1 text-sm font-medium",
        isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { icon: <Home size={18} />, label: "Dashboard", path: "/" },
    { icon: <BarChart4 size={18} />, label: "Time Series", path: "/time-series" },
    { icon: <MapPin size={18} />, label: "Pollution Map", path: "/map" },
    { icon: <Cloud size={18} />, label: "Forecaster", path: "/forecast" },
    { icon: <Activity size={18} />, label: "Health Impact", path: "/health" },
    { icon: <BookOpen size={18} />, label: "Education", path: "/education" },
    { icon: <AlertCircle size={18} />, label: "Alerts", path: "/alerts" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 bg-card border-r overflow-y-auto">
          <div className="px-4 pb-4 mb-6">
            <h1 className="text-2xl font-bold">AirlyVision</h1>
            <p className="text-sm text-muted-foreground">Air Quality Monitoring</p>
          </div>
          <nav className="flex-1 px-4 pb-4">
            {navigationItems.map((item) => (
              <NavItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isActive={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden bg-background/80 backdrop-blur-sm transition-opacity",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-card shadow-lg transform transition-transform",
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold">AirlyVision</h1>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X size={18} />
            </Button>
          </div>
          <nav className="p-4">
            {navigationItems.map((item) => (
              <NavItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isActive={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

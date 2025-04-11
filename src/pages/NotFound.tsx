
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapOff } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/20">
      <div className="text-center max-w-md px-6">
        <div className="bg-primary/10 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapOff className="h-12 w-12 text-primary/80" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! Air quality monitoring data not found for this location
        </p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved to a different location.
        </p>
        <Button asChild size="lg">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

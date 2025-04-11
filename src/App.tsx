
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import TimeSeries from "./pages/TimeSeries";
import PollutionMap from "./pages/PollutionMap";
import Forecast from "./pages/Forecast";
import Health from "./pages/Health";
import Education from "./pages/Education";
import Alerts from "./pages/Alerts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/time-series" element={
            <DashboardLayout>
              <TimeSeries />
            </DashboardLayout>
          } />
          <Route path="/map" element={
            <DashboardLayout>
              <PollutionMap />
            </DashboardLayout>
          } />
          <Route path="/forecast" element={
            <DashboardLayout>
              <Forecast />
            </DashboardLayout>
          } />
          <Route path="/health" element={
            <DashboardLayout>
              <Health />
            </DashboardLayout>
          } />
          <Route path="/education" element={
            <DashboardLayout>
              <Education />
            </DashboardLayout>
          } />
          <Route path="/alerts" element={
            <DashboardLayout>
              <Alerts />
            </DashboardLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

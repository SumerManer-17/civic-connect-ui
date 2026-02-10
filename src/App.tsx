import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CitizenAuth from "./pages/CitizenAuth";
import CitizenDashboard from "./pages/CitizenDashboard";
import AuthorityLogin from "./pages/AuthorityLogin";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import ReportIssue from "./pages/ReportIssue";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/citizen/login" element={<CitizenAuth />} />
          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
          <Route path="/citizen/report" element={<ReportIssue />} />
          <Route path="/authority/login" element={<AuthorityLogin />} />
          <Route path="/authority/dashboard" element={<AuthorityDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WalletProvider from "@/components/WalletProvider";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import EmployerDashboard from "./pages/EmployerDashboard.tsx";
import HRDashboard from "./pages/HRDashboard.tsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.tsx";
import ManagerDashboard from "./pages/ManagerDashboard.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WalletProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/employer/*" element={<EmployerDashboard />} />
            <Route path="/hr/*" element={<HRDashboard />} />
            <Route path="/employee/*" element={<EmployeeDashboard />} />
            <Route path="/manager/*" element={<ManagerDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

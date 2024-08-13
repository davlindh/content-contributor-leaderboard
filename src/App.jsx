import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import { SupabaseAuthProvider } from "./integrations/supabase/auth";
import Layout from "./components/Layout";

const App = () => {
  return (
    <React.StrictMode>
      <SupabaseAuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Layout>
              <Routes>
                {navItems.map(({ to, page }) => (
                  <Route key={to} path={to} element={page} />
                ))}
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </SupabaseAuthProvider>
    </React.StrictMode>
  );
};

export default App;

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { ToastContainer } from '../components/notifications/ToastContainer';

export const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex relative selection:bg-amber-500 selection:text-slate-950">
      {/* Ambient background glow effects */}
      <div className="fixed top-0 right-1/4 w-[600px] h-[350px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Topbar onToggleSidebar={() => setSidebarOpen(true)} title="Student Portal" />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto relative z-10">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

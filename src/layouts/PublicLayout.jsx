import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Footer } from '../components/layout/Footer';
import { PublicNavbar } from '../components/layout/PublicNavbar';
import { ToastContainer } from '../components/notifications/ToastContainer';

export const PublicLayout = () => {
  const { user, role, isAuthenticated } = useAuth();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' },
    { label: 'Clubs & Committees', path: '/committees' },
    { label: 'About Campus', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <PublicNavbar />

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
};

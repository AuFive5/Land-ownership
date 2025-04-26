import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import { Toaster } from '@/components/ui/toaster';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 w-full py-4">
        <ErrorBoundary>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Outlet />
          </div>
        </ErrorBoundary>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default MainLayout;
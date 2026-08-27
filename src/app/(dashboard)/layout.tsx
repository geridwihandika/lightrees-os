"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SideNavBar */}
      <nav className={`flex flex-col h-screen w-sidebar-width fixed left-0 top-0 bg-surface-container/95 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-secondary/10 py-8 px-gutter z-40 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-white">account_balance</span>
            </div>
            <div>
              <h1 className="font-headline-md text-headline-md font-black text-primary tracking-tight">Lightrees OS</h1>
              <p className="font-label-md text-label-md text-on-surface-variant font-medium">Management Hub</p>
            </div>
          </div>
          <button 
            className="md:hidden p-2 rounded-full text-on-surface-variant hover:bg-surface-variant transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-1">
          <Link href="/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-transform duration-200 ${pathname === '/dashboard' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-white/10 hover:scale-102'}`}>
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-body-md text-body-md">Dashboard</span>
          </Link>
          <Link href="/properties" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-transform duration-200 ${pathname === '/properties' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-white/10 hover:scale-102'}`}>
            <span className="material-symbols-outlined">domain</span>
            <span className="font-body-md text-body-md">Properties</span>
          </Link>
          <Link href="/feasibility" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-transform duration-200 ${pathname === '/feasibility' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-white/10 hover:scale-102'}`}>
            <span className="material-symbols-outlined">analytics</span>
            <span className="font-body-md text-body-md">Feasibility</span>
          </Link>
          <Link href="/funding" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-transform duration-200 ${pathname === '/funding' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-white/10 hover:scale-102'}`}>
            <span className="material-symbols-outlined">payments</span>
            <span className="font-body-md text-body-md">Funding</span>
          </Link>
          <Link href="/research" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-transform duration-200 ${pathname === '/research' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-white/10 hover:scale-102'}`}>
            <span className="material-symbols-outlined">search</span>
            <span className="font-body-md text-body-md">Research</span>
          </Link>
          <Link href="/e-reception" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-transform duration-200 ${pathname === '/e-reception' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-white/10 hover:scale-102'}`}>
            <span className="material-symbols-outlined">room_service</span>
            <span className="font-body-md text-body-md">E-Reception</span>
          </Link>
          <Link href="/projects" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-transform duration-200 ${pathname === '/projects' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-white/10 hover:scale-102'}`}>
            <span className="material-symbols-outlined">architecture</span>
            <span className="font-body-md text-body-md">Projects</span>
          </Link>
          <Link href="/reports" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-transform duration-200 ${pathname === '/reports' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-white/10 hover:scale-102'}`}>
            <span className="material-symbols-outlined">assessment</span>
            <span className="font-body-md text-body-md">Reports</span>
          </Link>
          <Link href="/settings" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-transform duration-200 mt-4 ${pathname === '/settings' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-white/10 hover:scale-102'}`}>
            <span className="material-symbols-outlined">settings</span>
            <span className="font-body-md text-body-md">Settings</span>
          </Link>
        </div>
        
        <Link href="/settings" className="mt-8 pt-4 border-t border-outline-variant flex items-center gap-3 group hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden border border-outline-variant group-hover:border-primary transition-colors flex-shrink-0">
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=13423c&color=fff" alt="User profile" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="font-body-md text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors truncate">Admin User</p>
            <p className="font-label-md text-label-md text-on-surface-variant truncate">Enterprise Plan</p>
          </div>
        </Link>
      </nav>

      <div className="flex-1 flex flex-col min-w-0 md:ml-sidebar-width transition-all duration-300 w-full">
        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full px-4 md:px-6 h-16 bg-surface-dim/40 backdrop-blur-xl docked full-width top-0 sticky z-20 border-b border-white/10 shadow-lg shadow-primary/5">
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              className="md:hidden p-2 rounded-md text-on-surface-variant hover:bg-surface-variant transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="md:hidden">
              <span className="font-headline-md text-headline-lg-mobile font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Lightrees</span>
            </div>
            <div className="hidden md:flex items-center bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-1.5 w-64 focus-within:border-primary transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] mr-2">search</span>
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none font-body-md text-body-md text-on-surface w-full placeholder:text-outline p-0 focus:ring-0" />
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <button className="md:hidden p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors duration-200">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors duration-200 relative group">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border-2 border-surface-container-lowest"></span>
            </button>
            <Link href="/login" className="p-2 rounded-full text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors duration-200 flex items-center group" title="Sign Out">
              <span className="material-symbols-outlined">logout</span>
            </Link>
            <Link href="/settings" className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors duration-200 md:hidden">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-margin-page overflow-x-hidden w-full">
          {children}
        </main>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Landmark,
  X,
  Menu,
  LayoutDashboard,
  Building2,
  Calculator,
  WalletCards,
  LineChart,
  KeyRound,
  FolderKanban,
  FileSpreadsheet,
  Settings,
  Search,
  Bell,
  LogOut,
  User,
} from "lucide-react";

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

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/properties", label: "Properties", icon: Building2 },
    { href: "/feasibility", label: "Feasibility", icon: Calculator },
    { href: "/funding", label: "Funding", icon: WalletCards },
    { href: "/research", label: "Research", icon: LineChart },
    { href: "/e-reception", label: "E-Reception", icon: KeyRound },
    { href: "/projects", label: "Projects", icon: FolderKanban },
    { href: "/reports", label: "Reports", icon: FileSpreadsheet },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

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
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-primary-container transition-colors">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-headline-md text-headline-md font-black text-primary tracking-tight">Lightrees OS</h1>
              <p className="font-label-md text-label-md text-on-surface-variant font-medium">Management Hub</p>
            </div>
          </Link>
          <button 
            className="md:hidden p-2 rounded-full text-on-surface-variant hover:bg-surface-variant transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:bg-white/40 hover:text-on-surface hover:scale-[1.02]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-on-surface-variant'}`} />
                <span className="font-body-md text-body-md">{item.label}</span>
              </Link>
            );
          })}
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
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="md:hidden">
              <span className="font-headline-md text-headline-lg-mobile font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Lightrees</span>
            </div>
            <div className="hidden md:flex items-center bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-1.5 w-64 focus-within:border-primary transition-colors">
              <Search className="w-4 h-4 text-on-surface-variant mr-2 flex-shrink-0" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none font-body-md text-body-md text-on-surface w-full placeholder:text-outline p-0 focus:ring-0" />
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <button className="md:hidden p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors duration-200">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors duration-200 relative group">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border-2 border-surface-container-lowest"></span>
            </button>
            <Link href="/login" className="p-2 rounded-full text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors duration-200 flex items-center group" title="Sign Out">
              <LogOut className="w-5 h-5" />
            </Link>
            <Link href="/settings" className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors duration-200 md:hidden">
              <User className="w-5 h-5" />
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

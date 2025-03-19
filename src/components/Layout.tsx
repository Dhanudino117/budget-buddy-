
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  Home,
  Receipt, 
  PiggyBank, 
  Settings as SettingsIcon,
  TrendingDown
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { path: "/transactions", label: "Transactions", icon: <Receipt className="h-5 w-5" /> },
    { path: "/budget", label: "Budget", icon: <PiggyBank className="h-5 w-5" /> },
    { path: "/expenditure", label: "Expenditure", icon: <TrendingDown className="h-5 w-5" /> },
    { path: "/settings", label: "Settings", icon: <SettingsIcon className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b backdrop-blur-lg bg-white/60 dark:bg-gray-900/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="rounded-full p-2 transition-colors hover:bg-secondary"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-medium">Budget Buddy</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
          isNavOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsNavOpen(false)}
      />
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 w-[270px] glass-card transition-transform duration-300 ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <span className="text-lg font-medium">Budget Buddy</span>
          <button
            onClick={() => setIsNavOpen(false)}
            className="rounded-full p-2 transition-colors hover:bg-secondary"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-2 px-4 py-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsNavOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="container flex-1 pt-24 pb-8">
        {children}
      </main>
    </div>
  );
}

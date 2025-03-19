
import { useState } from "react";
import { Bell, AlertTriangle, Smartphone, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-6">Preferences</h2>
          
          <div className="space-y-6 divide-y divide-border">
            {/* Theme Setting */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                {theme === "light" ? (
                  <Sun className="h-5 w-5 text-amber-500" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-400" />
                )}
                <div>
                  <p className="font-medium">Appearance</p>
                  <p className="text-sm text-muted-foreground">
                    Choose between light and dark theme
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    theme === "light"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    theme === "dark"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>
            
            {/* Notifications Setting */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified about transaction updates
                  </p>
                </div>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
                onClick={() => setNotifications(!notifications)}>
                <span className={`absolute ${notifications ? 'right-1' : 'left-1'} h-4 w-4 rounded-full ${notifications ? 'bg-primary' : 'bg-muted-foreground'} transition-all`} />
              </div>
            </div>
            
            {/* Budget Alerts Setting */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="font-medium">Budget Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get warned when approaching budget limits
                  </p>
                </div>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
                onClick={() => setBudgetAlerts(!budgetAlerts)}>
                <span className={`absolute ${budgetAlerts ? 'right-1' : 'left-1'} h-4 w-4 rounded-full ${budgetAlerts ? 'bg-primary' : 'bg-muted-foreground'} transition-all`} />
              </div>
            </div>
            
            {/* Device Sync Setting */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Device Sync</p>
                  <p className="text-sm text-muted-foreground">
                    Keep your data in sync across devices
                  </p>
                </div>
              </div>
              <button className="text-sm font-medium text-primary hover:underline">
                Manage Devices
              </button>
            </div>
            
            {/* Account Actions */}
            <div className="pt-6">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-destructive py-3 text-destructive hover:bg-destructive/10 transition-colors">
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center text-xs text-muted-foreground">
        <p>Budget Buddy v1.0.0</p>
        <p className="mt-1">© 2023 Budget Buddy. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Settings;

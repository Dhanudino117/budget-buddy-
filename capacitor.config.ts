
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0860500d9db14bf38d2a205541395e8a',
  appName: 'budget-buddy-',
  webDir: 'dist',
  server: {
    url: 'https://0860500d-9db1-4bf3-8d2a-205541395e8a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  // Add status bar customization
  ios: {
    contentInset: 'automatic'
  },
  android: {
    backgroundColor: '#ffffff'
  }
};

export default config;

import React, { createContext, useContext, ReactNode } from 'react';
import { toast as hotToast, Toast as HotToast, Toaster as HotToaster } from 'react-hot-toast';

// Toast context
type ToastContextType = {
  toast: (message: string, options?: any) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast provider component
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const toast = (message: string, options = {}) => {
    hotToast(message, options);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toaster component for rendering toasts
export const Toaster: React.FC = () => {
  return <HotToaster position="top-right" />;
};

export type { HotToast as Toast }; 
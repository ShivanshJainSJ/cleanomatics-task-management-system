import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-3.5 py-2.5 rounded-md shadow-lg border bg-white dark:bg-[#111111] text-light-text dark:text-dark-text border-light-border dark:border-white/10 dark:shadow-glass-dark animate-toast-in">
      {isSuccess ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
      )}
      <p className="text-xs font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-1.5 p-0.5 text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text rounded"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

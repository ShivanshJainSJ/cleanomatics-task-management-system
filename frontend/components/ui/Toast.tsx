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
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800 animate-slide-up">
      {isSuccess ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
      )}
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div
          className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity animate-overlay-in"
          onClick={onClose}
        />

        <div
          className={`w-full ${maxWidthClasses[maxWidth]} transform overflow-hidden rounded-lg bg-white dark:bg-[#111111] p-6 text-left align-middle shadow-xl border border-light-border dark:border-white/10 dark:shadow-glass-dark z-10 animate-modal-in`}
        >
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-light-border dark:border-white/10">
            <h3 className="text-sm font-semibold text-light-text dark:text-dark-text tracking-tight">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="rounded p-1 text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:bg-light-hover dark:hover:bg-white/5 focus:outline-none"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

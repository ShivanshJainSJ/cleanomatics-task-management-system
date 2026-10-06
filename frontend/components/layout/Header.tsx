import React from 'react';
import { Sun, Moon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CleanomaticsLogo } from '@/components/ui/CleanomaticsLogo';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenCreateModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleDarkMode,
  onOpenCreateModal,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-light-card/90 dark:bg-dark-bg/85 backdrop-blur-md border-b border-light-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CleanomaticsLogo className="w-8 h-8 shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-light-text dark:text-dark-text leading-none">
              Cleanomatics
            </span>
            <span className="text-xs text-light-secondary dark:text-dark-secondary mt-1 leading-none font-normal">
              Task Management System
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md text-light-secondary hover:text-light-text hover:bg-light-hover dark:text-dark-secondary dark:hover:text-dark-text dark:hover:bg-dark-hover border border-transparent dark:border-dark-border/40 transition-all duration-150 ease-out active:scale-95"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Button onClick={onOpenCreateModal}>
            <Plus className="w-4 h-4 mr-1.5" />
            New Task
          </Button>
        </div>
      </div>
    </header>
  );
};

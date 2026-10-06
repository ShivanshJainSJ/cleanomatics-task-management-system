import React from 'react';
import { Sun, Moon, CheckSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold shadow-sm">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
              Task Workspace
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Cleanomatics Engineering Task Manager
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Button onClick={onOpenCreateModal} className="shadow-xs">
            <Plus className="w-4 h-4 mr-1.5" />
            New Task
          </Button>
        </div>
      </div>
    </header>
  );
};

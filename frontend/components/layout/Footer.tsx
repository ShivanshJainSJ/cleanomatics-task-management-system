import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-light-border dark:border-dark-border bg-light-card dark:bg-dark-bg py-5 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-xs text-light-muted dark:text-dark-muted">
        <p>© 2026 Cleanomatics · Task Management System</p>
      </div>
    </footer>
  );
};

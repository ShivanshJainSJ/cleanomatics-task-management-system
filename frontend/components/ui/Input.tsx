import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label ? (
          <label htmlFor={inputId} className="block text-xs font-medium text-light-secondary dark:text-dark-secondary mb-1">
            {label}
          </label>
        ) : null}
        <input
          id={inputId}
          ref={ref}
          className={`w-full px-3 py-1.5 text-xs bg-white dark:bg-white/5 border ${
            error ? 'border-rose-500 focus:ring-rose-500' : 'border-light-border dark:border-dark-border focus:border-neutral-400 dark:focus:border-white/20 focus:ring-sky-500/30'
          } rounded-md text-light-text dark:text-dark-text placeholder-light-muted dark:placeholder-dark-muted focus:outline-none focus:ring-1 transition-all duration-150 ease-out [color-scheme:light] dark:[color-scheme:dark] ${className}`}
          {...props}
        />
        {error ? (
          <p className="mt-1 text-xs text-rose-500">{error}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

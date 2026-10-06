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
          <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {label}
          </label>
        ) : null}
        <input
          id={inputId}
          ref={ref}
          className={`w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border ${
            error ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 dark:border-slate-700 focus:ring-sky-500'
          } rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-colors ${className}`}
          {...props}
        />
        {error ? (
          <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">{error}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

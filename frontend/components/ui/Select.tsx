import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Option[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label ? (
          <label htmlFor={selectId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {label}
          </label>
        ) : null}
        <select
          id={selectId}
          ref={ref}
          className={`w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border ${
            error ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 dark:border-slate-700 focus:ring-sky-500'
          } rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 transition-colors ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error ? (
          <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">{error}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';

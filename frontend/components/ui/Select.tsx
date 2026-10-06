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
          <label htmlFor={selectId} className="block text-xs font-medium text-light-secondary dark:text-dark-secondary mb-1">
            {label}
          </label>
        ) : null}
        <select
          id={selectId}
          ref={ref}
          className={`w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border ${
            error ? 'border-rose-500 focus:ring-rose-500' : 'border-light-border dark:border-dark-border focus:border-neutral-400 dark:focus:border-white/20 focus:ring-sky-500/30'
          } rounded-md text-light-text dark:text-dark-text focus:outline-none focus:ring-1 transition-all duration-150 ease-out ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white dark:bg-neutral-900 text-light-text dark:text-dark-text">
              {opt.label}
            </option>
          ))}
        </select>
        {error ? (
          <p className="mt-1 text-xs text-rose-500">{error}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';

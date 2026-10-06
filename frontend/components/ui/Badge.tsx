import React from 'react';
import { TaskStatus, TaskPriority } from '@/types/task';

interface StatusBadgeProps {
  status: TaskStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    in_progress: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
  };

  const labels = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};

interface PriorityBadgeProps {
  priority: TaskPriority;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const styles = {
    low: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    medium: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
    high: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
  };

  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border ${styles[priority]}`}
    >
      {labels[priority]}
    </span>
  );
};

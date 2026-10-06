import React from 'react';
import { TaskStatus, TaskPriority } from '@/types/task';

interface TaskStatusIndicatorProps {
  status: TaskStatus;
  priority: TaskPriority;
  className?: string;
}

export const TaskStatusIndicator: React.FC<TaskStatusIndicatorProps> = ({
  status,
  priority,
  className = '',
}) => {
  const dotColors: Record<TaskStatus, string> = {
    pending: 'bg-amber-500 dark:bg-amber-400',
    in_progress: 'bg-sky-500 dark:bg-sky-400',
    completed: 'bg-emerald-500 dark:bg-emerald-400',
  };

  const statusLabels: Record<TaskStatus, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
  };

  const priorityLabels: Record<TaskPriority, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };

  return (
    <div className={`inline-flex items-center space-x-1.5 text-xs text-light-secondary dark:text-dark-secondary ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[status]}`} />
      <span className="text-light-text dark:text-dark-text font-normal">{statusLabels[status]}</span>
      <span className="text-light-muted dark:text-dark-muted select-none">·</span>
      <span className="text-light-secondary dark:text-dark-secondary">{priorityLabels[priority]}</span>
    </div>
  );
};

export const StatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  const dotColors: Record<TaskStatus, string> = {
    pending: 'bg-amber-500 dark:bg-amber-400',
    in_progress: 'bg-sky-500 dark:bg-sky-400',
    completed: 'bg-emerald-500 dark:bg-emerald-400',
  };

  const statusLabels: Record<TaskStatus, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
  };

  return (
    <span className="inline-flex items-center space-x-1.5 text-xs text-light-text dark:text-dark-text">
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[status]}`} />
      <span>{statusLabels[status]}</span>
    </span>
  );
};

export const PriorityBadge: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
  const priorityLabels: Record<TaskPriority, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };

  return (
    <span className="text-xs text-light-secondary dark:text-dark-secondary">
      {priorityLabels[priority]}
    </span>
  );
};

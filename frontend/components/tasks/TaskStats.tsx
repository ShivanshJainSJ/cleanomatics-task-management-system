import React from 'react';
import { Task } from '@/types/task';
import { Layers, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === 'pending').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const completed = tasks.filter((t) => t.status === 'completed').length;

  const stats = [
    {
      name: 'Total Tasks',
      value: total,
      icon: Layers,
    },
    {
      name: 'Pending',
      value: pending,
      icon: Clock,
    },
    {
      name: 'In Progress',
      value: inProgress,
      icon: AlertCircle,
    },
    {
      name: 'Completed',
      value: completed,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="p-3.5 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card dark:shadow-glass-card shadow-subtle-light flex items-center space-x-3"
          >
            <div className="p-2 rounded-md bg-neutral-100 dark:bg-white/5 text-light-secondary dark:text-dark-secondary">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-light-muted dark:text-dark-muted leading-tight">
                {stat.name}
              </p>
              <p className="text-base font-semibold text-light-text dark:text-dark-text mt-0.5 leading-tight">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

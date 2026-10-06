import React from 'react';
import { Task } from '@/types/task';
import { CheckCircle2, Clock, AlertCircle, Layers } from 'lucide-react';

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
      color: 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800',
    },
    {
      name: 'Pending',
      value: pending,
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50',
    },
    {
      name: 'In Progress',
      value: inProgress,
      icon: AlertCircle,
      color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50',
    },
    {
      name: 'Completed',
      value: completed,
      icon: CheckCircle2,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center space-x-3"
          >
            <div className={`p-2 rounded-md ${stat.color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {stat.name}
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

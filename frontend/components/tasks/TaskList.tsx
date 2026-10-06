import React from 'react';
import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, ClipboardList, Plus, RefreshCw } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onOpenCreate: () => void;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  error,
  onRefresh,
  onOpenCreate,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs animate-pulse space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
              <div className="h-5 w-14 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
            </div>
            <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
              <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl p-8 text-center max-w-lg mx-auto my-8">
        <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
        <h3 className="text-base font-semibold text-rose-900 dark:text-rose-200 mb-1">
          Failed to load tasks
        </h3>
        <p className="text-xs text-rose-700 dark:text-rose-400 mb-4 leading-relaxed">
          {error}
        </p>
        <Button variant="danger" size="sm" onClick={onRefresh}>
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          Retry Connection
        </Button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center max-w-md mx-auto my-8 shadow-2xs">
        <div className="w-12 h-12 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <ClipboardList className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
          No tasks found
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          No tasks match your current filters or search query. Get started by creating a new task.
        </p>
        <Button onClick={onOpenCreate} size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Create your first task
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

import React from 'react';
import { Task } from '@/types/task';
import { StatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { Calendar, Eye, Edit2, Trash2, Clock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onView,
  onEdit,
  onDelete,
}) => {
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2 wrap">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
          </div>
        </div>

        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-1">
          {task.title}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 mt-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
          <div className="flex items-center space-x-1" title="Due Date">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Due: {formatDate(task.dueDate)}</span>
          </div>
          <div className="flex items-center space-x-1" title="Created Date">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Created: {formatDate(task.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-1 pt-1">
          <button
            onClick={() => onView(task)}
            className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 rounded-md transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-md transition-colors"
            title="Edit Task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md transition-colors"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

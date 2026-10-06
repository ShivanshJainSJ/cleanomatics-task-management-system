import React from 'react';
import { Task } from '@/types/task';
import { TaskStatusIndicator } from '@/components/ui/Badge';
import { Eye, Edit2, Trash2 } from 'lucide-react';

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
    <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border dark:shadow-glass-card shadow-subtle-light rounded-lg p-5 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-white/15">
      <div>
        <div className="mb-2.5">
          <TaskStatusIndicator status={task.status} priority={task.priority} />
        </div>

        <h3 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2 line-clamp-1 leading-snug">
          {task.title}
        </h3>

        <p className="text-xs text-light-secondary dark:text-dark-secondary mb-4 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      </div>

      <div className="pt-3 border-t border-light-border dark:border-dark-border/60 mt-1">
        <div className="flex items-center justify-between text-[11px] text-light-muted dark:text-dark-muted mb-3">
          <span>Due {formatDate(task.dueDate)}</span>
          <span>Created {formatDate(task.createdAt)}</span>
        </div>

        <div className="flex items-center justify-end space-x-2 pt-0.5 text-xs text-light-secondary dark:text-dark-secondary">
          <button
            onClick={() => onView(task)}
            className="inline-flex items-center space-x-1 px-2 py-1 rounded hover:text-light-text dark:hover:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View</span>
          </button>
          <button
            onClick={() => onEdit(task)}
            className="inline-flex items-center space-x-1 px-2 py-1 rounded hover:text-light-text dark:hover:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover"
            title="Edit Task"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(task)}
            className="inline-flex items-center space-x-1 px-2 py-1 rounded hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/20"
            title="Delete Task"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

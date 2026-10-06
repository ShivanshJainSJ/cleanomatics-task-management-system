import React from 'react';
import { Task } from '@/types/task';
import { Modal } from '@/components/ui/Modal';
import { TaskStatusIndicator } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, Edit2, Trash2 } from 'lucide-react';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  isOpen,
  onClose,
  task,
  onEdit,
  onDelete,
}) => {
  if (!isOpen || !task) return null;

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details" maxWidth="lg">
      <div className="space-y-4">
        <div>
          <TaskStatusIndicator status={task.status} priority={task.priority} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-light-text dark:text-dark-text mb-2">
            {task.title}
          </h2>
          <div className="bg-neutral-50 dark:bg-white/[0.03] p-3.5 rounded-md border border-light-border dark:border-white/10 text-xs text-light-secondary dark:text-dark-secondary leading-relaxed whitespace-pre-wrap">
            {task.description}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-light-secondary dark:text-dark-secondary border-t border-light-border dark:border-white/10">
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-light-muted dark:text-dark-muted shrink-0" />
            <div>
              <span className="font-medium block text-light-text dark:text-dark-text text-[11px]">Due Date</span>
              <span className="text-[11px] text-light-muted dark:text-dark-muted">{formatDate(task.dueDate)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-light-muted dark:text-dark-muted shrink-0" />
            <div>
              <span className="font-medium block text-light-text dark:text-dark-text text-[11px]">Created At</span>
              <span className="text-[11px] text-light-muted dark:text-dark-muted">{formatDate(task.createdAt)}</span>
            </div>
          </div>

          <div className="sm:col-span-2 pt-1 text-[11px] text-light-muted dark:text-dark-muted">
            <span>Task ID: </span>
            <code className="bg-neutral-100 dark:bg-white/5 px-1.5 py-0.5 rounded font-mono text-[10px] text-light-text dark:text-dark-text">
              {task.id}
            </code>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3.5 border-t border-light-border dark:border-white/10">
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              onClose();
              onDelete(task);
            }}
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Delete
          </Button>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              size="sm"
              onClick={() => {
                onClose();
                onEdit(task);
              }}
            >
              <Edit2 className="w-3.5 h-3.5 mr-1" />
              Edit Task
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

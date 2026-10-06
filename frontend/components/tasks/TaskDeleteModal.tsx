import React, { useState } from 'react';
import { Task } from '@/types/task';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

interface TaskDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onConfirm: (id: string) => Promise<boolean>;
}

export const TaskDeleteModal: React.FC<TaskDeleteModalProps> = ({
  isOpen,
  onClose,
  task,
  onConfirm,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !task) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    const success = await onConfirm(task.id);
    setIsDeleting(false);
    if (success) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Task" maxWidth="sm">
      <div className="space-y-3.5">
        <div className="flex items-center space-x-2.5 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 p-2.5 rounded-md border border-rose-200 dark:border-rose-900/30">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <p className="text-xs font-medium">This action cannot be undone.</p>
        </div>

        <p className="text-xs text-light-secondary dark:text-dark-secondary leading-relaxed">
          Are you sure you want to delete <span className="font-semibold text-light-text dark:text-dark-text">&quot;{task.title}&quot;</span>?
        </p>

        <div className="flex items-center justify-end space-x-2.5 pt-3.5 border-t border-light-border dark:border-white/10">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete} isLoading={isDeleting}>
            Delete Task
          </Button>
        </div>
      </div>
    </Modal>
  );
};

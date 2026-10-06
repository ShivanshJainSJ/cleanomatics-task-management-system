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
      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-3 rounded-lg border border-rose-200 dark:border-rose-900/50">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <p className="text-xs font-medium">This action cannot be undone.</p>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300">
          Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-slate-100">&quot;{task.title}&quot;</span>?
        </p>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
            Delete Task
          </Button>
        </div>
      </div>
    </Modal>
  );
};

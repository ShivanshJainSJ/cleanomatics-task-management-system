import React, { useState, useEffect } from 'react';
import { Task, TaskPayload, TaskStatus, TaskPriority } from '@/types/task';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: TaskPayload) => Promise<boolean>;
  taskToEdit?: Task | null;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  taskToEdit,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('pending');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState('');

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    dueDate?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);

      try {
        const formattedDate = new Date(taskToEdit.dueDate).toISOString().slice(0, 16);
        setDueDate(formattedDate);
      } catch {
        setDueDate(taskToEdit.dueDate);
      }
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
      setPriority('medium');

      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 7);
      setDueDate(defaultDate.toISOString().slice(0, 16));
    }
    setErrors({});
  }, [taskToEdit, isOpen]);

  const validate = () => {
    const newErrors: { title?: string; description?: string; dueDate?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    let isoDueDate = dueDate;
    try {
      isoDueDate = new Date(dueDate).toISOString();
    } catch {
      isoDueDate = dueDate;
    }

    const payload: TaskPayload = {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate: isoDueDate,
    };

    const success = await onSubmit(payload);
    setIsSubmitting(false);

    if (success) {
      onClose();
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={taskToEdit ? 'Edit Task' : 'Create New Task'}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <Input
          label="Title *"
          placeholder="e.g. Audit database query performance"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
          }}
          error={errors.title}
        />

        <div className="w-full">
          <label className="block text-xs font-medium text-light-secondary dark:text-dark-secondary mb-1">
            Description *
          </label>
          <textarea
            rows={3}
            placeholder="Detailed overview of what needs to be done..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
            }}
            className={`w-full px-3 py-1.5 text-xs bg-white dark:bg-white/5 border ${
              errors.description ? 'border-rose-500 focus:ring-rose-500' : 'border-light-border dark:border-dark-border focus:ring-sky-500'
            } rounded-md text-light-text dark:text-dark-text placeholder-light-muted dark:placeholder-dark-muted focus:outline-none focus:ring-1 transition-colors`}
          />
          {errors.description ? (
            <p className="mt-1 text-xs text-rose-500">{errors.description}</p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Status"
            options={statusOptions}
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
          />

          <Select
            label="Priority"
            options={priorityOptions}
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
          />
        </div>

        <Input
          label="Due Date *"
          type="datetime-local"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
            if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: undefined }));
          }}
          error={errors.dueDate}
        />

        <div className="flex items-center justify-end space-x-2.5 pt-3.5 border-t border-light-border dark:border-white/10">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm" isLoading={isSubmitting}>
            {taskToEdit ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

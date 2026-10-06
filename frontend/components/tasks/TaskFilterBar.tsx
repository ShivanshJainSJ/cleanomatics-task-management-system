import React from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface TaskFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  priorityFilter: string;
  onPriorityChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderToggle: () => void;
}

export const TaskFilterBar: React.FC<TaskFilterBarProps> = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderToggle,
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Sort by Created Date' },
    { value: 'dueDate', label: 'Sort by Due Date' },
    { value: 'priority', label: 'Sort by Priority' },
    { value: 'title', label: 'Sort by Title' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-6 shadow-2xs space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-center">
        <div className="relative col-span-1 sm:col-span-2 md:col-span-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        />

        <Select
          options={priorityOptions}
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
        />

        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
            />
          </div>
          <button
            onClick={onSortOrderToggle}
            className="p-2 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors shrink-0"
            title={`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
          >
            {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Task } from '@/types/task';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TaskStats } from '@/components/tasks/TaskStats';
import { TaskFilterBar } from '@/components/tasks/TaskFilterBar';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskFormModal } from '@/components/tasks/TaskFormModal';
import { TaskDetailModal } from '@/components/tasks/TaskDetailModal';
import { TaskDeleteModal } from '@/components/tasks/TaskDeleteModal';
import { Toast } from '@/components/ui/Toast';

export default function Home() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const {
    tasks,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    toast,
    clearToast,
    refreshTasks,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const closeAllModals = () => {
    setIsFormModalOpen(false);
    setIsDetailModalOpen(false);
    setIsDeleteModalOpen(false);
    setTaskToEdit(null);
    setSelectedTask(null);
    setTaskToDelete(null);
  };

  const handleOpenCreate = () => {
    closeAllModals();
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    closeAllModals();
    setTaskToEdit(task);
    setIsFormModalOpen(true);
  };

  const handleOpenDetail = (task: Task) => {
    closeAllModals();
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleOpenDelete = (task: Task) => {
    closeAllModals();
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleSortOrderToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onOpenCreateModal={handleOpenCreate}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TaskStats tasks={tasks} />

          <TaskFilterBar
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            sortOrder={sortOrder}
            onSortOrderToggle={handleSortOrderToggle}
          />

          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            onRefresh={refreshTasks}
            onOpenCreate={handleOpenCreate}
            onView={handleOpenDetail}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
        </main>
      </div>

      <Footer />

      <TaskFormModal
        isOpen={isFormModalOpen}
        onClose={closeAllModals}
        taskToEdit={taskToEdit}
        onSubmit={async (payload) => {
          if (taskToEdit) {
            return await updateTask(taskToEdit.id, payload);
          } else {
            return await createTask(payload);
          }
        }}
      />

      <TaskDetailModal
        isOpen={isDetailModalOpen}
        onClose={closeAllModals}
        task={selectedTask}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      <TaskDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeAllModals}
        task={taskToDelete}
        onConfirm={async (id) => {
          return await deleteTask(id);
        }}
      />

      {toast ? (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={clearToast}
        />
      ) : null}
    </div>
  );
}

<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-100 p-4 min-h-screen">
    <TaskColumn
      v-for="status in statuses"
      :key="status"
      :status="status"
      :tasks="filteredTasks(status)"
      @update-task-status="updateTaskStatus"
      @drag-task="dragTask"
      @drop-task="dropTask"
      @edit-task="editTask"
      @delete-task="deleteTask"
    />
    <button
    class="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600"
    @click="openTaskForm"
  >
    + Нова задача
  </button>
    <Modal v-if="showModal" @close="closeModal">
      <TaskForm :task="selectedTask" @save="saveTask" />
    </Modal>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '~/stores/taskStore';
import TaskColumn from '~/components/TaskColumn.vue';
import Modal from '~/components/Modal.vue';
import TaskForm from '~/components/TaskForm.vue';
import { Task, TaskStatus } from '~/types';

const taskStore = useTaskStore();
const statuses: TaskStatus[] = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

const showModal = ref(false);
const selectedTask = ref<Task | null>(null);
const draggedTask = ref<Task | null>(null);

const filteredTasks = (status: TaskStatus) =>
  taskStore.tasks.filter((task: Task) => task.status === status);

const openTaskForm = () => {
  selectedTask.value = null;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedTask.value = null;
};

const saveTask = (task: Task) => {
  if (task.id) {
    taskStore.updateTask(task);
  } else {
    taskStore.addTask(task);
  }
  closeModal();
};

const editTask = (task: Task) => {
  selectedTask.value = { ...task };
  showModal.value = true;
};

const deleteTask = (taskId: string) => {
  if (confirm('Ви впевнені, що хочете видалити цю задачу?')) {
    taskStore.deleteTask(taskId);
  }
};

const dragTask = (task: Task) => {
  draggedTask.value = task;
};

const dropTask = (status: TaskStatus) => {
  if (draggedTask.value) {
    taskStore.updateTaskStatus(draggedTask.value.id, status);
    draggedTask.value = null;
  }
};
</script>
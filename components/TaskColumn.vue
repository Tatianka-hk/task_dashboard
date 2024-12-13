<template>
  <div
    class="flex flex-col bg-gray-50 border rounded-lg shadow p-4 min-h-[400px]"
    @dragover.prevent
    @drop="onDrop"
  >
    <h2 class="text-xl font-bold text-gray-800 mb-4">{{ status }}</h2>
    <div class="flex flex-col gap-3">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @dragstart="onDragStart(task)"
        @edit-task="$emit('edit-task', task)"
        @delete-task="$emit('delete-task', task.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Task, TaskStatus } from '~/types';
import TaskCard from '~/components/TaskCard.vue';

const props = defineProps<{
  status: TaskStatus;
  tasks: Task[];
}>();

const emit = defineEmits<{
  (event: 'drag-task', task: Task): void;
  (event: 'drop-task', status: TaskStatus): void;
  (event: 'edit-task', task: Task): void;
  (event: 'delete-task', taskId: string): void;
}>();


const onDragStart = (task: Task) => {
  emit('drag-task', task);
};

const onDrop = () => {
  emit('drop-task', props.status);
};
</script>
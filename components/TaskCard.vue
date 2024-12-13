<template>
  <div
    class="p-4 border rounded-lg shadow hover:shadow-lg bg-white cursor-grab transition hover:bg-gray-50"
    draggable="true"
    @dragstart="dragStart"
  >
    <h3 class="text-lg font-semibold text-gray-800">{{ task.title }}</h3>
    <p class="text-sm text-gray-600 my-2">{{ task.description }}</p>
    <div class="text-sm text-gray-600">
      <p><strong>Відповідальний:</strong> {{ task.responsible }}</p>
      <p><strong>Виконавці:</strong> {{ task.executors.join(', ') }}</p>
      <p><strong>Пріоритет:</strong> {{ task.priority }}</p>
    </div>
    <div class="flex gap-2 mt-4">
      <button
        class="px-3 py-1 text-white text-sm rounded bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        @click="$emit('edit-task', task)"
      >
        Редагувати
      </button>
      <button
        class="px-3 py-1 text-white text-sm rounded bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        @click="$emit('delete-task', task.id)"
      >
        Видалити
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Task } from '../types.ts'
const props = defineProps<{
  task: Task;
}>();
const dragStart = (event) => {
  event.dataTransfer.setData('taskId', props.task.id);
};
</script>

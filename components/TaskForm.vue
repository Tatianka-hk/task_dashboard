<script setup lang="ts">
import { reactive, watch } from 'vue';
import { TaskFormData, TaskStatus, TaskPriority } from '../types'; 
import { defineProps, defineEmits } from 'vue';

// Define props for task (optional task editing)
const props = defineProps<{
  task: TaskFormData | null; 
}>();

const emit = defineEmits<{
  (event: 'save', task: TaskFormData): void;
}>();

const formTask = reactive<TaskFormData>({
  title: '',
  description: '',
  responsible: '',
  executors: '',
  status: TaskStatus.TODO,
  priority: TaskPriority.MEDIUM,
});

watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      Object.assign(formTask, newTask);
    } else {
      Object.assign(formTask, {
        title: '',
        description: '',
        responsible: '',
        executors: '',
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
      });
    }
  },
  { immediate: true }
);

const isValidForm = (): boolean => {
  return (
    !!formTask.title &&
    !!formTask.description &&
    !!formTask.responsible &&
    !!formTask.executors
  );
};
const onSave = () => {
  if (!isValidForm()) {
    alert('Будь ласка, заповніть всі поля!');
    return;
  }

  const executors = Array.isArray(formTask.executors) ? formTask.executors : formTask.executors.split(',').map((e) => e.trim());

  emit('save', {
    ...formTask,
    executors,
  });
};
</script>

<template>
  <div class="task-form">
    <form @submit.prevent="onSave">
      <div class="mb-4">
        <label for="title" class="block text-gray-700">Назва</label>
        <input
          type="text"
          id="title"
          v-model="formTask.title"
          class="mt-2 p-2 w-full border rounded"
          placeholder="Назва завдання"
        />
      </div>

      <div class="mb-4">
        <label for="description" class="block text-gray-700">Опис</label>
        <textarea
          id="description"
          v-model="formTask.description"
          class="mt-2 p-2 w-full border rounded"
          placeholder="Опис завдання"
        ></textarea>
      </div>

      <div class="mb-4">
        <label for="responsible" class="block text-gray-700">Відповідальна особа</label>
        <input
          type="text"
          id="responsible"
          v-model="formTask.responsible"
          class="mt-2 p-2 w-full border rounded"
          placeholder="Відповідальна особа"
        />
      </div>

      <div class="mb-4">
        <label for="executors" class="block text-gray-700">Виконавці</label>
        <input
          type="text"
          id="executors"
          v-model="formTask.executors"
          class="mt-2 p-2 w-full border rounded"
          placeholder="Виконавці (через кому)"
        />
      </div>

      <div class="mb-4">
        <label for="status" class="block text-gray-700">Статус</label>
        <select
          id="status"
          v-model="formTask.status"
          class="mt-2 p-2 w-full border rounded"
        >
          <option :value="TaskStatus.TODO">TODO</option>
          <option :value="TaskStatus.IN_PROGRESS">In progress</option>
          <option :value="TaskStatus.DONE">Done</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="priority" class="block text-gray-700">Приорітет </label>
        <select
          id="priority"
          v-model="formTask.priority"
          class="mt-2 p-2 w-full border rounded"
        >
          <option :value="TaskPriority.LOW">Низький</option>
          <option :value="TaskPriority.MEDIUM">Середній</option>
          <option :value="TaskPriority.HIGH">Високий</option>
          <option :value="TaskPriority.CRITICAL">Критичний</option>
        </select>
      </div>

      <button type="submit" class="mt-4 p-2 bg-blue-500 text-white rounded">
        Зберегти
      </button>
    </form>
  </div>
</template>

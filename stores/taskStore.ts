import { defineStore } from 'pinia';
import { Task, TaskStatus, TaskPriority } from '~/types';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]') as Task[], 
  }),

  actions: {
    addTask(task: TaskFormData) {
      if (!task?.title || !task?.description || !task?.responsible || task?.executors?.length === 0) {
        throw new Error('Завдання має бути з усіма заповненими полями');
      }

      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.tasks.push(newTask);
      this.saveTasks();
    },

    updateTask(updatedTask: Task) {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
        this.tasks[index].updatedAt = new Date(); 
        this.saveTasks();
      }
    },

    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      this.saveTasks();
    },

    updateTaskStatus(taskId: string, status: TaskStatus) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        task.status = status;
        task.updatedAt = new Date(); 
        this.saveTasks();
      }
    },

    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
  },
});

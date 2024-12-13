<template>
  <v-container>
    <TaskBoard />
  </v-container>
</template>

<script>
import TaskBoard from './components/TaskBoard.vue'
import TaskForm from './components/TaskForm.vue'
export default {
  components: { TaskBoard, TaskForm }
}
</script>
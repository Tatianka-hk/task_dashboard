<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    @click.self="$emit('close')"
  >
    <div class="relative bg-white rounded-lg shadow-lg p-6 w-96">
      <button
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        @click="$emit('close')"
      >
        ✖
      </button>
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  x: number
  y: number
}>()

const emit = defineEmits<{
  'hover-enter': []
  'hover-leave': []
}>()
</script>

<template>
  <div
    class="checker-dot"
    :style="{ left: x + 'px', top: y + 'px' }"
    @mouseenter="emit('hover-enter')"
    @mouseleave="emit('hover-leave')"
  />
</template>

<style scoped>
.checker-dot {
  position: absolute;
  width: 14px;
  height: 14px;
  background: #6366f1;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 0 6px rgba(99, 102, 241, 0.4);
  animation: checker-pulse 1.5s infinite;
  pointer-events: auto;
}

@keyframes checker-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.6;
  }
}
</style>

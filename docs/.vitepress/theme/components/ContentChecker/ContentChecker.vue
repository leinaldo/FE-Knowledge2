<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CheckerDot from './CheckerDot.vue'
import CheckerPanel from './CheckerPanel.vue'

const showDot = ref(false)
const showPanel = ref(false)
const selectedText = ref('')
const dotPosition = ref({ x: 0, y: 0 })

let hideTimer: ReturnType<typeof setTimeout> | null = null

function getSelectionEnd(): { x: number; y: number } | null {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return null

  const range = selection.getRangeAt(selection.rangeCount - 1)
  const rects = range.getClientRects()
  if (rects.length === 0) return null

  const lastRect = rects[rects.length - 1]
  return {
    x: lastRect.right + window.scrollX + 4,
    y: lastRect.top + window.scrollY + (lastRect.height / 2) - 7,
  }
}

function onMouseUp(e: MouseEvent) {
  // Ignore clicks inside the checker components
  const target = e.target as HTMLElement
  if (target.closest('.checker-dot') || target.closest('.checker-panel')) return

  const selection = window.getSelection()
  const text = selection?.toString().trim() || ''

  if (!text) {
    // Clicked without selecting — hide dot if panel is not shown
    if (!showPanel.value) {
      showDot.value = false
    }
    return
  }

  const pos = getSelectionEnd()
  if (!pos) return

  // Reset state for new selection
  showPanel.value = false
  if (hideTimer) clearTimeout(hideTimer)

  selectedText.value = text
  dotPosition.value = pos
  showDot.value = true
}

function onDotHoverEnter() {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  showPanel.value = true
}

function onHoverLeave() {
  hideTimer = setTimeout(() => {
    showPanel.value = false
  }, 300)
}

function onPanelHoverEnter() {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

function onPanelClose() {
  showPanel.value = false
  showDot.value = false
}

onMounted(() => {
  document.addEventListener('mouseup', onMouseUp)
})

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', onMouseUp)
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<template>
  <div class="content-checker-root">
    <CheckerDot
      v-if="showDot"
      :x="dotPosition.x"
      :y="dotPosition.y"
      @hover-enter="onDotHoverEnter"
      @hover-leave="onHoverLeave"
    />
    <CheckerPanel
      v-if="showPanel"
      :text="selectedText"
      :dot-x="dotPosition.x"
      :dot-y="dotPosition.y"
      @close="onPanelClose"
      @hover-enter="onPanelHoverEnter"
      @hover-leave="onHoverLeave"
    />
  </div>
</template>

<style scoped>
.content-checker-root {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 1000;
}

.content-checker-root :deep(*) {
  pointer-events: auto;
}
</style>

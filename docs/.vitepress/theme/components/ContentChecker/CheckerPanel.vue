<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { useData } from 'vitepress'
import ApiKeySettings from './ApiKeySettings.vue'

const STORAGE_KEY = 'content-checker-config'
const MAX_TEXT_LENGTH = 2000

const SYSTEM_PROMPT = `你是一个技术内容审核助手。请对以下选中的文本进行检查，关注以下三个方面：

1. **时效性**：内容是否过时？涉及的技术/API/工具是否已有更新版本或替代方案？
2. **准确性**：技术描述是否正确？是否有常见误解或不严谨的表述？
3. **链接有效性**：如果文本中包含 URL，指出这些链接（你无法访问链接，但可以根据 URL 模式判断是否可能失效）。

请用简洁的中文回答，直接指出问题和建议，不需要重复原文。如果内容没有问题，简短说明即可。`

const props = defineProps<{
  text: string
  dotX: number
  dotY: number
}>()

const emit = defineEmits<{
  close: []
  'hover-enter': []
  'hover-leave': []
}>()

const { isDark } = useData()

const panelRef = ref<HTMLElement>()
const showSettings = ref(false)
const responseText = ref('')
const isLoading = ref(false)
const errorText = ref('')

// Drag state
const dragOffset = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = { x: 0, y: 0, offsetX: 0, offsetY: 0 }

let abortController: AbortController | null = null

function hasConfig(): boolean {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return false
  try {
    const config = JSON.parse(stored)
    return !!(config.baseUrl && config.apiKey && config.model)
  } catch {
    return false
  }
}

function getConfig() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : null
}

async function checkContent() {
  if (!hasConfig()) {
    showSettings.value = true
    return
  }

  const config = getConfig()
  responseText.value = ''
  errorText.value = ''
  isLoading.value = true

  abortController = new AbortController()

  let inputText = props.text
  if (inputText.length > MAX_TEXT_LENGTH) {
    inputText = inputText.slice(0, MAX_TEXT_LENGTH) + '...（已截断）'
  }

  try {
    const res = await fetch(`${config.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        stream: true,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: inputText },
        ],
      }),
      signal: abortController.signal,
    })

    if (!res.ok) {
      const status = res.status
      if (status === 401 || status === 403) {
        errorText.value = 'API Key 无效，请检查设置'
      } else {
        errorText.value = `请求失败 (${status})，请稍后重试`
      }
      isLoading.value = false
      return
    }

    const reader = res.body!.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || !trimmed.startsWith('data: ')) continue
        const data = trimmed.slice(6)
        if (data === '[DONE]') break

        try {
          const parsed = JSON.parse(data)
          const content = parsed.choices?.[0]?.delta?.content
          if (content) {
            responseText.value += content
          }
        } catch {}
      }
    }
  } catch (err: any) {
    if (err.name !== 'AbortError') {
      errorText.value = '请求失败，请检查网络连接'
    }
  } finally {
    isLoading.value = false
    abortController = null
  }
}

function cancelRequest() {
  abortController?.abort()
  abortController = null
}

function onSettingsSaved() {
  showSettings.value = false
  checkContent()
}

function copyResult() {
  navigator.clipboard.writeText(responseText.value)
}

// Drag handlers
function onDragStart(e: MouseEvent) {
  isDragging.value = true
  dragStart.x = e.clientX
  dragStart.y = e.clientY
  dragStart.offsetX = dragOffset.value.x
  dragStart.offsetY = dragOffset.value.y
  document.addEventListener('mousemove', onDragMove)
  document.addEventListener('mouseup', onDragEnd)
}

function onDragMove(e: MouseEvent) {
  if (!isDragging.value) return
  const dx = e.clientX - dragStart.x
  const dy = e.clientY - dragStart.y
  const newX = dragStart.offsetX + dx
  const newY = dragStart.offsetY + dy

  // Clamp to viewport
  if (panelRef.value) {
    const rect = panelRef.value.getBoundingClientRect()
    const maxX = window.innerWidth - rect.width
    const maxY = window.innerHeight - rect.height
    const panelBaseX = props.dotX
    const panelBaseY = props.dotY + 20

    dragOffset.value = {
      x: Math.max(-panelBaseX, Math.min(newX, maxX - panelBaseX)),
      y: Math.max(-panelBaseY, Math.min(newY, maxY - panelBaseY)),
    }
  } else {
    dragOffset.value = { x: newX, y: newY }
  }
}

function onDragEnd() {
  isDragging.value = false
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
}

// Auto-check on mount when text changes
watch(() => props.text, () => {
  dragOffset.value = { x: 0, y: 0 }
  checkContent()
}, { immediate: true })

onBeforeUnmount(() => {
  cancelRequest()
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
})
</script>

<template>
  <div
    ref="panelRef"
    class="checker-panel"
    :class="{ dark: isDark }"
    :style="{
      left: (dotX + dragOffset.x) + 'px',
      top: (dotY + 20 + dragOffset.y) + 'px',
    }"
    @mouseenter="emit('hover-enter')"
    @mouseleave="emit('hover-leave')"
  >
    <!-- Title bar (draggable) -->
    <div class="panel-header" @mousedown.prevent="onDragStart">
      <div class="panel-title">
        <span class="panel-icon">🔍</span>
        <span>Content Checker</span>
      </div>
      <div class="panel-actions">
        <span class="panel-action" @click.stop="showSettings = !showSettings">⚙️</span>
        <span class="panel-action panel-close" @click.stop="emit('close')">×</span>
      </div>
    </div>

    <!-- Settings -->
    <ApiKeySettings v-if="showSettings" @saved="onSettingsSaved" />

    <!-- Content -->
    <div v-else class="panel-body">
      <div v-if="isLoading && !responseText" class="panel-loading">
        正在分析选中内容...
      </div>
      <div v-else-if="errorText" class="panel-error">
        {{ errorText }}
      </div>
      <div v-else class="panel-result">
        {{ responseText }}
        <span v-if="isLoading" class="typing-cursor">▊</span>
      </div>
    </div>

    <!-- Footer -->
    <div v-if="!showSettings && (responseText || errorText)" class="panel-footer">
      <button class="btn-primary" @click="checkContent">重新检查</button>
      <button class="btn-ghost" @click="copyResult" :disabled="!responseText">复制结果</button>
    </div>
  </div>
</template>

<style scoped>
.checker-panel {
  --checker-bg: #ffffff;
  --checker-bg-header: #f8f9fa;
  --checker-bg-body: #f9fafb;
  --checker-text: #374151;
  --checker-text-secondary: #6b7280;
  --checker-border: #e5e7eb;
  --checker-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  position: absolute;
  width: 360px;
  background: var(--checker-bg);
  border: 1px solid var(--checker-border);
  border-radius: 10px;
  box-shadow: var(--checker-shadow);
  z-index: 1001;
  font-size: 13px;
  overflow: hidden;
  user-select: text;
}

.checker-panel.dark {
  --checker-bg: #1e1e3a;
  --checker-bg-header: #252547;
  --checker-bg-body: #1a1a2e;
  --checker-text: #cbd5e1;
  --checker-text-secondary: #64748b;
  --checker-border: #2d2d5e;
  --checker-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: var(--checker-bg-header);
  border-bottom: 1px solid var(--checker-border);
  cursor: move;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: var(--checker-text);
  font-size: 13px;
}

.panel-icon {
  font-size: 14px;
}

.panel-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel-action {
  cursor: pointer;
  color: var(--checker-text-secondary);
  font-size: 11px;
}

.panel-close {
  font-size: 16px;
  line-height: 1;
}

.panel-body {
  padding: 12px;
  color: var(--checker-text);
  line-height: 1.7;
  font-size: 12px;
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.panel-loading {
  color: var(--checker-text-secondary);
}

.panel-error {
  color: #ef4444;
}

.panel-result {
  color: var(--checker-text);
}

.typing-cursor {
  animation: blink 1s infinite;
  color: var(--checker-text-secondary);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.panel-footer {
  padding: 8px 12px;
  border-top: 1px solid var(--checker-border);
  display: flex;
  gap: 8px;
}

.btn-primary {
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 11px;
  cursor: pointer;
}

.btn-primary:hover {
  background: #4f46e5;
}

.btn-ghost {
  background: transparent;
  color: var(--checker-text-secondary);
  border: 1px solid var(--checker-border);
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 11px;
  cursor: pointer;
}

.btn-ghost:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

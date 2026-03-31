<script setup lang="ts">
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'content-checker-config'

const emit = defineEmits<{
  saved: []
}>()

const baseUrl = ref('')
const apiKey = ref('')
const model = ref('')

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      const config = JSON.parse(stored)
      baseUrl.value = config.baseUrl || ''
      apiKey.value = config.apiKey || ''
      model.value = config.model || ''
    } catch {}
  }
})

function save() {
  const config = {
    baseUrl: baseUrl.value.replace(/\/+$/, ''),
    apiKey: apiKey.value.trim(),
    model: model.value.trim(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  emit('saved')
}
</script>

<template>
  <div class="checker-settings">
    <div class="settings-field">
      <label>Base URL</label>
      <input
        v-model="baseUrl"
        type="text"
        placeholder="https://api.openai.com"
      />
    </div>
    <div class="settings-field">
      <label>API Key</label>
      <input
        v-model="apiKey"
        type="password"
        placeholder="sk-..."
      />
    </div>
    <div class="settings-field">
      <label>Model</label>
      <input
        v-model="model"
        type="text"
        placeholder="gpt-4o"
      />
    </div>
    <button class="settings-save-btn" @click="save">
      保存
    </button>
  </div>
</template>

<style scoped>
.checker-settings {
  padding: 12px;
}
.settings-field {
  margin-bottom: 10px;
}
.settings-field label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--checker-text-secondary);
}
.settings-field input {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid var(--checker-border);
  border-radius: 6px;
  font-size: 12px;
  background: var(--checker-bg);
  color: var(--checker-text);
  outline: none;
  box-sizing: border-box;
}
.settings-field input:focus {
  border-color: #6366f1;
}
.settings-save-btn {
  width: 100%;
  padding: 6px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}
.settings-save-btn:hover {
  background: #4f46e5;
}
</style>

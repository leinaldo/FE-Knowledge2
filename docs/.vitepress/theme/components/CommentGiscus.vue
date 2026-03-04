<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { nextTick, ref, watch } from 'vue'
import Giscus from '@giscus/vue'

const { isDark } = useData()

const route = useRoute()
</script>

<template>
  <Giscus :key="route.path" repo="leinaldo/FE-Knowledge2" repo-id="MDEwOlJlcG9zaXRvcnk0MDM5MDk2NjY="
    category="Announcements" category-id="DIC_kwDOGBMsIs4CirB3" mapping="pathname" reactionsEnabled="1" emitMetadata="0"
    inputPosition="top" lang="zh-CN" loading="lazy" :theme="isDark ? 'dark' : 'light'" />
</template>
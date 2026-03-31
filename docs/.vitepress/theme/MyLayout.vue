<script setup>
import DefaultTheme from 'vitepress/theme'
import CommentGiscus from './components/CommentGiscus.vue'
import ContentChecker from './components/ContentChecker/ContentChecker.vue'
import { setupToggleAppearance } from './plugins/setupToggleApperance';



const { Layout } = DefaultTheme
setupToggleAppearance()

</script>

<template>
  <Layout>
    <template #doc-after>
      <CommentGiscus />
    </template>
  </Layout>
  <ClientOnly>
    <ContentChecker />
  </ClientOnly>
</template>
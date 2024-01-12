<script setup lang="ts">
import Toaster from '~/components/ui/toast/Toaster.vue'

useSeoMeta({
  title: 'Genius',
  description: 'AI SaaS',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
    <ModalProvider />
  </NuxtLayout>
</template>

<style>
html, body, #__nuxt {
  height: 100%;
}
</style>

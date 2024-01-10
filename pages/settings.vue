<script setup lang="ts">
import { Settings } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
})
</script>

<template>
  <div>
    <TheHeading
      title="Settings"
      description="Configure your account settings"
      :icon="Settings"
      icon-color="text-sky-500"
      bg-color="bg-sky-500/10"
    />
  </div>
</template>

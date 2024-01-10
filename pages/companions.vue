<script setup lang="ts">
import { Contact } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
})
</script>

<template>
  <div>
    <TheHeading
      title="Companions"
      description="Chat with the your AI companions"
      :icon="Contact"
      icon-color="text-green-500"
      bg-color="bg-green-500/10"
    />
    Companions
  </div>
</template>

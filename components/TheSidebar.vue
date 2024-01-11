<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div :class="cn('space-y-4 flex flex-col h-full border-r', route.path === '/dashboard' && 'hidden')">
    <ConversationList v-if="route.path === '/conversation'" />
    <div v-if="route.path === '/companions'">
      Companions
    </div>
    <div v-if="route.path === '/settings'">
      Settings
    </div>
  </div>
</template>

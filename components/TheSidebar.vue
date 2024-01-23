<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div :class="cn('space-y-4 flex flex-col h-full border-r', route.path === '/dashboard' && 'hidden')">
    <ClientOnly>
      <ConversationList v-if="route.path.startsWith('/conversation')" />
      <CompanionList v-if="route.path.startsWith('/companions')" />
      <div v-if="route.path === '/settings'">
        Settings
      </div>
    </ClientOnly>
  </div>
</template>

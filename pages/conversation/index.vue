<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})
</script>

<template>
  <div class="h-full flex flex-col px-4">
    <ModelSelect />
    <div class="flex-1 overflow-y-auto">
      <div class="w-full md:max-w-2xl mx-auto flex flex-col items-center justify-center h-full">
        <div class="h-12 w-12 mb-4">
          <NuxtImg src="/logo.png" alt="logo" />
        </div>
        <div class="text-3xl font-semibold">
          How can I help you today?
        </div>
      </div>
    </div>
  </div>
</template>

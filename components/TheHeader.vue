<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: any
  iconColor: string
  bgColor: string
}>()
</script>

<template>
  <div class="px-4 lg:ox-8 flex items-center gap-x-3 mb-8">
    <div :class="cn('p-2 w-fit rounded-md')" />
  </div>
</template>

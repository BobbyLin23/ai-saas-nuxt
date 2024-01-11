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
  <div class="flex items-center gap-x-3 mb-2">
    <div :class="cn('p-2 w-fit rounded-md', bgColor)">
      <component :is="icon" :class="cn('w-10 h-10', iconColor)" />
    </div>
    <div>
      <h2 class="text-3xl font-bold">
        {{ title }}
      </h2>
      <p class="text-sm text-muted-foreground">
        {{ description }}
      </p>
    </div>
  </div>
</template>

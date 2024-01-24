<script setup lang="ts">
defineProps<{
  src?: string
}>()
</script>

<template>
  <Avatar class="h-8 w-8">
    <AvatarImage class="object-cover" :src="src || '/logo.png'" />
  </Avatar>
</template>

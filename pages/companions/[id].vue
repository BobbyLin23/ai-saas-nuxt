<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})

const route = useRoute()
</script>

<template>
  <div>
    {{ route.params.id }}
  </div>
</template>

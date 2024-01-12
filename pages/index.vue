<script setup lang="ts">
definePageMeta({
  auth: false,
})

const user = ref()

onMounted(async () => {
  user.value = await useCurrentUser()
})

watch(user, () => {
  if (user.value)
    navigateTo('/dashboard')
})
</script>

<template>
  <div class="p-4">
    Landing
  </div>
</template>

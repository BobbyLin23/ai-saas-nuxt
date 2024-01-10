<script setup lang="ts">
const user = await useCurrentUser()
</script>

<template>
  <Avatar class="h-8 w-8">
    <AvatarImage :src="user?.image || ''" alt="Avatar" />
    <AvatarFallback>
      {{ user?.name?.charAt(0) }}
      {{ user?.name?.charAt(1) }}
    </AvatarFallback>
  </Avatar>
</template>

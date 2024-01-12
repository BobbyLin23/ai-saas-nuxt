<script setup lang="ts">
import { User } from 'lucide-vue-next'

const user = await useCurrentUser()
</script>

<template>
  <Avatar class="h-8 w-8">
    <AvatarImage :src="user?.image || '/placeholder.png'" alt="Avatar" />
    <AvatarFallback class="bg-sky-500 rounded-full">
      <User class="text-white" />
    </AvatarFallback>
  </Avatar>
</template>

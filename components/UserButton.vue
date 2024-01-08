<script setup lang="ts">
import { LogOut, User } from 'lucide-vue-next'

const { signOut } = useAuth()

const user = await useCurrentUser()

async function handleLogOut() {
  await signOut({ callbackUrl: '/login' })
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage :src="user?.image || ''" alt="Avatar" />
        <AvatarFallback class="bg-sky-500 rounded-full">
          <User class="text-white" />
        </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-40" align="end">
      <DropdownMenuItem @click="handleLogOut">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

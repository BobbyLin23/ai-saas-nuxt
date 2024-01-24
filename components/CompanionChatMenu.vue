<script lang="ts" setup>
import type { Companion } from '@prisma/client'
import { Edit, MoreVertical, Trash2 } from 'lucide-vue-next'

defineProps<{
  companion: Companion
}>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="link" size="icon">
        <MoreVertical class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>{{ companion?.name }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Edit class="w-4 h-4 mr-2" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Trash2 class="w-4 h-4 mr-2" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

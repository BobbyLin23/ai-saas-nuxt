<script lang="ts" setup>
import { CircleDashed, Copy } from 'lucide-vue-next'
import type { Role } from '@prisma/client'
import { useToast } from './ui/toast'

const props = defineProps<{
  loading?: boolean
  role: Role
  src?: string
  content?: string
}>()

const { toast } = useToast()

function onCopy() {
  if (!props.content)
    return

  navigator.clipboard.writeText(props.content)
  toast({
    title: 'Copy Success',
    description: 'Message copied to clipboard.',
    duration: 3000,
  })
}
</script>

<template>
  <div :class="cn('group flex items-start gap-x-3 py-4 w-full', role === 'User' && 'justify-end')">
    <BotAvatar v-if="role !== 'User' && src " :src="src" />
    <div class="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
      <CircleDashed v-if="loading" class="animate-spin" />
      <span v-else>
        {{ content }}
      </span>
    </div>
    <UserAvatar v-if="role === 'User'" />
    <Button
      v-if="role !== 'User' && !loading"
      class="opacity-0 group-hover:opacity-100 transition"
      size="icon"
      variant="ghost"
      @click="onCopy"
    >
      <Copy class="w-4 h-4" />
    </Button>
  </div>
</template>

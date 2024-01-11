<script setup lang="ts">
import { Copy, Loader2 } from 'lucide-vue-next'
import { useToast } from './ui/toast'

const props = defineProps<{
  role: 'user' | 'function' | 'system' | 'tool' | 'assistant'
  loading?: boolean
  content?: any
}>()

const { toast } = useToast()

function onCopy() {
  if (!props.content)
    return
  navigator.clipboard.writeText(props.content)
  toast({
    description: 'Message copied to clipboard.',
    duration: 3000,
  })
}
</script>

<template>
  <div :class="cn('group flex items-start gap-x-3 py-4 w-full', role === 'user' && 'justify-end')">
    <BotAvatar v-if="role !== 'user'" />
    <div class="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
      <Loader2 v-if="loading" class="animate-spin" />
      <div v-else>
        {{ content }}
      </div>
    </div>
    <UserAvatar v-if="role === 'user'" />
    <Button
      v-if="role !== 'user' && !loading"
      class-name="opacity-0 group-hover:opacity-100 transition"
      size="icon"
      variant="ghost"
      @click="onCopy"
    >
      <Copy class-name="w-4 h-4" />
    </Button>
  </div>
</template>

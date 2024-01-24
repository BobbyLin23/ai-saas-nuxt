<script lang="ts" setup>
import { CircleDashed, Copy } from 'lucide-vue-next'

defineProps<{
  loading: boolean
  role: 'user' | 'system'
  src?: string
  content?: string
}>()
</script>

<template>
  <div :class="cn('group flex items-start gap-x-3 py-4 w-full', role === 'user' && 'justify-end')">
    <BotAvatar v-if="role !== 'user' && src " :src="src" />
    <div class="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
      <CircleDashed v-if="loading" class="animate-spin" />
      <span v-else>
        {{ content }}
      </span>
    </div>
    <UserAvatar v-if="role === 'user'" />
    <Button
      v-if="role !== 'user' && !loading"
      class="opacity-0 group-hover:opacity-100 transition"
      size="icon"
      variant="ghost"
    >
      <Copy class="w-4 h-4" />
    </Button>
  </div>
</template>

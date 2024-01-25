<script lang="ts" setup>
import type { Companion } from '@prisma/client'
import type { ChatMessageProps } from '~/types'

const props = defineProps<{
  loading: boolean
  companion: Companion
  messages: ChatMessageProps[]
}>()

const fakeLoading = ref(props.messages.length === 0)

onMounted(() => {
  const timeout = setTimeout(() => {
    fakeLoading.value = false
  }, 1000)

  return () => {
    clearTimeout(timeout)
  }
})
</script>

<template>
  <div class="flex-1 overflow-y-auto pr-4">
    <CompanionChatMessage
      :loading="fakeLoading"
      :src="companion?.src"
      role="System"
      :content="`Hello, I am ${companion?.name}, ${companion?.description}`"
    />
    <CompanionChatMessage
      v-for="message in messages"
      :key="message.content"
      :role="message.role"
      :src="companion?.src"
      :content="message.content"
    />
    <CompanionChatMessage v-if="loading" :src="companion?.src" role="System" loading />
  </div>
</template>

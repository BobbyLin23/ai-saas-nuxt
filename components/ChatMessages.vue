<script lang="ts" setup>
import type { Companion } from '@prisma/client'

const props = defineProps<{
  loading: boolean
  companion: Companion
  messages: any
}>()

const fakeLoading = computed(() => props.messages.length === 0)
</script>

<template>
  <div class="flex-1 overflow-y-auto pr-4">
    <CompanionChatMessage
      :loading="fakeLoading"
      :src="companion?.src"
      role="system"
      :content="`Hello, I am ${companion?.name}, ${companion?.description}`"
    />
  </div>
</template>

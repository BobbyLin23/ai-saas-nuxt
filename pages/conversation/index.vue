<script setup lang="ts">
import type { Conversation } from '@prisma/client'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'dashboard',
})

const router = useRouter()

const { toast } = useToast()

async function createConversation() {
  const { data, error } = await useFetch<Conversation>('/api/conversation', {
    method: 'post',
  })
  if (error.value) {
    toast({
      title: 'Error',
      description: error.value.message,
      variant: 'destructive',
    })
  }
  if (data.value)
    router.push(`/conversation/${data.value.id}`)
}
</script>

<template>
  <div class="h-full flex flex-col px-4">
    <ModelSelect />
    <div class="flex-1 overflow-y-auto">
      <div class="w-full md:max-w-2xl mx-auto flex flex-col items-center justify-center h-full">
        <div class="h-12 w-12 mb-4">
          <NuxtImg src="/logo.png" alt="logo" />
        </div>
        <div class="text-3xl font-semibold">
          How can I help you today?
        </div>
        <Button class="my-4" @click="createConversation">
          Start New Chat
        </Button>
      </div>
    </div>
  </div>
</template>

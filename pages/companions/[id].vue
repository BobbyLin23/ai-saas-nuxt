<script setup lang="ts">
import type { Companion } from '@prisma/client'
import { Edit, MoreVertical, Trash2 } from 'lucide-vue-next'
import { useCompletion } from 'ai/vue'
import { useToast } from '~/components/ui/toast'
import type { ChatMessageProps } from '~/types'

definePageMeta({
  layout: 'dashboard',
})

const route = useRoute()

const { toast } = useToast()

// const { input, isLoading, completion, handleSubmit } = useCompletion({
//   api: '/api/ai',
// })

const value = ref('')

const loading = ref(false)

const messages = ref<ChatMessageProps[]>([])

function onSubmit() {
  const userMessage: ChatMessageProps = {
    role: 'user',
    content: value.value,
  }

  messages.value.push(userMessage)

  // handleSubmit(e)
}

// fetch data
const { data: companion, error, pending } = await useFetch<Companion>(`/api/companion/${route.params.id}`, {
  method: 'get',
})

watch(error, () => {
  if (error.value) {
    toast({
      title: 'Error',
      description: error.value.message,
      variant: 'destructive',
    })
  }
})
</script>

<template>
  <div class="h-full">
    <div v-if="pending" class="h-full flex items-center justify-center">
      <LoadingState />
    </div>
    <div v-else class="p-4 pb-0 h-full flex flex-col">
      <div class="flex h-12 items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold">
            {{ companion?.name }}
          </h1>
          <p class="text-muted-foreground text-sm">
            {{ companion?.description }}
          </p>
        </div>
        <ClientOnly>
          <CompanionChatMenu :companion="companion!" />
        </ClientOnly>
      </div>
      <Separator class="w-full my-4 bg-primary/10" />
      <div class="flex flex-col space-y-2 flex-1">
        <ChatMessages :loading="loading" :companion="companion!" :messages="[]" />
        <ChatForm v-model="value" :loading="loading" @trigger="onSubmit" />
      </div>
    </div>
  </div>
</template>

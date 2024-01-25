<script setup lang="ts">
import { useCompletion } from 'ai/vue'
import { SendHorizonal } from 'lucide-vue-next'
import { useToast } from '~/components/ui/toast'
import type { ChatMessageProps, CompanionWithMessages } from '~/types'

definePageMeta({
  layout: 'dashboard',
})

const route = useRoute()
const router = useRouter()

const { toast } = useToast()

const messages = ref<ChatMessageProps[]>([])

const { input, isLoading, handleSubmit } = useCompletion({
  api: `/api/chat/${route.params.id}`,
  onFinish: (_prompt, completion) => {
    const systemMessage: ChatMessageProps = {
      role: 'System',
      content: completion,
    }

    messages.value.push(systemMessage)
    input.value = ''

    router.go(0)
  },
})

function onSubmit(e: Event) {
  const userMessage: ChatMessageProps = {
    role: 'User',
    content: input.value,
  }

  messages.value.push(userMessage)

  handleSubmit(e)
}

// fetch data
const { data: companion, error, pending } = await useFetch<CompanionWithMessages>(`/api/companion/${route.params.id}`, {
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
        <ChatMessages
          :loading="isLoading!"
          :companion="companion!"
          :messages="messages"
        />
        <form
          class="border-t border-primary/10 pt-4 flex items-center gap-x-2"
          @submit.prevent="onSubmit"
        >
          <Input
            v-model="input"
            :disabled="isLoading"
            placeholder="Type a message"
            class="rounded-lg bg-primary/10"
          />
          <Button :disabled="isLoading" variant="ghost" type="submit">
            <SendHorizonal class-name="w-6 h-6" />
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

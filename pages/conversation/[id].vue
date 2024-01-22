<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { ArrowUp, Paperclip } from 'lucide-vue-next'
import type { ChatCompletionMessage } from 'openai/resources'
import type { ChatCompletionMessageParam } from 'openai/src/resources/chat/completions'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { useToast } from '~/components/ui/toast'
import type { ConversationWithMessages } from '~/types'

definePageMeta({
  layout: 'dashboard',
})

const route = useRoute()

const { toast } = useToast()

const formSchema = toTypedSchema(z.object({
  prompt: z.string().min(1, 'prompt is required'),
}))

const form = useForm({
  validationSchema: formSchema,
})

const loading = ref(false)

const loadingIndex = ref(-1)

const messages = ref<ChatCompletionMessageParam[]>([])

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const userMessage: ChatCompletionMessageParam = {
      role: 'user',
      content: values.prompt,
    }

    const newMessage = [...messages.value, userMessage]

    messages.value.push(userMessage)
    const resMessage: ChatCompletionMessageParam = {
      role: 'assistant',
      content: '',
    }
    messages.value.push(resMessage)
    loadingIndex.value = messages.value.length - 1
    // send user message to db
    loading.value = true
    await useFetch('/api/message', {
      method: 'post',
      body: {
        role: 'user',
        content: values.prompt,
        conversationId: route.params.id as string,
      },
    })

    // get response from ai
    const res = await useFetch<ChatCompletionMessage>('/api/ai', {
      method: 'post',
      body: {
        messages: newMessage,
        conversationId: route.params.id as string,
      },
    })
    if (res.error.value) {
      toast({
        title: 'Error',
        description: res.error.value.message,
        variant: 'destructive',
      })
    }
    if (res.data.value)
      messages.value[messages.value.length - 1].content = res.data.value.content
  }
  catch (e) {
    toast({
      title: 'Error',
      description: 'Something went wrong!',
      variant: 'destructive',
    })
  }
  finally {
    loading.value = false
    form.resetForm()
  }
})

async function fetchCurrentMessage() {
  const { data, error } = await useFetch<ConversationWithMessages>(`/api/conversation/${route.params.id}`, {
    method: 'get',
  })

  if (error.value) {
    toast({
      title: 'Error',
      description: error.value.message,
      variant: 'destructive',
    })
  }

  if (data.value?.messages) {
    messages.value = data.value.messages.map((message) => {
      return {
        content: message.content,
        role: message.role,
      } as ChatCompletionMessageParam
    })
  }
}

fetchCurrentMessage()
</script>

<template>
  <div class="h-full flex flex-col px-4">
    <ModelSelect />
    <div class="flex-1 overflow-y-auto">
      <div class="w-full md:max-w-2xl mx-auto">
        <ChatMessage
          v-for="(message, index) in messages"
          :id="index"
          :key="index"
          :loading="loading"
          :role="message.role"
          :loading-index="loadingIndex"
          :content="message.content"
        />
      </div>
    </div>
    <div class="flex items-center w-full md:max-w-2xl mx-auto pb-2">
      <form class="w-full overflow-hidden border rounded-lg" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="prompt">
          <FormItem>
            <div class="relative">
              <Textarea
                class="text-base resize-none pr-10 md:pr-12 pl-10 py-2.5 w-full m-0 md:py-3.5 placeholder-black/50 dark:placeholder-white/50
                md:pl-[55px]"
                placeholder="Please input something to chat with AI"
                rows="1"
                :disabled="loading"
                v-bind="componentField"
                @keydown.enter.prevent="onSubmit"
              />
              <div class="absolute bottom-2 md:bottom-3 left-2 md:left-4">
                <Paperclip />
              </div>
              <button
                type="submit"
                :disabled="!form.values.prompt || loading"
                class="absolute bottom-1.5 md:bottom-3 right-2 md:right-3 p-0.5 border border-black
              disabled:bg-black disabled:opacity-10 disabled:text-gray-400 enabled:bg-black text-white
                rounded-lg dark:text-black dark:bg-white transition-colors"
              >
                <ArrowUp />
              </button>
            </div>
          </FormItem>
        </FormField>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { ArrowUp, Paperclip } from 'lucide-vue-next'
import type { ChatCompletionMessageParam } from 'openai/src/resources/chat/completions'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'dashboard',
})

const { toast } = useToast()

const formSchema = toTypedSchema(z.object({
  prompt: z.string().min(1, 'prompt is required'),
}))

const form = useForm({
  validationSchema: formSchema,
})

const loading = ref(false)

const messages = ref<ChatCompletionMessageParam[]>([])

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true
    const userMessage: ChatCompletionMessageParam = {
      role: 'user',
      content: values.prompt,
    }
    const newMessage = [...messages.value, userMessage]
    const res = await useFetch('/api/conversation', {
      method: 'post',
      body: {
        messages: newMessage,
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
      messages.value = newMessage.concat(res.data.value)
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
</script>

<template>
  <div class="h-full flex flex-col px-4">
    <div class="flex-1">
      <ModelSelect />
      <div class="w-full md:max-w-2xl mx-auto overflow-y-auto">
        <ChatMessage
          v-for="(message, index) in messages"
          :key="index"
          :loading="loading"
          :role="message.role"
          :content="message.content"
        />
      </div>
    </div>
    <div class="flex items-center w-full md:max-w-2xl mx-auto">
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

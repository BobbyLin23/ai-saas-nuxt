<script setup lang="ts">
import { MessageSquare } from 'lucide-vue-next'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import type { ChatCompletionMessageParam } from 'openai/src/resources/chat/completions'

import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'dashboard',
})

const { toast } = useToast()

const loading = ref(false)

const messages = ref<ChatCompletionMessageParam[]>([])

const formSchema = toTypedSchema(z.object({
  prompt: z.string().min(1, 'Prompt is required'),
}))

const form = useForm({
  validationSchema: formSchema,
})

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
      messages.value.push(res.data.value)
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
  <div>
    <TheHeading
      title="Conversation"
      description="Chat with the smartest AI"
      :icon="MessageSquare"
      icon-color="text-violet-500"
      bg-color="bg-violet-500/10"
    />
    <div class="px-4 lg:px-8">
      <div>
        <form
          class="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          @submit="onSubmit"
        >
          <FormField v-slot="{ componentField }" name="prompt">
            <FormItem class="col-span-12 lg:col-span-10">
              <FormControl>
                <Input
                  type="text"
                  class="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                  placeholder="Type something..."
                  v-bind="componentField"
                  :disabled="loading"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button
            class="col-span-12 lg:col-span-2 w-full"
            size="icon" type="submit"
            :disabled="loading"
          >
            Generate
          </Button>
        </form>
      </div>
      <div class="space-y-4 mt-4">
        <div v-if="loading" class="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
          <TheLoader />
        </div>
        <EmptyState v-if="!loading && messages.length === 0" label="No conversation started." />
        <div class="flex flex-col-reverse gap-y-4">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="cn('p-8 w-full flex items-start gap-x-8 rounded-lg',
                       message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted')"
          >
            <UserAvatar v-if="message.role === 'user'" />
            <BotAvatar v-else />
            <p class="text-sm prose">
              {{ message.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

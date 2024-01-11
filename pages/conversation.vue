<script setup lang="ts">
import { ArrowUp, Paperclip } from 'lucide-vue-next'
import type { ChatCompletionMessageParam } from 'openai/src/resources/chat/completions'

definePageMeta({
  layout: 'dashboard',
})

const loading = ref(false)

const messages = ref<ChatCompletionMessageParam[]>([])

const value = ref('')

// const onSubmit = form.handleSubmit(async (values) => {
//   try {
//     loading.value = true
//     const userMessage: ChatCompletionMessageParam = {
//       role: 'user',
//       content: values.prompt,
//     }
//     const newMessage = [...messages.value, userMessage]
//     const res = await useFetch('/api/conversation', {
//       method: 'post',
//       body: {
//         messages: newMessage,
//       },
//     })
//     if (res.error.value) {
//       toast({
//         title: 'Error',
//         description: res.error.value.message,
//         variant: 'destructive',
//       })
//     }
//     if (res.data.value)
//       messages.value.push(res.data.value)
//   }
//   catch (e) {
//     toast({
//       title: 'Error',
//       description: 'Something went wrong!',
//       variant: 'destructive',
//     })
//   }
//   finally {
//     loading.value = false
//     form.resetForm()
//   }
// })
</script>

<template>
  <div class="h-full flex flex-col px-4">
    <div class="flex-1">
      <ModelSelect />
    </div>
    <div class="flex items-center w-full md:max-w-2xl mx-auto">
      <div
        class="overflow-hidden flex flex-col w-full flex-grow relative border rounded-2xl bg-white
        dark:bg-gray-800 shadow-[0_0_0_2px_rgba(255,255,255,0.95)] dark:shadow-[0_0_0_2px_rgba(52,53,65,0.95)]
        dark:text-white [&:has(textarea:focus)]:border-muted-foreground focus-visible:outline-none
        [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] border-muted"
      >
        <textarea
          v-model="value"
          class="m-0 w-full resize-none border-0 bg-transparent py-2.5 pr-10 focus:ring-0
          focus-visible:ring-0 focus-visible:outline-none
          md:py-3.5 md:pr-12 placeholder-black/50 dark:placeholder-white/50 pl-10 md:pl-[55px]"
          rows="1"
          placeholder="Please input something to chat with AI"
        />
        <div class="absolute bottom-2 md:bottom-3 left-2 md:left-4">
          <Paperclip />
        </div>
        <button
          :disabled="value.length === 0"
          class="absolute bottom-1.5 md:bottom-3 right-2 md:right-3 p-0.5 border border-black
        disabled:bg-black disabled:opacity-10 disabled:text-gray-400 enabled:bg-black text-white
          rounded-lg dark:text-white dark:bg-white transition-colors"
        >
          <ArrowUp />
        </button>
      </div>
    </div>
  </div>
</template>

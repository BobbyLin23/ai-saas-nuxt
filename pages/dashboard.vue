<script setup lang="ts">
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
})

const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
    href: '/video',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    href: '/code',
  },
]
</script>

<template>
  <div>
    <div class="mb-8 space-y-4">
      <h2 class="text-2xl md:text-4xl font-bold text-center">
        Explore the power of AI
      </h2>
      <p class="text-muted-foreground font-light text-sm md:text-lg text-center">
        Chat with the smartest AI - Experience the power of AI
      </p>
    </div>
    <div class="px-4 md:px-20 lg:px-32 space-y-4">
      <Card
        v-for="tool in tools"
        :key="tool.label"
        class="p-4 border-black/5 flex items-center justify-between
        hover:shadow-md transition cursor-pointer"
        @click="$router.push(tool.href)"
      >
        <div class="flex items-center gap-x-4">
          <div :class="cn('p-2 w-fit rounded-md', tool.bgColor)">
            <component :is="tool.icon" :class="cn('w-8 h-8', tool.color)" />
          </div>
          <div class="font-semibold">
            {{ tool.label }}
          </div>
        </div>
        <ArrowRight class="w-5 h-5" />
      </Card>
    </div>
  </div>
</template>

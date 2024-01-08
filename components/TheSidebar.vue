<script setup lang="ts">
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from 'lucide-vue-next'

const route = useRoute()

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-700',
    href: '/video',
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-emerald-500',
    href: '/music',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    href: '/code',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
]
</script>

<template>
  <div class="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
    <div class="px-3 py-2 flex-1">
      <NuxtLink href="/dashboard" class="flex items-center pl-3 mb-14">
        <div class="relative h-8 w-8 mr-4">
          <NuxtImg src="/logo.png" alt="logo" />
        </div>
        <h1 :class="cn('text-2xl font-bold')">
          Genius
        </h1>
      </NuxtLink>
      <div class="space-y-1">
        <NuxtLink
          v-for="item in routes" :key="item.label" :to="item.href"
          :class="cn('text-sm group flex items-center p-3 font-medium cursor-pointer rounded-lg hover:text-white hover:bg-white/10 transition',
                     route.path === item.href ? 'text-white bg-white/10' : 'text-zinc-400')"
        >
          <div class="flex items-center flex-1">
            <component :is="item.icon" :class="cn('w-5 h-5 mr-3', item.color)" />
            {{ item.label }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

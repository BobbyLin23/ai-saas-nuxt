<script setup lang="ts">
const routes = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Conversations',
    href: '/conversation',
  },
  {
    label: 'Companions',
    href: '/companions',
  },
  {
    label: 'Settings',
    href: '/settings',
  },
]
</script>

<template>
  <div class="flex items-center p-4 h-16 bg-transparent border-b">
    <MobileSidebar />
    <NuxtLink href="/dashboard" class="flex items-center pl-3">
      <div class="relative h-8 w-8 mr-4">
        <NuxtImg src="/logo.png" alt="logo" />
      </div>
      <h1 :class="cn('text-2xl font-bold')">
        Genius
      </h1>
    </NuxtLink>
    <div class="flex items-center gap-x-2 ml-12 md:gap-x-4 text-muted-foreground">
      <NuxtLink
        v-for="route in routes" :key="route.label" :href="route.href"
        :class="cn('font-medium text-sm', route.href === $route.path && 'text-black dark:text-white')"
      >
        {{ route.label }}
      </NuxtLink>
    </div>
    <div class="flex w-full justify-end gap-x-2">
      <ToggleTheme />
      <UserButton />
    </div>
  </div>
</template>

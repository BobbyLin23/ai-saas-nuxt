<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="h-full relative">
    <div class="fixed w-full inset-x-0 z-50 bg-background">
      <TheNavbar />
    </div>
    <main class="pt-20 relative">
      <div class="hidden h-full md:flex md:w-72 md:fixed md:inset-y-0 md:flex-col mt-16">
        <TheSidebar />
      </div>
      <div :class="cn('pb-10 md:pl-72', route.path === '/dashboard' && 'md:pl-0')">
        <slot />
      </div>
    </main>
  </div>
</template>

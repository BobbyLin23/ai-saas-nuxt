<script setup lang="ts">

</script>

<template>
  <div
    class="h-full flex flex-col items-center justify-center space-y-4
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
    from-sky-400 to-blue-800 dark:from-neutral-700 dark:to-slate-900"
  >
    <h1 class="text-4xl font-semibold text-muted dark:text-white tracking-tight">
      Genius
    </h1>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
</script>

<template>
  <Sheet>
    <SheetTrigger>
      <Button variant="ghost" size="icon" class="md:hidden">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="p-0">
      <TheSidebar />
    </SheetContent>
  </Sheet>
</template>

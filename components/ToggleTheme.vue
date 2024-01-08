<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'
}

onMounted(() => {
  colorMode.preference = 'system'
})
</script>

<template>
  <Button variant="outline" size="icon" @click="toggleTheme">
    <Sun v-if="colorMode.preference === 'light'" class="w-4 h-4" />
    <Moon v-else class="w-4 h-4" />
  </Button>
</template>

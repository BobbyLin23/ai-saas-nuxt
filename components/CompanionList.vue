<script lang="ts" setup>
import { Contact, Plus } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col p-4 h-full">
    <TheHeading
      title="Companions"
      description="Chat with the your AI companions"
      :icon="Contact"
      icon-color="text-green-500"
      bg-color="bg-green-500/10"
    />
    <ul class="space-y-2 overflow-y-auto flex-1 mt-2">
      123
    </ul>
    <Button variant="secondary" @click="$router.push('/companions/add')">
      <Plus class="w-4 h-4 mr-2" />
      Create Companion
    </Button>
  </div>
</template>

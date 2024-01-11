<script setup lang="ts">
import { MessageSquare, Pencil, Pin, Plus, Trash } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col p-4 h-full">
    <TheHeading
      title="Conversation"
      description="Chat with the smartest AI"
      :icon="MessageSquare"
      icon-color="text-violet-500"
      bg-color="bg-violet-500/10"
    />
    <ul class="space-y-2 overflow-y-auto flex-1">
      <li class="flex items-center justify-between px-2 py-4 rounded-lg cursor-pointer group hover:bg-muted">
        <div class="flex gap-x-1 text-sm text-muted-foreground">
          <div># New Chat</div>
          <div>01-11 09:18</div>
        </div>
        <div class="text-muted-foreground gap-x-2 hidden group-hover:flex">
          <Pencil class="w-3 h-3" />
          <Pin class="w-3 h-3" />
          <Trash class="w-3 h-3" />
        </div>
      </li>
    </ul>
    <Button>
      <Plus class="w-4 h-4 mr-2" />
      New Chat
    </Button>
  </div>
</template>

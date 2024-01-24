<script lang="ts" setup>
import { CalendarDays, Contact, Plus } from 'lucide-vue-next'
import type { Companion } from '@prisma/client'
import { useToast } from './ui/toast'

const { toast } = useToast()

const dayjs = useDayjs()

const { data: companions, error, pending } = await useFetch<Companion[]>('/api/companions', {
  method: 'get',
})

watch(error, () => {
  if (error.value) {
    toast({
      title: 'Error',
      description: error.value.message,
      variant: 'destructive',
    })
  }
})
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
    <LoadingState v-if="pending" class="flex-1 flex items-center justify-center w-full" />

    <ul v-else class="space-y-2 overflow-y-auto flex-1 mt-2">
      <li v-for="item in companions" :key="item.id">
        <HoverCard>
          <HoverCardTrigger as-child>
            <NuxtLink :href="`/companions/${item.id}`">
              <Button variant="secondary" class="w-full justify-start">
                {{ item.name }}
              </Button>
            </NuxtLink>
          </HoverCardTrigger>
          <HoverCardContent side="right" class="w-80">
            <div class="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage :src="item.src" />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <div class="space-y-1">
                <h4 class="text-sm font-semibold">
                  {{ item.name }}
                </h4>
                <p class="text-sm">
                  {{ item.description }}
                </p>
                <div class="flex items-center pt-2">
                  <CalendarDays class="mr-2 h-4 w-4 opacity-70" />
                  <span class="text-muted-foreground text-xs">
                    Created on {{ dayjs(item.createdAt).format('YYYY-MM-DD') }}
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </li>
    </ul>

    <Button variant="secondary" @click="$router.push('/companions/add')">
      <Plus class="w-4 h-4 mr-2" />
      Create Companion
    </Button>
  </div>
</template>

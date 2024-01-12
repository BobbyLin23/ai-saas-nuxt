<script setup lang="ts">
import { MessageSquare, Pencil, Plus, Trash } from 'lucide-vue-next'
import type { Conversation } from '@prisma/client'
import { useToast } from './ui/toast'
import { useUpdateConversationList } from '~/stores/updateConversationList'

const { toast } = useToast()

const router = useRouter()

const dayjs = useDayjs()

const conversations = ref<Conversation[]>([])

const editNameModal = useEditNameModal()
const update = useUpdateConversationList()

async function createConversation() {
  const { data, error } = await useFetch<Conversation>('/api/conversation', {
    method: 'post',
  })
  if (error.value) {
    toast({
      title: 'Error',
      description: error.value.message,
      variant: 'destructive',
    })
  }
  if (data.value) {
    router.push(`/conversation/${data.value.id}`)
    getConversationList()
  }
}

async function getConversationList() {
  const { data, error } = await useFetch<Conversation[]>('/api/conversations', {
    method: 'get',
  })

  if (error.value) {
    toast({
      title: 'Error',
      description: error.value.message,
      variant: 'destructive',
    })
  }

  if (data.value)
    conversations.value = data.value
}

function handleEditName(id: string, name: string) {
  editNameModal.setOpen()
  editNameModal.setConversationId(id)
  editNameModal.setConversationName(name)
}

async function handleDelete(id: string) {
  const { data, error } = await useFetch(`/api/conversation/${id}`, {
    method: 'DELETE',
  })

  if (error.value) {
    toast({
      title: 'Error',
      description: error.value.message,
      variant: 'destructive',
    })
  }

  if (data.value) {
    toast({
      title: 'Success',
      description: 'Conversation deleted.',
    })
    router.push('/conversation')
    getConversationList()
  }
}

getConversationList()

watch(() => update.isUpdate, () => {
  if (update.isUpdate)
    getConversationList()
  update.setUpdate(false)
})
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
    <ul class="space-y-2 overflow-y-auto flex-1 mt-2">
      <li
        v-for="item in conversations"
        :key="item.id"
        :class="cn('flex items-center justify-between px-2 py-4 rounded-lg cursor-pointer group hover:bg-muted',
                   item.id === $route.params.id && 'bg-muted')"
        @click="router.push(`/conversation/${item.id}`)"
      >
        <div class="flex gap-x-1 text-sm text-muted-foreground items-center">
          <div>
            {{ item.name }}
          </div>
          <div>
            {{ dayjs(item.createdAt).format('MM-DD HH:mm') }}
          </div>
        </div>
        <div class="text-muted-foreground gap-x-2 hidden group-hover:flex">
          <Pencil class="w-3 h-3" @click="handleEditName(item.id, item.name)" />
          <Trash class="w-3 h-3" @click="handleDelete(item.id)" />
        </div>
      </li>
    </ul>
    <Button variant="secondary" @click="createConversation">
      <Plus class="w-4 h-4 mr-2" />
      New Chat
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useToast } from './ui/toast'
import { useUpdateConversationList } from '~/stores/updateConversationList'

const { toast } = useToast()

const editNameModal = useEditNameModal()
const update = useUpdateConversationList()

const name = ref(editNameModal.currentConversationName)

async function updateConversationName() {
  if (!name.value)
    return
  try {
    const { data, error } = await useFetch('/api/conversation/name', {
      method: 'POST',
      body: {
        name: name.value,
        conversationId: editNameModal.currentConversationId,
      },
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
        description: 'Conversation name updated.',
      })
      update.setUpdate(true)
    }
  }
  catch (e) {
    console.error(e)
  }
  finally {
    editNameModal.setClose()
  }
}
</script>

<template>
  <Dialog :open="editNameModal.isOpen" @update:open="editNameModal.setClose">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit conversation name</DialogTitle>
        <DialogDescription>
          Edit the name of your conversation.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">
            Name
          </Label>
          <Input id="name" v-model="name" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button @click="updateConversationName">
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

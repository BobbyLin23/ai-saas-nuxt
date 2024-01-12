export const useEditNameModal = defineStore('editNameModal', () => {
  const isOpen = ref(false)

  const currentConversationId = ref('')

  const currentConversationName = ref('')

  function setOpen() {
    isOpen.value = true
  }

  function setClose() {
    isOpen.value = false
  }

  function setConversationId(id: string) {
    currentConversationId.value = id
  }

  function setConversationName(name: string) {
    currentConversationName.value = name
  }

  return {
    isOpen,
    currentConversationId,
    currentConversationName,
    setClose,
    setOpen,
    setConversationId,
    setConversationName,
  }
})

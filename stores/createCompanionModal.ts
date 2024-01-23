export const useCreateCompanionModalStore = defineStore('create-companion-modal', () => {
  const isOpen = ref(false)

  function setOpen() {
    isOpen.value = true
  }

  function setClose() {
    isOpen.value = false
  }

  return {
    isOpen,
    setOpen,
    setClose,
  }
})

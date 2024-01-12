export const useUpdateConversationList = defineStore('updateConversationList', () => {
  const isUpdate = ref(false)

  function setUpdate(value: boolean) {
    isUpdate.value = value
  }

  return {
    isUpdate,
    setUpdate,
  }
})

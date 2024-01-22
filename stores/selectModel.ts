export const useSelectModelStore = defineStore('select-model', () => {
  const model = ref('gpt-3.5-turbo')

  function setModel(value: string) {
    model.value = value
  }

  return { model, setModel }
})

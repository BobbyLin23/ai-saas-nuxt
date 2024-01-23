import type { Category } from '@prisma/client'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])

  async function getCategories() {
    // const { data } = await useFetch<Category[]>('/api/categories', {
    //   method: 'get',
    // })
    // console.log(1111)
    // console.log(data.value)

    // if (data.value)
    //   categories.value = data.value
    useFetch<Category[]>('/api/categories', {
      method: 'get',
    }).then((res) => {
      if (res.data.value)
        categories.value = res.data.value
    })
  }

  return {
    categories,
    getCategories,
  }
})

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { Wand2 } from 'lucide-vue-next'
import type { Category, Companion } from '@prisma/client'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'dashboard',
})

const { toast } = useToast()

const router = useRouter()

const categoriesStore = useCategoriesStore()

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(1, {
    message: 'Description is required.',
  }),
  instructions: z.string().min(200, {
    message: 'Instructions require at least 200 characters.',
  }),
  seed: z.string().min(200, {
    message: 'Seed requires at least 200 characters.',
  }),
  src: z.string().min(1, {
    message: 'Image is required.',
  }),
  categoryId: z.string().min(1, {
    message: 'Category is required',
  }),
}))

const form = useForm({
  validationSchema: formSchema,
})

const categories = ref<Category[]>([])

const onSubmit = form.handleSubmit(async (values) => {
  const { data, error } = await useFetch <Companion>('/api/companion', {
    method: 'post',
    body: {
      name: values.name,
      description: values.description,
      instructions: values.instructions,
      categoryId: values.categoryId,
      src: values.src,
      seed: values.seed,
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
      description: 'Companion created successfully.',
    })
    router.push(`/companion/${data.value.id}`)
  }
})

categoriesStore.getCategories().then(() => {
  categories.value = categoriesStore.categories
  nextTick()
})
</script>

<template>
  <div class="p-4 min-h-full">
    <h1 class="mb-4 text-3xl font-semibold">
      Create companion
    </h1>

    <form class="space-y-4" @submit="onSubmit">
      <div class="space-y-2 w-full col-span-2">
        <div>
          <h3 class="text-lg font-medium">
            General Information
          </h3>
          <p class="text-sm text-muted-foreground">
            General information about your Companion
          </p>
        </div>
        <Separator class="bg-primary/10" />
      </div>
      <FormField v-slot="{ componentField }" name="src">
        <FormItem class="flex flex-col items-center justify-center col-span-2">
          <FormControl>
            <ImageUpload v-model="form.values.src" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div className="grid grid-cols-1 gap-4">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem class="col-span-1">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormDescription>
              This is how your AI Companion will be named.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="description">
          <FormItem class="col-span-1">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormDescription>
              Short description for your AI Companion
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="categoryId">
          <FormItem class="col-span-1">
            <FormLabel>Category</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger class="bg-background">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormDescription>
              Select a category for your AI
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div class="space-y-2 w-full">
        <div>
          <h3 class="text-lg font-medium">
            Configuration
          </h3>
          <p class="text-sm text-muted-foreground">
            Detailed instructions for AI Behaviour
          </p>
        </div>
        <Separator class="bg-primary/10" />
      </div>
      <FormField v-slot="{ componentField }" name="instructions">
        <FormItem>
          <FormLabel>Instructions</FormLabel>
          <FormControl>
            <Textarea rows="7" class="bg-background resize-none" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            Describe in detail your companion&apos;s backstory and relevant details.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="seed">
        <FormItem>
          <FormLabel>Seeds</FormLabel>
          <FormControl>
            <Textarea rows="7" class="bg-background resize-none" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            Write couple of examples of a human chatting with your AI companion, write expected answers.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button size="lg" type="submit">
        Create your companion
        <Wand2 class="w-4 h-4 ml-2" />
      </Button>
    </form>
  </div>
</template>

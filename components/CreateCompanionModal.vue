<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { Wand2 } from 'lucide-vue-next'
import { useCreateCompanionModalStore } from '~/stores/createCompanionModal'

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

const createCompanionModal = useCreateCompanionModalStore()

const onSubmit = form.handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <Dialog :open="createCompanionModal.isOpen" class="overflow-y-auto" @update:open="createCompanionModal.setClose">
    <DialogContent class="max-w-3xl mx-auto">
      <DialogHeader>
        <DialogTitle>Create AI Companion</DialogTitle>
        <DialogDescription>
          Create a new AI Companion.
        </DialogDescription>
      </DialogHeader>
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
              <ImageUpload v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem class="col-span-2 md:col-span-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="shadcn" v-bind="componentField" />
              </FormControl>
              <FormDescription>
                This is how your AI Companion will be named.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="description">
            <FormItem class="col-span-2 md:col-span-1">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input type="text" placeholder="shadcn" v-bind="componentField" />
              </FormControl>
              <FormDescription>
                Short description for your AI Companion
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="categoryId">
            <FormItem class="col-span-2 md:col-span-1">
              <FormLabel>Category</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger class="bg-background">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="m@example.com">
                      m@example.com
                    </SelectItem>
                    <SelectItem value="m@google.com">
                      m@google.com
                    </SelectItem>
                    <SelectItem value="m@support.com">
                      m@support.com
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
              <Textarea rows="2" class="bg-background resize-none" placeholder="shadcn" v-bind="componentField" />
            </FormControl>
            <FormDescription>
              Describe in detail your companion&apos;s backstory and relevant details.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="seeds">
          <FormItem>
            <FormLabel>Seeds</FormLabel>
            <FormControl>
              <Textarea rows="2" class="bg-background resize-none" placeholder="shadcn" v-bind="componentField" />
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
    </DialogContent>
  </Dialog>
</template>

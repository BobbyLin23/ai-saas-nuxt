<script setup lang="ts">
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { Github } from 'lucide-vue-next'
import { vAutoAnimate } from '@formkit/auto-animate/vue'

import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'auth',
  auth: false,
})

const router = useRouter()

const { toast } = useToast()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(6).max(32),
    name: z.string().min(3).max(32),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const loading = ref(false)

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true
    const { data, error } = await useFetch('/api/register', {
      method: 'POST',
      body: {
        email: values.email,
        password: values.password,
        name: values.name,
      },
    })
    if (data.value) {
      toast({
        title: 'Account created',
      })
      router.push('/login')
    }

    if (error.value?.message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.value.message,
      })
    }
  }
  catch (e) {
    console.error(e)
    toast({
      title: 'Error',
      description: 'Something went wrong!',
      variant: 'destructive',
    })
  }
  finally {
    loading.value = false
    form.resetForm()
  }
})
</script>

<template>
  <Card class="w-[400px]">
    <CardHeader>
      <CardTitle>Create your account</CardTitle>
      <CardDescription>to continue to Genius</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <Button variant="outline" class="w-full" :disabled="loading">
        <Github class="w-4 h-4 mr-2" />
        Continue with Github
      </Button>
      <Separator />
      <form class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem v-auto-animate>
            <FormLabel>
              Name
            </FormLabel>
            <FormControl>
              <Input placeholder="Name" :disabled="loading" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem v-auto-animate>
            <FormLabel>
              Email
            </FormLabel>
            <FormControl>
              <Input type="email" placeholder="Email" :disabled="loading" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem v-auto-animate>
            <FormLabel>
              Password
            </FormLabel>
            <FormControl>
              <Input type="password" placeholder="Password" :disabled="loading" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" class="w-full" :disabled="loading">
          Continue
        </Button>
      </form>
    </CardContent>
    <CardFooter>
      <div class="text-sm py-2">
        Already have an account?
        <NuxtLink to="/login" class="text-purple-800 hover:underline">
          Sign in
        </NuxtLink>
      </div>
    </CardFooter>
  </Card>
</template>

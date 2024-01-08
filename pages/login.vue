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

const { signIn } = useAuth()

const { toast } = useToast()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(6).max(32),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const loading = ref(false)

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: '/dashboard',
    })
    toast({
      title: 'Success',
      description: 'Sign in successful',
    })
  }
  catch (e) {
    console.error(e)
    toast({
      title: 'Error',
      description: 'Sign in failed!',
      variant: 'destructive',
    })
  }
  finally {
    loading.value = false
    form.resetForm()
  }
})

async function signInWithOAuth() {
  try {
    loading.value = true
    await signIn('github', {
      callbackUrl: '/dashboard',
    })
  }
  catch (e) {
    console.error(e)
    toast({
      title: 'Error',
      description: 'Sign in failed!',
      variant: 'destructive',
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <Card class="w-[400px]">
    <CardHeader>
      <CardTitle>Sign in</CardTitle>
      <CardDescription>to continue to ai-saas</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <Button variant="outline" class="w-full" :disabled="loading" @click="signInWithOAuth">
        <Github class="w-4 h-4 mr-2" />
        Continue with Github
      </Button>
      <Separator />
      <form class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem v-auto-animate>
            <FormLabel>
              Email
            </FormLabel>
            <FormControl>
              <Input type="email" :disabled="loading" placeholder="Email" v-bind="componentField" />
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
              <Input type="password" :disabled="loading" placeholder="Password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" class="w-full" :disabled="loading">
          Login
        </Button>
      </form>
    </CardContent>
    <CardFooter>
      <div class="text-sm py-2">
        No account?
        <NuxtLink to="/register" class="text-purple-800 hover:underline">
          Sign up
        </NuxtLink>
      </div>
    </CardFooter>
  </Card>
</template>

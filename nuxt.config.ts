import process from 'node:process'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@sidebase/nuxt-auth',
    '@nuxt/image',
    'dayjs-nuxt',
    '@pinia/nuxt',
    '@nuxtjs/cloudinary',
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  colorMode: {
    classSuffix: '',
  },
  auth: {
    provider: {
      type: 'authjs',
    },
    globalAppMiddleware: true,
  },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})

import process from 'node:process'
import GithubProvider from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { NuxtAuthHandler } from '#auth'
import { prisma } from '~/server/utils/prisma'

const config = useRuntimeConfig()

export default NuxtAuthHandler({
  // @ts-expect-error type error
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  secret: config.authSecret,
  session: {
    strategy: 'jwt',
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    Credentials.default({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials)
          return null

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!user)
          return null

        return user
      },
    }),
  ],
})

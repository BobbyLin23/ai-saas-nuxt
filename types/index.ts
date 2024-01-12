export interface Conversation {
  id: string
  name: string
  userId: string
  user: User
  messages: any
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name?: string
  email?: string
  emailVerified?: Date
  image?: string
  hashedPassword?: string
  accounts?: any
  conversations?: Conversation[]
}

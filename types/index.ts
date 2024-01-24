import type { Conversation, Message } from '@prisma/client'

export type ConversationWithMessages = Conversation & {
  messages: Message[]
}

export interface ChatMessageProps {
  role: 'system' | 'user'
  content?: string
  isLoading?: boolean
  src?: string
}

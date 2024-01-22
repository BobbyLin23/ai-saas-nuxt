import type { Conversation, Message } from '@prisma/client'

export type ConversationWithMessages = Conversation & {
  messages: Message[]
}

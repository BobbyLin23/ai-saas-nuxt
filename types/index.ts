import type {
  Companion,
  CompanionMessage,
  Conversation,
  Message,
  Role,
} from '@prisma/client'

export type ConversationWithMessages = Conversation & {
  messages: Message[]
}

export interface ChatMessageProps {
  role: Role
  content?: string
  loading?: boolean
  src?: string
}

export type CompanionWithMessages = Companion & {
  companionMessages: CompanionMessage[]
}

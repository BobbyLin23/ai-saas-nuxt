<script lang="ts" setup>
import { SendHorizonal } from 'lucide-vue-next'

const props = defineProps<{
  loading: boolean
  modelValue: string
}>()

const emits = defineEmits(['update:modelValue', 'trigger'])

function onSubmit() {
  if (!props.modelValue)
    return
  emits('trigger')
}
</script>

<template>
  <form
    class="border-t border-primary/10 pt-4 flex items-center gap-x-2"
    @submit.prevent="onSubmit"
  >
    <Input
      :disabled="loading"
      :model-value="modelValue"
      placeholder="Type a message"
      class="rounded-lg bg-primary/10"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <Button :disabled="loading" variant="ghost" type="submit">
      <SendHorizonal class-name="w-6 h-6" />
    </Button>
  </form>
</template>

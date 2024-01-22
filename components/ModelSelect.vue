<script setup lang="ts">
import { useSelectModelStore } from '~/stores/selectModel'

const selectModel = useSelectModelStore()

const models = ['gpt-turbo-3', 'gpt-4', 'bard', 'claudi', 'gemini']

function onClick(value: string) {
  selectModel.setModel(value)
}
</script>

<template>
  <Select>
    <SelectTrigger class="w-[180px]">
      <SelectValue :placeholder="selectModel.model" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Models</SelectLabel>
        <SelectItem v-for="item in models" :key="item" :value="item" @click="onClick(item)">
          {{ item }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
const value = ref('gpt-turbo-3.5')
</script>

<template>
  <Select>
    <SelectTrigger class="w-[180px]">
      <SelectValue v-model="value" placeholder="Select a model" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Models</SelectLabel>
        <SelectItem value="apple">
          gpt-turbo-3
        </SelectItem>
        <SelectItem value="banana">
          gpt-4
        </SelectItem>
        <SelectItem value="blueberry">
          bard
        </SelectItem>
        <SelectItem value="grapes">
          claudi
        </SelectItem>
        <SelectItem value="pineapple">
          gemini
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

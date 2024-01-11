<script setup lang="ts">

</script>

<template>
  <Select>
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select a model" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Models</SelectLabel>
        <SelectItem value="gpt-turbo-3">
          gpt-turbo-3
        </SelectItem>
        <SelectItem value="gpt-4">
          gpt-4
        </SelectItem>
        <SelectItem value="bard">
          bard
        </SelectItem>
        <SelectItem value="claudi">
          claudi
        </SelectItem>
        <SelectItem value="gemini">
          gemini
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

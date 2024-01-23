<script lang="ts" setup>
defineProps<{
  disabled?: boolean
  modelValue: string
}>()
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center">
    <CldUploadWidget
      v-slot="{ open }"
      :options="{
        maxFiles: 1,
      }"
      upload-preset="u7orevrh"
      :on-upload="(res:any) => {
        $emit('update:modelValue', res.value.info.secure_url)
      }"
    >
      <div class="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col items-center justify-center">
        <div class="relative h-40 w-40">
          <NuxtImg alt="Upload" :src="modelValue || '/placeholder.svg'" class="rounded-lg object-cover" @click="open" />
        </div>
      </div>
    </CldUploadWidget>
  </div>
</template>

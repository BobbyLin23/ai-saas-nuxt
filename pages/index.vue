<script setup lang="ts">
const { getSession } = useAuth()

const session = await getSession()
</script>

<template>
  <div class="p-4">
    <ToggleTheme />
    <div>
      {{ session }}
    </div>
    <div>
      <UserButton />
    </div>
  </div>
</template>

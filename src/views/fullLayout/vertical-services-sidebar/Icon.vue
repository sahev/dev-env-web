<script setup>
const props = defineProps({ icon: Object, level: Number });
</script>

<template>
  <template v-if="level > 0">
    <v-icon
      size="14"
      stroke-width="1.5"
    >{{ icon }}</v-icon>
  </template>
  <template v-else>
    <v-icon
      size="20"
      stroke-width="1.5"
    >{{ icon }}</v-icon>
  </template>
</template>

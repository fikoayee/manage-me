<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Boolean, default: true },
});
</script>
<template>
  <v-layout row v-if="props.modelValue" justify-center class="loading-container">
    <v-container>
      <v-progress-circular
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        indeterminate
        :size="90"
        :width="7"></v-progress-circular>
    </v-container>
  </v-layout>
</template>
<style>
.loading-container {
  position: fixed !important;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9999;
}
</style>

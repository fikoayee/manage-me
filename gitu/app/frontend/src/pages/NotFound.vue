<template>
    <v-empty-state
      headline="Whoops, 404"
      title="Page not found"
      text="The page you were looking for does not exist"
      image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
      action-text="Go to order"
      @click:action="onClickAction"
    ></v-empty-state>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({
    methods: {
      onClickAction() {
        this.$router.push({ name: "Landing" });
      },
    },
  });
  </script>
  <style scoped></style>
  
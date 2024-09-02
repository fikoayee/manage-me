<template>
  <Loading :modelValue="isPageLoading" />
  <v-snackbar :timeout="5000" :color="colorToast" v-model="showToast">
    {{ toastMessage }}
    <template #actions>
      <v-btn color="white" variant="text" @click="showToast = false"> x </v-btn>
    </template>
  </v-snackbar>
  <div class="bg-blue-100 h-full flex flex-col">
    <v-tabs
      v-model="tab"
      height="48"
      align-tabs="center"
      color=""
      elevation="24"
      class="bg-neutral-900 w-fit pt-1.5 mb-2 rounded-[24px] mx-auto"
    >
      <div class="flex w-full">
        <div class="ml-1.5">
          <v-chip
            :value="3"
            :variant="tab === 1 ? 'tonal' : 'text'"
            :color="tab === 1 ? 'purple-accent-1' : 'black'"
            class="tab-chip text-white px-8"
            density="comfortable"
            size="large"
            @click="tab = 1"
          >
            Overview</v-chip
          >
        </div>
        <div class="flex justify-center">
          <v-chip
            :value="3"
            :variant="tab === 2 ? 'tonal' : 'text'"
            :color="tab === 2 ? 'purple-accent-1' : 'black'"
            class="tab-chip mr-1.5 text-white px-8"
            density="comfortable"
            size="large"
            @click="tab = 2"
          >
            Stories</v-chip
          >
        </div>
        <div class="flex justify-center">
          <v-chip
            :value="3"
            :variant="tab === 3 ? 'tonal' : 'text'"
            :color="tab === 3 ? 'purple-accent-1' : 'black'"
            class="tab-chip mr-1.5 text-white px-8"
            density="comfortable"
            size="large"
            @click="tab = 3"
          >
            Tasks</v-chip
          >
        </div>
      </div>
    </v-tabs>
    <div id="tab-container" class="bg-red-200 flex-1">
      <v-table theme="dark">
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Description</th>
            <th class="text-left">Priority</th>
            <th class="text-left">Date</th>
            <th class="text-left">Status</th>
            <th class="text-left">Owner</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tasks" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.name }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Loading from "../components/Loading.vue";
import BtnStatus from "../components/BtnStatus.vue";
export default defineComponent({
  components: { Loading, BtnStatus },
  props: {},
  setup() {},
  data() {
    return {
      toastMessage: "",
      showToast: false,
      colorToast: "red",
      isPageLoading: true,
      tab: 1,
    };
  },
  computed: {},
  methods: {
    createToast(message: string, type?: "success" | "error") {
      this.toastMessage = message;
      this.showToast = true;
      this.colorToast = type === "success" ? "#34d19a" : "red-accent-2";
    },
  },
  async mounted() {
    this.isPageLoading = false;
  },
});
</script>
<style scoped>
.story-item {
  cursor: pointer;
}
.story-item:hover {
  filter: brightness(0.95);
}
::-webkit-scrollbar {
  width: 13px;
  pointer-events: all;
}

::-webkit-scrollbar-track {
  box-shadow: inset 10 10 10px 10px transparent;
  border: solid 4px transparent;
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0px 0px 10px 10px #d4d4d4;
  border: solid 4px transparent;
  border-radius: 100px;
}
</style>

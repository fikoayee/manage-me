<template>
  <div class="">
    <v-menu v-model="menuIsOpen">
      <template v-slot:activator="{ props }">
        <v-btn
             :disabled="isAvailable"
          v-bind="props"
          :color="currentStatus.color"
          class="w-[90px]"
          size="small"
        >
          {{ currentStatus.name }}
          <i
            class="fa-solid fa-play fa-xs ml-1 pb-0.5"
            :class="menuIsOpen ? 'fa-rotate-90' : `fa-rotate-120 pt-1`"
          ></i>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(status, index) in statuses"
          :key="index"
          :value="index"
          class="overflow-hidden"
        >
          <v-btn
            v-if="currentStatus.name !== status.name"
            class="w-full"
            size="small"
            :color="status.color"
            @click="handleSelect(status)"
            >{{ status.name }}</v-btn
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { STATUSES } from "../constants/status.data.ts";

interface IStatus {
  name: string;
  color: string;
}

export default defineComponent({
  props: ["taskStatus", "taskId", "isAvailable"],
  data: () => {
    return {
      currentStatus: STATUSES.TODO,
      statuses: STATUSES,
      menuIsOpen: false,
    };
  },
  methods: {
    handleSelect(selectedStatus: any) {
      this.currentStatus = selectedStatus;
      this.$emit("changeStatus", this.currentStatus, this.taskId);
    },
    setPriorityStyle(statusName: string) {
      switch (statusName) {
        case STATUSES.TODO.name:
          return STATUSES.TODO;
        case STATUSES.DOING.name:
          return STATUSES.DOING;
        case STATUSES.DONE.name:
          return STATUSES.DONE;
      }
    },
  },
  mounted() {
    this.currentStatus =
      this.setPriorityStyle(this.taskStatus) || STATUSES.TODO;
  },
});
</script>
<style scoped>
.v-list-item--density-default:not(.v-list-item--nav).v-list-item--one-line {
  padding-inline: 0;
}
.v-list-item--density-default.v-list-item--one-line {
  padding-top: 0;
  padding-bottom: 0;
}
.v-list-item--density-default.v-list-item--one-line {
  min-height: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.v-menu > .v-overlay__content > .v-card,
.v-menu > .v-overlay__content > .v-sheet,
.v-menu > .v-overlay__content > .v-list {
  padding-top: 0;
  padding-bottom: 0;
}
</style>

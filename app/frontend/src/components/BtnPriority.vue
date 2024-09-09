<template>
  <div class="">
    <v-menu v-model="menuIsOpen">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          variant="tonal"
          :color="currentPriority.color"
          class="w-[90px]"
          size="small"
        >
          {{ currentPriority.name }}
          <i
            class="fa-solid fa-play fa-xs ml-1 pb-0.5"
            :class="menuIsOpen ? 'fa-rotate-90' : `fa-rotate-120 pt-1`"
          ></i>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(priority, index) in priorities"
          :key="index"
          :value="index"
          class="overflow-hidden"
        >
          <v-btn
            v-if="currentPriority.name !== priority.name"
            class="w-full"
            size="small"
            variant="tonal"
            :color="priority.color"
            @click="handleSelect(priority)"
            >{{ priority.name }}</v-btn
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PRIORITIES } from "../constants/priority.data.ts";

interface IPriority {
  name: string;
  color: string;
}

export default defineComponent({
  props: ["taskPriority"],
  data: () => {
    return {
      currentPriority: PRIORITIES.HIGH,
      priorities: PRIORITIES,
      menuIsOpen: false,
    };
  },
  methods: {
    handleSelect(selectedPriority: any) {
      this.currentPriority = selectedPriority;
      this.$emit("changePriority", this.currentPriority);
    },
    setPriorityStyle(priorityName: string) {
      switch (priorityName) {
        case PRIORITIES.LOW.name:
          return PRIORITIES.LOW;
        case PRIORITIES.MEDIUM.name:
          return PRIORITIES.MEDIUM;
        case PRIORITIES.HIGH.name:
          return PRIORITIES.HIGH;
      }
    },
  },
  mounted() {
    this.currentPriority =
      this.setPriorityStyle(this.taskPriority) || PRIORITIES.HIGH;
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

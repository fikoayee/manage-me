<template>
  <Loading :modelValue="isPageLoading" />
  <v-snackbar :timeout="5000" :color="colorToast" v-model="showToast">
    {{ toastMessage }}
    <template #actions>
      <v-btn color="white" variant="text" @click="showToast = false"> x </v-btn>
    </template>
  </v-snackbar>
  <v-container fluid class="flex-col flex h-full bg-red">
    <v-row class="flex flex-col">
      <v-col>asda</v-col>
      <v-col>asda</v-col>
      <v-col>asda</v-col>
    </v-row>
    <div class="bg-blue h-full flex flex-col">
      <v-col class="bg-green flex-1">asdasd</v-col>
    </div>
    <!-- <Loading :modelValue="isPageLoading" />
    <v-snackbar :timeout="5000" :color="colorToast" v-model="showToast">
      {{ toastMessage }}
      <template #actions>
        <v-btn color="white" variant="text" @click="showToast = false">
          x
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog id="story-dialog" v-model="storyVisible" width="auto" persistent>
      <v-card width="800px" theme="dark" class="px-4 pt-2" rounded="xl">
        <v-card-title class="flex mb-2">
          <div class="flex">
            <v-chip rounded="lg"
              >Tutaj dam project name i tyle raz dwa trzy</v-chip
            >
            <v-chip rounded="lg" color="pink" variant="elevated" class="ml-auto"
              >DOING</v-chip
            >
          </div>
        </v-card-title>
        <div class="flex">
          <v-text-field
            v-if="editName"
            label="Name"
            rounded="lg"
            variant="outlined"
          ></v-text-field>
          <p v-if="!editName" class="text-xl mb-4 px-4">
            Tytul Tytul Tytul Tytul Tytul Tytul Tytul Tytul Tytul Tytul Tytul
            Tytul
            <v-btn
              v-if="!editName"
              variant="text"
              icon="mdi mdi-pencil-outline"
              class="ma-0 pa-0"
              density="compact"
              @click="editName = true"
            >
            </v-btn>
          </p>
          <v-btn
            v-if="editName"
            icon="mdi mdi-undo"
            variant="text"
            class=""
            @click="editName = false"
          />
          <v-btn
            v-if="editName"
            icon="mdi mdi-content-save-outline"
            variant="text"
            @click="editName = false"
          />
        </div>

        <v-row>
          <v-col class="mb-6 flex ma-0 pa-0 pl-5" cols="12">
            <v-col cols="4" class="flex"
              ><v-icon icon="mdi mdi-flag-variant mr-0.5" />Priority
              <BtnStatus class="mr-2 ml-2"
            /></v-col>
            <v-col cols="4" class=""
              ><v-icon icon="mdi mdi-account" /><span class="mr-2">Owner:</span>
              Filip Dziubek</v-col
            >
            <v-col cols="4"
              ><v-icon icon="mdi mdi-calendar-start-outline mr-1" /><span
                class="mr-2"
                >Create Date:</span
              >2023-09-21</v-col
            >
          </v-col>
        </v-row>
        <v-textarea
          label="Description"
          rounded="lg"
          rows="6"
          variant="outlined"
          :noResize="true"
        ></v-textarea>
        <p class="mb-1 ml-1">Tasks:</p>
        <div class="max-h-60 overflow-y-scroll">
          <v-card v-for="i in 14" color="#171717" class="flex mb-1 story-item"
            ><div class="flex my-1.5 items-center pl-2.5">
              Nazwa taska raz dwa
              <v-avatar
                color="surface-variant"
                size="30"
                class="ml-auto mx-2"
              ></v-avatar
              ><BtnStatus class="mx-2" /><BtnStatus class="mx-2" /></div
          ></v-card>
        </div>
        <template v-slot:actions>
          <v-btn class="" text="Cancel" @click=""></v-btn>
          <v-btn class="ms-auto" text="Create" @click=""></v-btn>
        </template>
      </v-card>
    </v-dialog>

    <v-row justify="center">
      <v-col cols="auto">
        <v-tabs
          v-model="tab"
          height="48"
          align-tabs="center"
          color=""
          elevation="24"
          class="bg-neutral-900 w-fit pt-1.5 mb-2 rounded-[24px]"
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
      </v-col>
    </v-row>
    <div v-if="tab === 1">
      <v-row><v-col class="bg-blue"> asda </v-col></v-row>
    </div>
    <div v-if="tab === 2">
      <v-row class="" no-gutters>
        <v-col cols="12" class="flex">
          <div class="flex">
            <div
              class="bg-pink w-fit px-6 h-8 flex items-center justify-center font-[500] rounded-t-lg cursor-default ml-1"
            >
              DOING
            </div>
          </div>
          <p class="text-xs font-[500] text-neutral-200 mr-[35px] pt-2 ml-auto">
            ASSIGNEE
          </p>
          <p class="text-xs font-[500] text-neutral-200 mr-[67px] pt-2">
            CREATE
          </p>
          <p class="text-xs font-[500] text-neutral-200 mr-[32px] pt-2">
            PRIORITY
          </p>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" class=""
          ><v-card theme="dark" class="story-item" rounded="lg" elevation="4">
            <div class="flex items-center">
              <div class="min-h-3 min-w-3 bg-green m-4 rounded-[4px]"></div>
              <p class="line-clamp-1 pr-2">
                Jakis tam tekst pozdro raz dwa trzy hehehehe Jakis tam tekst
                pozdro raz dwa trzy hehehehe trzy hehehehe Jakis tam tekst
                pozdro raz dwa trzy hehehehe trzy hehehehe Jakis tam tekst
                pozdro raz dwa trzy hehehehe
              </p>
              <v-btn
                icon="mdi mdi-information-variant"
                class="ml-auto mr-2"
                color=""
                variant="plain"
              ></v-btn>
              <v-avatar
                color="surface-variant"
                size="30"
                class="mr-4"
              ></v-avatar>
              <p class="mr-4 min-w-28 text-center text-sm">2023-09-21</p>
              <BtnStatus class="mr-2" />
            </div> </v-card
        ></v-col>
      </v-row>
    </div>
    <div class="bg-blue flex-1">asd</div>
    <div v-if="tab === 3" class="flex-col bg-yellow">
      <v-row class="flex-1" justify="center" align="center">
        <v-col cols="4" class="bg-red">To Do</v-col>
        <v-col cols="4" class="bg-blue">Doing</v-col>
        <v-col cols="4" class="bg-green">Done</v-col>
      </v-row>
    </div> -->
  </v-container>
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
      editName: false,
      isPageLoading: true,
      storyVisible: false,
      tab: 1,
      projectBody: { id: null, name: "", description: "" },
      mockProject: [
        {
          id: 1,
          name: "Drugi projekt",
          description:
            "Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue.",
        },
      ],
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

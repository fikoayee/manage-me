<template>
  <Loading :modelValue="isPageLoading" />
  <v-snackbar :timeout="5000" :color="colorToast" v-model="showToast">
    {{ toastMessage }}
    <template #actions>
      <v-btn color="white" variant="text" @click="showToast = false"> x </v-btn>
    </template>
  </v-snackbar>
  <v-dialog id="task-dialog" v-model="taskVisible" width="auto" persistent>
    <v-card width="800px" theme="dark" class="px-4 pt-2" rounded="xl">
      <v-card-title class="flex mb-2">
        <div class="flex">
          <v-chip rounded="lg">project id:{{ id }}</v-chip>

          <BtnStatus
            class="ml-auto"
            :taskStatus="taskBody.status"
            @changeStatus="onStatusChangeTaskDialog"
          />
        </div>
      </v-card-title>
      <div class="flex">
        <v-form v-model="valid" class="w-full">
          <v-text-field
            :rules="[rules.nameMinMaxLength]"
            v-model="taskBody.name"
            label="Name"
            rounded="lg"
            variant="outlined"
          ></v-text-field>
        </v-form>
      </div>

      <v-row>
        <v-col class="mb-6 flex ma-0 pa-0 pl-5" cols="12">
          <v-col cols="4" class="flex"
            ><v-icon icon="mdi mdi-flag-variant mr-0.5" />Priority
            <BtnPriority
              class="mx-2"
              :taskPriority="taskBody.priority"
              @changePriority="onPriorityChangeTaskDialog"
            />
          </v-col>
          <v-col cols="4" class=""
            ><v-icon icon="mdi mdi-account" /><span class="mr-2">Owner:</span>
            {{ taskBody.ownerInfo[0].email }}</v-col
          >
          <v-col cols="4"
            ><v-icon icon="mdi mdi-calendar-start-outline mr-1" /><span
              class="mr-2"
              >Create Date:</span
            >{{ formatDate(taskBody.dateCreate, "dd - MM - yy") }}</v-col
          >
        </v-col>
      </v-row>
      <v-textarea
        v-model="taskBody.description"
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
            ></v-avatar></div
        ></v-card>
      </div>
      <template v-slot:actions>
        <v-btn class="" text="Cancel" @click="onCloseTask"></v-btn>
        <v-btn
          class="ms-auto"
          text="Create"
          :disabled="!valid"
          @click="
            taskBody._id
              ? handleTaskUpdate(taskBody._id, taskBody)
              : handleTaskCreate(taskBody)
          "
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
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
    <v-btn @click="taskVisible = true">Create</v-btn>
    <div id="tab-container" class="bg-red-200 flex-1">
      <v-table theme="dark" :key="tableKey">
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
        <tbody class="">
          <tr
            v-for="item in mappedTasks"
            :key="item._id"
            class="hover:bg-neutral-800"
            @click="handleOpenTask(item)"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>
              <BtnPriority
                class="mx-2"
                :taskPriority="item.priority"
                :taskId="item._id"
                @changePriority="onPriorityChangeTask"
              />
            </td>

            <td>{{ formatDate(item.dateCreate, "d MMMM yyyy") }}</td>
            <td>
              <BtnStatus
                class=""
                :taskStatus="item.status"
                :taskId="item._id"
                @changeStatus="onStatusChangeTask"
              />
            </td>

            <td>
              <v-avatar
                :color="item.ownerInfo[0].color"
                class="text-xl capitalize"
              >
                {{ item.ownerInfo[0].email[0] }}
              </v-avatar>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTask } from "../composables/useTask.ts";
import { useUser } from "../composables/useUser.ts";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import Loading from "../components/Loading.vue";
import BtnPriority from "../components/BtnPriority.vue";
import BtnStatus from "../components/BtnStatus.vue";
export default defineComponent({
  components: { Loading, BtnPriority, BtnStatus },
  props: {
    id: { type: String, required: true },
  },
  setup() {
    const { getProjectTasks, patchTask, addTask } = useTask();
    const { getUser, getUsers } = useUser();
    return { getProjectTasks, getUser, patchTask, getUsers, addTask };
  },
  data() {
    return {
      tableKey: 0,
      valid: false,
      tasks: [],
      mappedTasks: [],
      users: [],
      toastMessage: "",
      showToast: false,
      colorToast: "red",
      isPageLoading: true,
      tab: 1,
      taskVisible: false,
      selectedTask: null,
      selectedTaskBody: null,
      taskBody: {
        id: null,
        name: "",
        description: "",
        dateCreate: "",
        ownerInfo: null,
        owner: "",
        priority: "",
        project: "",
        status: "",
      },
      rules: {
        nameMinMaxLength: (value: string) => {
          const trimmedValue = value.trim();
          const pattern = /^[A-Za-z0-9\s\W]{3,64}$/;
          return (
            pattern.test(trimmedValue) ||
            "The input must be between 3 and 64 characters long."
          );
        },
      },
    };
  },

  computed: {},
  methods: {
    onStatusChangeTaskDialog(newStatus: any) {
      this.taskBody.status = newStatus.name;
    },
    onPriorityChangeTaskDialog(newPriority: any) {
      this.taskBody.priority = newPriority.name;
    },
    async onStatusChangeTask(newStatus: any, taskId: string) {
      const body = { status: newStatus.name };
      const response = await this.handleTaskUpdate(taskId, body);
      console.log(response);
      if (response) {
        this.createToast("Task status has been changed", "success");
      }
    },
    async onPriorityChangeTask(newPriority: any, taskId: string) {
      const body = { priority: newPriority.name };
      const response = await this.handleTaskUpdate(taskId, body);
      console.log(response);
      if (response) {
        this.createToast("Task priority has been changed", "success");
      }
    },

    async onCloseTask() {
      this.taskVisible = false;
      await new Promise((resolve) => setTimeout(resolve, 300));
      this.selectedTaskBody = null
      this.selectedTask = null;
    },
    handleOpenTask(selectedTask?: any) {
      console.log(selectedTask);
      this.selectedTaskBody = selectedTask;
      selectedTask ? (this.taskBody = { ...selectedTask }) : null;
      this.taskVisible = true;
    },
    async handleTaskCreate(taskBody: any) {
      console.log(taskBody);
      try {
        const response: any = await this.addTask(taskBody);
        console.log(response);
        if (response) {
          this.createToast("Success! Task has been created", "success");
          // this.mappedTasks.push(task);
          // this.tableKey += 1;
          this.onCloseTask();
          return;
        }
        this.createToast(
          "Something went wrong, while creating task. Please try again later..."
        );
        return response;
      } catch (err) {
        console.log(err);
        this.createToast(
          "Something went wrong, could not create task. Please try again later..."
        );
      }
    },
    async handleTaskUpdate(taskId: string, taskBody: any) {
      try {
        const response: any = await this.patchTask(taskId, taskBody);
        if (response) {
          this.createToast("Success! Task has been updated", "success");
          let task = this.mappedTasks.find((task) => task._id === taskId);
          Object.assign(task, taskBody);
          this.tableKey += 1;
          this.onCloseTask();
          return;
        }
        this.createToast(
          "Something went wrong, while updating task. Please try again later..."
        );
        return response;
      } catch (err) {
        console.log(err);
        this.createToast(
          "Something went wrong, could not update task. Please try again later..."
        );
      }
    },
    formatDate(dateString, formatType: string) {
      const date = new Date(dateString);
      return format(date, formatType, { locale: enUS });
    },
    async mapTaskList() {
      for (const task of this.tasks) {
        task.ownerInfo = await this.getUserInfo(task.owner);
        this.mappedTasks.push(task);
      }
    },
    async getUserInfo(userId: string) {
      try {
        const response: any = await this.getUser(userId);
        console.log(response);
        return response;
      } catch (err) {
        console.log(err);
      }
    },
    async getTasksList() {
      try {
        const response: any[] = await this.getProjectTasks(this.id);
        if (!response || response?.length === 0) {
          return [];
        }
        return response;
      } catch (error) {
        console.log(error);
        this.createToast(
          "Something went wrong, could not get tasks. Please try again later..."
        );
        return [];
      }
    },
    async getUserList() {
      try {
        const response: any = await this.getUsers();
        if (!response || response?.length === 0) {
          return [];
        }
        return response;
      } catch (err) {
        console.log(err);
        this.createToast(
          "Something went wrong, could not get the list of users."
        );
        return [];
      }
    },
    createToast(message: string, type?: "success" | "error") {
      this.toastMessage = message;
      this.showToast = true;
      this.colorToast = type === "success" ? "#34d19a" : "red-accent-2";
    },
  },
  async mounted() {
    this.tasks = await this.getTasksList();
    this.mapTaskList();
    console.log(this.tasks);
    this.isPageLoading = false;
    this.users = await this.getUserList();
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

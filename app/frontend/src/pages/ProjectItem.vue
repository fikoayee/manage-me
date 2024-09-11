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
            :isAvailable="!validatePrivileges(taskBody.owner)"
            @changeStatus="onStatusChangeTaskDialog"
          />
        </div>
      </v-card-title>
      <div class="flex">
        <v-form v-model="valid" class="w-full">
          <v-text-field
            :disabled="!validatePrivileges(taskBody.owner)"
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
              :isAvailable="!validatePrivileges(taskBody.owner)"
              @changePriority="onPriorityChangeTaskDialog"
            />
          </v-col>
          <v-col cols="4" class=""
            ><v-icon icon="mdi mdi-account" /><span class="mr-2">Owner:</span>
            {{ taskBody?.ownerInfo ? taskBody?.ownerInfo[0].email : "" }}
          </v-col>
          <v-col cols="4"
            ><v-icon icon="mdi mdi-calendar-start-outline mr-1" /><span
              class="mr-2"
              >Create Date:</span
            >
            {{
              taskBody?.dateCreate
                ? formatDate(taskBody?.dateCreate, "dd - MM - yy")
                : ""
            }}
          </v-col>
        </v-col>
      </v-row>
      <v-textarea
        :disabled="!validatePrivileges(taskBody.owner)"
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
          :text="taskBody._id ? 'Edit' : 'Create'"
          :disabled="!valid || !validatePrivileges(taskBody.owner)"
          @click="
            taskBody.id
              ? handleTaskUpdate(taskBody._id, taskBody)
              : handleTaskCreate(taskBody)
          "
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
  <div class="h-full flex flex-col px-4">
    <div>
      <v-tabs
        v-model="tab"
        height="48"
        align-tabs="center"
        color=""
        elevation="24"
        class="bg-neutral-900 w-fit pt-1.5 mb-2 rounded-[24px] mx-auto mt-2"
      >
        <div class="flex w-full">
          <div class="ml-1.5">
            <v-chip
              :value="1"
              :variant="tab === 1 ? 'tonal' : 'text'"
              :color="tab === 1 ? 'purple-accent-1' : 'black'"
              class="tab-chip text-white px-8"
              density="comfortable"
              size="large"
              @click="tab = 1"
            >
              Tasks</v-chip
            >
          </div>
          <div class="flex justify-center">
            <v-chip
              :value="2"
              :variant="tab === 2 ? 'tonal' : 'text'"
              :color="tab === 2 ? 'purple-accent-1' : 'black'"
              class="tab-chip mr-1.5 text-white px-8"
              density="comfortable"
              size="large"
              @click="tab = 2"
            >
              Subtasks</v-chip
            >
          </div>
        </div>
      </v-tabs>
    </div>
    <div v-if="tab === 1" class="">
      <v-card class="h-4 rounded-b-0 rounded-t-xl" theme="dark" flat></v-card>
      <v-table theme="dark" :key="tableKey" class="">
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
                :isAvailable="!validatePrivileges(item.owner)"
                @changePriority="onPriorityChangeTask"
              />
            </td>

            <td>{{ formatDate(item.dateCreate, "d MMMM yyyy") }}</td>
            <td>
              <BtnStatus
                class=""
                :taskStatus="item.status"
                :taskId="item._id"
                :isAvailable="!validatePrivileges(item.owner)"
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
      <v-card class="h-4 rounded-b-xl rounded-t-0" theme="dark" flat></v-card>
    </div>
    <div v-if="tab === 2" class="h-full flex flex-col">
      <v-row no-gutters>
        <v-col v-for="column in columns" :key="column.id" cols="4" class="px-1">
          <v-card :title="column.title" theme="dark" class="mb-2"></v-card>
          <div class="h-full bg-[#303030] py-1 px-1 rounded-lg">
            <!-- Użycie VueDraggableNext dla każdej kolumny -->
            <VueDraggableNext
              :animation="200"
              ghost-class="ghost-card"
              group="tasks"
              :list="getSubtasksByStatus(column.status)"
            >
              <v-card
                v-for="item in getSubtasksByStatus(column.status)"
                :key="item._id"
                theme="dark"
                class="mb-2"
              >
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-subtitle>{{ item.description }}</v-card-subtitle>
                <v-card-text>
                  <div class="flex items-center space-x-2 overflow-hidden">
                    <BtnPriority
                      class=""
                      :taskPriority="item.priority"
                      :taskId="item._id"
                      :isAvailable="true"
                      @changePriority="changeTest(item._id)"
                    />
                    <v-avatar color="red" class="text-xl capitalize">
                      {{ item.assignedUserInitial }}
                    </v-avatar>
                    <!-- <p class="ml-auto">{{ formatDate(item.time) }}</p> -->
                    <p class="ml-auto">asd</p>
                  </div>
                </v-card-text>
              </v-card>
            </VueDraggableNext>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTask } from "../composables/useTask.ts";
import { useUser } from "../composables/useUser.ts";
import { useAuth } from "../composables/useAuth.ts";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import Loading from "../components/Loading.vue";
import BtnPriority from "../components/BtnPriority.vue";
import BtnStatus from "../components/BtnStatus.vue";
import { VueDraggableNext } from "vue-draggable-next";

export default defineComponent({
  components: { Loading, BtnPriority, BtnStatus, VueDraggableNext },
  props: {
    id: { type: String, required: true },
  },
  setup() {
    const { getProjectTasks, patchTask, addTask } = useTask();
    const { getUser, getUsers } = useUser();
    const { getAuthUser } = useAuth();
    return {
      getProjectTasks,
      getUser,
      patchTask,
      getUsers,
      addTask,
      getAuthUser,
    };
  },
  data() {
    return {
      currentUser: "",
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
        id: "",
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
      subtasks: [
        {
          _id: "1",
          name: "Subtask 1",
          description: "Opis subtaska 1",
          priority: "LOW",
          task: "1",
          time: "2024-09-12T10:00:00",
          status: "TODO",
          assignedUserInitial: "A",
        },
        {
          _id: "2",
          name: "Subtask 2",
          description: "Opis subtaska 2",
          priority: "MEDIUM",
          task: "1",
          time: "2024-09-13T10:00:00",
          status: "IN_PROGRESS",
          assignedUserInitial: "B",
        },
        {
          _id: "3",
          name: "Subtask 3",
          description: "Opis subtaska 3",
          priority: "HIGH",
          task: "1",
          time: "2024-09-14T10:00:00",
          status: "DONE",
          assignedUserInitial: "C",
        },
        {
          _id: "4",
          name: "Subtask 4",
          description: "Opis subtaska 4",
          priority: "LOW",
          task: "2",
          time: "2024-09-15T10:00:00",
          status: "TODO",
          assignedUserInitial: "D",
        },
      ],

      columns: [
        { id: 1, title: "To Do", status: "TODO" },
        { id: 2, title: "In Progress", status: "IN_PROGRESS" },
        { id: 3, title: "Done", status: "DONE" },
      ],
    };
  },

  computed: {},
  methods: {
    validatePrivileges(ownerId: string) {
      if (!ownerId) {
        return true;
      }

      return (
        this.currentUser.role === "admin" || this.currentUser._id === ownerId
      );
    },
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
      this.selectedTaskBody = null;
      this.selectedTask = null;
      this.taskBody = {
        id: "",
        name: "",
        description: "",
        dateCreate: "",
        ownerInfo: null,
        owner: "",
        priority: "",
        project: "",
        status: "",
      };
    },
    handleOpenTask(selectedTask?: any) {
      console.log(selectedTask);
      this.selectedTaskBody = selectedTask;
      selectedTask
        ? (this.taskBody = { ...selectedTask })
        : {
            id: null,
            name: "",
            description: "",
            dateCreate: "",
            ownerInfo: null,
            owner: "",
            priority: "",
            project: "",
            status: "",
          };
      this.taskVisible = true;
    },
    async handleTaskCreate(taskBody: any) {
      taskBody.project = this.id;
      taskBody.owner = this.currentUser._id;
      try {
        const response: any = await this.addTask(taskBody);
        console.log(response);
        if (response) {
          const newTask = response.data;
          newTask.ownerInfo = await this.getUserInfo(response.data.owner);
          console.log(newTask);
          this.mappedTasks.push(newTask);
          this.tableKey += 1;
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

    // subtasks
    getSubtasksByStatus(status: any) {
      return this.subtasks.filter((subtask) => subtask.status === status);
    },
    changeTest(subtaskId, newPriority) {
      const subtask = this.subtasks.find((item) => item._id === subtaskId);
      if (subtask) {
        subtask.priority = newPriority;
      }
    },
  },
  async mounted() {
    this.tasks = await this.getTasksList();
    this.mapTaskList();
    console.log(this.tasks);
    this.isPageLoading = false;
    this.users = await this.getUserList();
    this.currentUser = this.getAuthUser();
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
/* subtasks */
.ghost-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}
</style>

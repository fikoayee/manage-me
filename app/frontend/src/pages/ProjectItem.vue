<template>
  <Loading :modelValue="isPageLoading" />
  <v-snackbar :timeout="5000" :color="colorToast" v-model="showToast">
    {{ toastMessage }}
    <template #actions>
      <v-btn color="white" variant="text" @click="showToast = false"> x </v-btn>
    </template>
  </v-snackbar>
  <!-- subtask vvv -->
  <v-dialog
    id="subtask-dialog"
    v-model="subtaskVisible"
    width="auto"
    persistent
  >
    <v-card width="800px" theme="dark" class="px-4 pt-2" rounded="xl">
      <v-card-title class="flex mb-2">
        <div class="flex overflow-hidden">
          <v-select
            v-model="subtaskBody.task"
            class="mt-3"
            label="select task"
            density="compact"
            rounded="lg"
            :max-width="600"
            :items="mappedTasks"
            item-title="name"
            item-value="_id"
            variant="outlined"
          >
          </v-select>
          <BtnStatus
            class="ml-auto mt-3"
            :taskStatus="subtaskBody.status"
            @changeStatus="onStatusChangeSubtaskDialog"
          />
        </div>
      </v-card-title>
      <div class="flex">
        <v-form v-model="valid" class="w-full">
          <v-text-field
            :rules="[rules.nameMinMaxLength]"
            v-model="subtaskBody.name"
            label="Name"
            rounded="lg"
            variant="outlined"
          ></v-text-field>
        </v-form>
      </div>

      <v-row>
        <v-col class="flex ma-0 pa-0 pl-5" cols="12">
          <v-col cols="4" class="flex"
            ><v-icon icon="mdi mdi-flag-variant mr-0.5" />Priority
            <BtnPriority
              class="mx-2"
              :taskPriority="subtaskBody.priority"
              @changePriority="onPriorityChangeSubtaskDialog"
            />
          </v-col>

          <v-col cols="4"
            ><v-icon icon="mdi mdi-calendar-start-outline mr-1" /><span
              class="mr-2"
              >Start Date:</span
            >
            {{
              subtaskBody?.dateStart
                ? formatDate(subtaskBody?.dateCreate, "dd - MM - yy")
                : ""
            }}
          </v-col>
          <v-col cols="4"
            ><v-icon icon="mdi mdi-calendar-start-outline mr-1" /><span
              class="mr-2"
              >End Date:</span
            >
            {{
              subtaskBody?.dateEnd
                ? formatDate(subtaskBody?.dateCreate, "dd - MM - yy")
                : ""
            }}
          </v-col>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mb-6 flex ma-0 pa-0 pl-5" cols="12">
          <v-col cols="4" class="flex"
            ><v-icon icon="mdi mdi-clock-time-eight-outline mr-0.5 mt-2" /><span
              class="mt-2"
              >Time:</span
            >
            <v-select
              v-model="subtaskBody.time"
              label="time"
              density="compact"
              rounded="lg"
              class="ml-4"
              :max-width="100"
              :items="[
                '1',
                '2',
                '4',
                '6',
                '8',
                '10',
                '12',
                '14',
                '16',
                '18',
                '20',
                '24',
              ]"
              variant="outlined"
            />
          </v-col>
          <v-col cols="6" class="flex"
            ><v-icon icon="mdi mdi-account mt-2" /><span class="mr-2 mt-2"
              >Assigned:</span
            >
            <v-select
              v-model="subtaskBody.assigned"
              label="user"
              density="compact"
              :disabled="subtaskBody.status === 'todo'"
              rounded="lg"
              class="ml-2"
              :max-width="400"
              variant="outlined"
              :items="users"
              item-title="email"
              item-value="_id"
            ></v-select>
          </v-col>
        </v-col>
      </v-row>
      <v-textarea
        v-model="subtaskBody.description"
        label="Description"
        rounded="lg"
        rows="6"
        variant="outlined"
        :noResize="true"
      ></v-textarea>
      <template v-slot:actions>
        <v-btn class="" text="Cancel" @click="onCloseSubtask"></v-btn>
        <v-btn
          class="ms-auto"
          :text="subtaskBody._id ? 'Edit' : 'Create'"
          :disabled="!isSubtaskValid"
          @click="
            subtaskBody._id
              ? handleSubtaskUpdate(subtaskBody._id, subtaskBody)
              : handleSubtaskCreate(subtaskBody)
          "
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
  <!-- subtask ^^^ -->
  <!-- task vvv -->
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
            taskBody._id
              ? handleTaskUpdate(taskBody._id, taskBody)
              : handleTaskCreate(taskBody)
          "
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
  <!-- task ^^^ -->
  <div class="h-full flex flex-col px-4">
    <div class="flex">
      <v-tabs
        v-model="tab"
        height="48"
        align-tabs="center"
        color=""
        elevation="24"
        class="bg-neutral-900 w-fit pt-1.5 mb-2 rounded-[24px] ml-32 mt-2 mx-auto"
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
      <v-btn
        icon="mdi mdi-plus"
        class="mr-2 mt-2"
        color="purple"
        absolute
        @click="tab === 1 ? handleOpenTask() : handleOpenSubtask()"
      ></v-btn>
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
            <VueDraggableNext
              :animation="200"
              ghost-class="ghost-card"
              group="tasks"
              :list="getSubtasksByStatus(column.status)"
            >
              <v-card
                v-for="item in getSubtasksByStatus(column.status)"
                rounded="lg"
                class="border-2 press-effect mb-2"
                variant="elevated"
                theme="dark"
                elevation="12"
              >
                <v-card-title class="">
                  {{ item.name }}
                </v-card-title>
                <v-card-subtitle>{{
                  formatDate(item.dateCreate, "d MMMM yyyy")
                }}</v-card-subtitle>
                <v-card-text class="">
                  <span :class="item.description ? '' : 'text-neutral-500'">
                    {{ item.description ? item.description : "No description" }}
                  </span>
                </v-card-text>
                <div class="mt-2 flex items-end">
                  <div class="pl-4 w-full flex items-center space-x-2">
                    <v-avatar
                      v-if="item.assignedInfo"
                      :color="item.assignedInfo[0].color"
                      class="text-xl capitalize"
                    >
                      {{ item.assignedInfo[0].email[0] }}
                    </v-avatar>
                    <v-chip
                      class="px-5"
                      :color="setPriorityColor(item.priority)"
                      >{{ item.priority }}</v-chip
                    >
                    <v-btn
                      icon="mdi mdi-trash-can-outline"
                      class="ml-auto"
                      color="red-darken-4"
                      variant="text"
                      @click="removeSubtask(item._id)"
                    ></v-btn>
                    <v-btn
                      icon="mdi mdi-cog-outline"
                      class="ma-0"
                      variant="text"
                      @click="handleOpenSubtask(item)"
                    ></v-btn>
                  </div>
                </div>
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
import { useSubtask } from "../composables/useSubtask.ts";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import Loading from "../components/Loading.vue";
import BtnPriority from "../components/BtnPriority.vue";
import BtnStatus from "../components/BtnStatus.vue";
import { VueDraggableNext } from "vue-draggable-next";
import { Task } from "../interfaces/task.interface.ts";
import { Subtask } from "../interfaces/subtask.interface.ts";
import { User } from "../interfaces/user.interface.ts";

export default defineComponent({
  components: { Loading, BtnPriority, BtnStatus, VueDraggableNext },
  props: {
    id: { type: String, required: true },
  },
  setup() {
    const { getProjectTasks, patchTask, addTask, deleteTask } = useTask();
    const { getUser, getUsers } = useUser();
    const { getAuthUser } = useAuth();
    const { getSubtasksByTaskIds, addSubtask, patchSubtask, deleteSubtask } =
      useSubtask();
    return {
      getProjectTasks,
      getUser,
      patchTask,
      getUsers,
      addTask,
      getAuthUser,
      deleteTask,
      getSubtasksByTaskIds,
      addSubtask,
      patchSubtask,
      deleteSubtask,
    };
  },
  data() {
    return {
      currentUser: {} as User,
      tableKey: 0,
      valid: false,
      tasks: [] as Task[],
      mappedTasks: [] as Task[],
      mappedSubtasks: [] as Subtask[],
      users: [] as User[],
      toastMessage: "",
      showToast: false,
      colorToast: "red",
      isPageLoading: true,
      tab: 1,
      taskVisible: false,
      subtaskVisible: false,
      selectedTask: null,
      selectedTaskBody: null,
      selectedSubtaskBody: null,
      selectedSubtask: null,
      subtaskBody: {
        id: "",
        name: "",
        description: "",
        dateCreate: "",
        dateStart: "",
        dateEnd: "",
        assigned: "",
        assignedInfo: null,
        priority: "",
        task: "",
        status: "todo",
        time: "",
      },
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
      subtasks: [],

      columns: [
        { id: 1, title: "To Do", status: "todo" },
        { id: 2, title: "In Progress", status: "doing" },
        { id: 3, title: "Done", status: "done" },
      ],
    };
  },

  computed: {
    isSubtaskValid() {
      if (typeof this.subtaskBody.assigned === "object") {
        this.subtaskBody.assigned = "";
      }
      const isTimeValid =
        this.subtaskBody.time !== null && this.subtaskBody.time.trim() !== "";
      const isNameValid =
        this.subtaskBody.name !== null && this.subtaskBody.name.trim() !== "";
      const isTaskValid =
        this.subtaskBody.task !== null && this.subtaskBody.task.trim() !== "";
      const isAssignedValid =
        this.subtaskBody.status === "doing" ||
        this.subtaskBody.status === "done"
          ? this.subtaskBody.assigned && this.subtaskBody.assigned.trim() !== ""
          : true;

      return isAssignedValid && isTimeValid && isNameValid && isTaskValid;
    },
    getSubtasksByStatus() {
      return (status: string) => {
        return this.mappedSubtasks.filter(
          (subtask) => subtask.status === status
        );
      };
    },
  },
  methods: {
    setPriorityColor(priority: string) {
      console.log(priority);
      switch (priority) {
        case "low":
          return "blue";
        case "medium":
          return "orange";
        case "high":
          return "red";
      }
    },
    validatePrivileges(ownerId: string) {
      if (!ownerId) {
        return true;
      }

      return (
        this.currentUser.role === "admin" || this.currentUser._id === ownerId
      );
    },

    onStatusChangeSubtaskDialog(newStatus: any) {
      if (newStatus.name === "todo") {
        this.subtaskBody.assigned = '';
      }
      this.subtaskBody.status = newStatus.name;
    },
    onPriorityChangeSubtaskDialog(newStatus: any) {
      this.subtaskBody.priority = newStatus.name;
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

      if (response) {
        this.createToast("Task status has been changed", "success");
      }
    },
    async onPriorityChangeTask(newPriority: any, taskId: string) {
      const body = { priority: newPriority.name };
      const response = await this.handleTaskUpdate(taskId, body);

      if (response) {
        this.createToast("Task priority has been changed", "success");
      }
    },

    async onCloseSubtask() {
      this.subtaskVisible = false;
      await new Promise((resolve) => setTimeout(resolve, 300));
      this.selectedSubtaskBody = null;
      this.selectedSubtask = null;
      this.subtaskBody = {
        id: "",
        name: "",
        description: "",
        dateCreate: "",
        dateStart: "",
        dateEnd: "",
        assigned: "",
        assignedInfo: null,
        priority: "",
        task: "",
        status: "todo",
        time: "",
      };
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
    handleOpenSubtask(selectedSubtask?: any) {
      this.selectedSubtaskBody = selectedSubtask;
      selectedSubtask
        ? (this.subtaskBody = { ...selectedSubtask })
        : {
            id: "",
            name: "",
            description: "",
            dateCreate: "",
            dateStart: "",
            dateEnd: "",
            assigned: "",
            assignedInfo: null,
            priority: "",
            task: "",
            status: "",
            time: "",
          };
      this.subtaskVisible = true;
    },
    async handleSubtaskCreate(subtaskBody: any) {
      try {
        const response: any = await this.addSubtask(subtaskBody);
        console.log(subtaskBody);
        if (response) {
          const newSubtask = response;
          newSubtask.assignedInfo = await this.getUserInfo(response.assigned);
          this.mappedSubtasks.push(newSubtask);
          this.createToast("Success! Subtask has been created", "success");
          this.onCloseSubtask();
          return;
        }
        this.createToast(
          "Something went wrong, while creating subtask. Please try again later..."
        );
      } catch (err) {
        this.createToast(
          "Something went wrong, while creating subtask. Please try again later..."
        );
      }
    },
    async handleTaskCreate(taskBody: any) {
      taskBody.project = this.id;
      taskBody.owner = this.currentUser._id;
      try {
        const response: any = await this.addTask(taskBody);

        if (response) {
          const newTask = response.data;
          newTask.ownerInfo = await this.getUserInfo(response.data.owner);

          this.mappedTasks.push(newTask);
          this.tableKey += 1;
          this.createToast("Success! Task has been created", "success");
          this.onCloseTask();
          return;
        }
        this.createToast(
          "Something went wrong, while creating task. Please try again later..."
        );
        return response;
      } catch (err) {
        this.createToast(
          "Something went wrong, could not create task. Please try again later..."
        );
      }
    },
    async removeTask(taskId: string) {
      try {
        const response = await this.deleteTask(taskId);

        if (response) {
          this.createToast("Success! Task has been removed.", "success");
          // this.mappedTasks = this.mappedTasks.filter((t) => t._id !== taskId);
        } else {
          this.createToast(
            "Something went wrong, could not delete. Please try again later..."
          );
        }
      } catch (err) {
        this.createToast(
          "Something went wrong, could not delete. Please try again later..."
        );
      }
    },
    async removeSubtask(subtaskId: string) {
      try {
        const response = await this.deleteSubtask(subtaskId);
        console.log(response);
        if (response) {
          this.createToast("Success! Subtask has been removed.", "success");
          this.mappedSubtasks = this.mappedSubtasks.filter(
            (s) => s._id !== subtaskId
          );
        } else {
          this.createToast(
            "Something went wrong, could not delete. Please try again later..."
          );
        }
      } catch (err) {
        this.createToast(
          "Something went wrong, could not delete. Please try again later..."
        );
      }
    },

    async handleTaskUpdate(taskId: string, taskBody: any) {
      console.log(taskId);
      console.log(taskBody);
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
        this.createToast(
          "Something went wrong, could not update task. Please try again later..."
        );
      }
    },
    async handleSubtaskUpdate(subtaskId: string, subtaskBody: any) {
      // if((subtaskBody.status === 'doing' || subtaskBody.status === 'todo') && subtaskBody.assigned)
      try {
        const response: any = await this.patchSubtask(subtaskId, subtaskBody);
        console.log(response);
        if (response) {
          this.createToast("Success! Subtask has been updated", "success");
          let subtask = this.mappedSubtasks.find(
            (subtask) => subtask._id === subtaskId
          );
          subtaskBody.assignedInfo = await this.getUserInfo(response.assigned);
          Object.assign(subtask, subtaskBody);
          this.onCloseSubtask();
          return;
        }
        this.createToast(
          "Something went wrong, could not update subtask. Please try again later..."
        );
      } catch (err) {
        this.createToast(
          "Something went wrong, could not update subtask. Please try again later..."
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
    async mapSubtaskList() {
      for (const subtask of this.subtasks) {
        subtask.assignedInfo = await this.getUserInfo(subtask.assigned);
        this.mappedSubtasks.push(subtask);
      }
    },
    async getUserInfo(userId: string) {
      try {
        const response: any = await this.getUser(userId);
        return response;
      } catch (err) {}
    },
    async getTasksList() {
      try {
        const response: any[] = await this.getProjectTasks(this.id);
        if (!response || response?.length === 0) {
          return [];
        }
        return response;
      } catch (error) {
        this.createToast(
          "Something went wrong, could not get tasks. Please try again later..."
        );
        return [];
      }
    },
    async getSubtaskList() {
      const taskIds = [];
      this.mappedTasks.forEach((task) => {
        taskIds.push(task._id);
      });
      try {
        const response: any[] = await this.getSubtasksByTaskIds(taskIds);

        if (!response || response?.length === 0) {
          return [];
        }
        return response;
      } catch (err) {
        this.createToast(
          "Something went wrong, could not get subtasks. Please try again later..."
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
    await this.mapTaskList();
    this.subtasks = await this.getSubtaskList();
    await this.mapSubtaskList();
    this.isPageLoading = false;
    this.users = [this.users, ...(await this.getUserList())];
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

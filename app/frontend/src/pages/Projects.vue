<template>
  <v-container fluid class="">
    <Loading :modelValue="isPageLoading" />
    <v-snackbar :timeout="5000" :color="colorToast" v-model="showToast">
      {{ toastMessage }}
      <template #actions>
        <v-btn color="white" variant="text" @click="showToast = false">
          x
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
      id="project-dialog"
      v-model="projectVisible"
      width="auto"
      persistent
    >
      <v-card
        :title="projectBody?._id ? 'Edit Project' : 'Create Project'"
        theme="dark"
        class="px-4 w-[450px] sm:w-[500px]"
        rounded="xl"
      >
        <v-form v-model="valid">
          <v-text-field
            v-model="projectBody.name"
            :rules="[rules.nameMinMaxLength]"
            label="Name"
            rounded="lg"
            variant="outlined"
            class="mb-3"
          ></v-text-field>
          <v-textarea
            v-model="projectBody.description"
            :rules="[rules.descriptionMaxLength]"
            label="Description"
            rounded="lg"
            rows="10"
            variant="outlined"
            :noResize="true"
          ></v-textarea>
        </v-form>
        <template v-slot:actions>
          <v-btn class="" text="Cancel" @click="handleCancel"></v-btn>
          <v-btn
            class="ms-auto"
            :text="projectBody?._id ? 'Save' : 'Create'"
            :loading="actionBtnLoading"
            :disabled="!valid"
            @click="
              projectBody?._id
                ? patchProject(projectBody._id, projectBody)
                : addProject(projectBody)
            "
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
    <v-dialog
      id="project-dialog"
      v-model="deleteVisible"
      width="auto"
      persistent
    >
      <v-card
        width="500"
        title="Irreversible Change: Are you sure?"
        text="To proceed with the deletion, you must re-enter the project name to confirm."
        theme="dark"
        class="px-4"
        rounded="xl"
      >
        <p class="text-center text text-lg mb-6">
          '' {{ projectBody.name }} ''
        </p>
        <v-text-field
          v-model="deleteInput"
          placeholder="Re-enter Project Name"
          rounded="lg"
          variant="outlined"
        ></v-text-field>
        <template v-slot:actions>
          <v-btn class="" text="Cancel" @click="handleCancelDelete"></v-btn>
          <v-btn
            class="ms-auto"
            color="red"
            variant="tonal"
            text="Delete"
            :loading="actionBtnLoading"
            :disabled="
              deleteInput.toLowerCase() !== projectBody.name.toLowerCase()
            "
            @click="removeProject(projectBody._id)"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
    <v-row justify="center">
      <v-col
        md="2"
        lg="3"
        class=""
        :hidden="this.$vuetify.display.xs || this.$vuetify.display.sm"
      ></v-col>
      <v-col cols="12" sm="6" md="6" lg="6" class="flex justify-center">
        <v-text-field
          appendIcon=""
          label="Search"
          variant="solo"
          max-width="500"
          theme="dark"
          elevation="24"
          append-inner-icon="mdi mdi-magnify"
          clearable
          rounded="lg"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="5" md="4" lg="3" class="flex justify-center pt-4"
        ><v-btn
          color="purple-accent-4"
          elevation="24"
          height="46"
          rounded="lg"
          class="text-none"
          prepend-icon="mdi mdi-plus"
          @click="handleOpenProjectDialog()"
          >Create Project</v-btn
        ></v-col
      >
    </v-row>
    <v-row justify="center">
      <v-col v-for="project in projects" cols="auto" class="flex">
        <v-card
          width="350"
          height="300"
          rounded="lg"
          class="border-2 press-effect"
          variant="elevated"
          theme="dark"
          elevation="24"
         
        >
          <v-card-title class="hover:text-purple-600"  @click="navigateToProjectItem(project)">
            {{ project.name }}
          </v-card-title>
          <v-card-subtitle>2024-08-14</v-card-subtitle>
          <v-card-text class="h-[174px] overflow-y-scroll">
            <span :class="project.description ? '' : 'text-neutral-500'">
              {{ project.description ? project.description : "No description" }}
            </span>
          </v-card-text>
          <div class="h-[48px] mt-2 flex items-end">
            <div class="pl-4 w-full flex items-center space-x-2">
              <v-chip color="deep-purple-accent-1">Filip Doe</v-chip>
              <v-chip color="cyan">Frontend</v-chip>
              <v-btn
                icon="mdi mdi-trash-can-outline"
                class="ml-auto"
                color="red-darken-4"
                variant="text"
                @click="handleOpenDelete(project)"
              ></v-btn>
              <v-btn
                icon="mdi mdi-cog-outline"
                class="ma-0"
                variant="text"
                @click="handleOpenProjectDialog(project)"
              ></v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useProject } from "../composables/useProject.ts";
import { IProjectBody } from "../services/datasources/project.service.ts";
import Loading from "../components/Loading.vue";
export default defineComponent({
  components: { Loading },
  props: {},
  setup() {
    const { getProjects, deleteProject, updateProject, createProject } =
      useProject();
    const router = useRouter();

    return {
      getProjects,
      deleteProject,
      updateProject,
      createProject,
      router,
    };
  },
  data() {
    return {
      valid: false,
      toastMessage: "",
      showToast: false,
      colorToast: "red",
      isPageLoading: true,
      selectedProjectBody: null,
      projectVisible: false,
      deleteVisible: false,
      actionBtnLoading: false,
      deleteInput: "",
      projectBody: { id: null, name: "", description: "" },
      projects: null,
      rules: {
        nameMinMaxLength: (value: string) => {
          const trimmedValue = value.trim();
          const pattern = /^[A-Za-z0-9\s\W]{3,32}$/; // 3 to 32 characters allowed
          return (
            pattern.test(trimmedValue) ||
            "The input must be between 3 and 32 characters long."
          );
        },
        descriptionMaxLength: (value: string) => {
          const trimmedValue = value.trim();
          const pattern = /^.{0,250}$/; // allows up to 250 chars
          return (
            pattern.test(trimmedValue) ||
            "The input must not exceed 250 characters."
          );
        },
      },
    };
  },
  computed: {},
  methods: {
    navigateToProjectItem(project: any) {
      this.router.push(`/projects/${project._id}`);
    },
    createToast(message: string, type?: "success" | "error") {
      this.toastMessage = message;
      this.showToast = true;
      this.colorToast = type === "success" ? "#34d19a" : "red-accent-2";
    },
    handleOpenProjectDialog(selectedProject?: any) {
      this.selectedProjectBody = selectedProject;
      selectedProject ? (this.projectBody = { ...selectedProject }) : null;
      this.projectVisible = true;
    },
    handleOpenDelete(selectedProject: any) {
      this.projectBody = selectedProject;
      this.deleteVisible = true;
    },
    async handleCancel() {
      this.projectVisible = false;
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.projectBody = { id: null, name: "", description: "" };
    },
    async handleCancelDelete() {
      this.deleteVisible = false;
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.deleteInput = "";
    },

    async getProjectList() {
      try {
        const response: any[] = await this.getProjects();
        if (!response || response?.length === 0) {
          return [];
        }
        return response;
      } catch (error) {
        console.log(error);
        this.createToast(
          "Something went wrong, could not get projects. Please try again later..."
        );
        return [];
      }
    },
    async removeProject(projectId: string) {
      this.actionBtnLoading = true;
      try {
        const response = await this.deleteProject(projectId);
        console.log(response);
        if (response) {
          this.createToast("Success! Project has been removed.", "success");
          this.projects = this.projects.filter((p) => p._id !== projectId);
        } else {
          this.createToast(
            "Something went wrong, could not delete project. Please try again later..."
          );
        }
      } catch (err) {
        console.log(err);
        this.createToast(
          "Something went wrong, could not delete project. Please try again later..."
        );
      } finally {
        this.actionBtnLoading = false;
        this.handleCancelDelete();
      }
    },
    async patchProject(projectId: string, projectBody: IProjectBody) {
      this.actionBtnLoading = true;
      try {
        const response = await this.updateProject(projectId, projectBody);
        if (response) {
          this.selectedProjectBody.name = projectBody.name;
          this.selectedProjectBody.description = projectBody.description;
          this.createToast("Success! Project has been updated.", "success");
        } else {
          this.createToast(
            "Something went wrong, could not update project. Please try again later..."
          );
        }
      } catch (error) {
        console.log(error);
        this.createToast(
          "Something went wrong, could not update project. Please try again later..."
        );
      } finally {
        (this.projectBody = { id: null, name: "", description: "" }),
          (this.projectVisible = false);
        this.actionBtnLoading = false;
      }
    },
    async addProject(projectBody: IProjectBody) {
      this.actionBtnLoading = true;
      try {
        const response = await this.createProject(projectBody);
        if (response) {
          this.createToast("Success! Project has been created.", "success");
          this.projects.push(response);
        } else {
          this.createToast(
            "Something went wrong, could not create project. Please try again later..."
          );
        }
      } catch (err) {
        console.log(err);
        this.createToast(
          "Something went wrong, could not create project. Please try again later..."
        );
      } finally {
        (this.projectBody = { id: null, name: "", description: "" }),
          (this.projectVisible = false);
        this.actionBtnLoading = false;
      }
    },
  },
  async mounted() {
    this.projects = await this.getProjects();
    console.log(this.projects);
    this.isPageLoading = false;
  },
});
</script>
<style scoped>
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
.v-btn {
  font-weight: 500;
  border-radius: 8px;
  pointer-events: all;
}

.v-card {
  border-width: 1px;
}

.v-card:hover {
  cursor: pointer;
}
.press-effect {
  transition: transform 0.25s ease-in-out;
}
.press-effect:hover {
  transform: scale(0.98);
}
</style>

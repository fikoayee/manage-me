<template>
  <v-snackbar :timeout="5000" :color="colorToast" v-model="showToast">
    {{ toastMessage }}
    <template #actions>
      <v-btn color="white" variant="text" @click="showToast = false"> x </v-btn>
    </template>
  </v-snackbar>
  <v-row class="fill-height" justify="center" align="center">
    <v-col cols="12" class="flex flex-col items-center px-6 pt-4">
      <v-sheet
        class="w-full px-6 py-6 flex flex-col items-center justify-center d-flex max-w-[550px]"
        rounded="xl"
        elevation="24"
        theme="dark"
      >
        <p class="text-3xl font-[500]">REGISTER</p>
        <p class="font-[500] text-neutral-400">
          Please enter your login and password
        </p>
        <v-form v-model="valid" ref="formRef" class="mt-4 w-full">
          <v-text-field
            label="Email"
            variant="outlined"
            rounded="lg"
            v-model="registerData.email"
            :rules="[rules.required, rules.email]"
            type="email"
            class="mb-3"
            required
          ></v-text-field>
          <v-text-field
            label="Password"
            variant="outlined"
            rounded="lg"
            v-model="registerData.password"
            :rules="[rules.required, rules.password]"
            :type="showPass ? 'text' : 'password'"
            :append-inner-icon="showPass ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
            class="mb-3"
            required
            @click:append-inner="showPass = !showPass"
          ></v-text-field>
          <v-text-field
            label="Repeat Password"
            variant="outlined"
            rounded="lg"
            v-model="registerData.rePassword"
            :rules="[rules.required, rules.matchPassword]"
            :type="showRePass ? 'text' : 'password'"
            :append-inner-icon="showRePass ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
            class="mb-3"
            @click:append-inner="showRePass = !showRePass"
            required
          ></v-text-field>
          <v-select
            v-model="registerData.role"
            label="Role"
            :items="['developer', 'devops', 'admin']"
            variant="outlined"
            :rules="[rules.required]"
          ></v-select>
        </v-form>
        <v-btn
          height="45"
          width="180"
          rounded="lg"
          variant="outlined"
          @click="handleRegister"
          :disabled="!valid"
          >Register</v-btn
        >

        <p class="text-neutral-000 font-[500] text-sm mt-6 mb-2">
          Already have an account?
          <v-btn
            variant="plain"
            class="ma-0 px-1"
            @click="handleNavigation('/login')"
            ><span class="text-none">Login</span></v-btn
          >
        </p>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
export default defineComponent({
  components: {},
  props: {},
  data() {
    return {
      toastMessage: "",
      showToast: false,
      colorToast: "red",
      registerData: {
        email: "",
        password: "",
        rePassword: "",
        role: null,
      },
      showPass: false,
      showRePass: false,
      valid: false,
      rules: {
        required: (value) => !!value || "This field is required",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        password: (value) => {
          const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
          return (
            pattern.test(value) ||
            "Password must be at least 8 characters long, contain at least one uppercase letter, and one special character."
          );
        },
        matchPassword: (value) =>
          value === this.registerData.password || "Passwords do not match.",
      },
    };
  },
  methods: {
    handleNavigation(route: string) {
      this.router.push(route);
      cleanForm();
    },
    cleanForm() {
      this.registerData.email = "";
      this.registerData.password = "";
      this.registerData.rePassword = "";
      this.registerData.role = null;
      this.showPass = false;
      this.showRePass = false;
      this.valid = false;
    },
    async handleRegister() {
      try {
        this.registerData.color = this.getRandomColor();
        const response = await this.register(this.registerData);

        if (!response) {
          this.createToast(
            "Something went wrong, could not register. Please try again later..."
          );
        }
        if (response.status === 200) {
          this.createToast("Success! Account has been created.", "Success");
          this.handleNavigation("/login");
        }
      } catch (error) {
        this.createToast(
          "Something went wrong, could not register. Please try again later..."
        );
      } finally {
        this.cleanForm();
      }
    },
    createToast(message: string, type?: "success" | "error") {
      this.toastMessage = message;
      this.showToast = true;
      this.colorToast = type === "success" ? "#34d19a" : "red-accent-2";
    },
    getRandomColor() {
      const colors = [
        "#4287f5",
        "#9842f5",
        "#f542d4",
        "#f54242",
        "#42f56c",
        "#cbf542",
        "#f5a442",
        "#42f5cb",
      ];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    },
  },
  setup() {
    const router = useRouter();
    const { register, login } = useAuth();
    return {
      router,
      register,
    };
  },
});
</script>
<style scoped></style>

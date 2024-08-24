<template>
  <v-row class="fill-height" justify="center" align="center">
    <v-col cols="12" class="flex flex-col items-center px-6 pt-4">
      <v-sheet
        class="w-full px-6 py-6 flex flex-col items-center justify-center d-flex max-w-[550px]"
        rounded="xl"
        elevation="24"
        theme="dark"
      >
        <p class="text-3xl font-[500]">LOGIN</p>
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
            :rules="[rules.required]"
            :type="showPass ? 'text' : 'password'"
            :append-inner-icon="showPass ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
            class="mb-3"
            @click:append-inner="showPass = !showPass"
            required
          ></v-text-field>
        </v-form>
        <v-btn
          class=""
          height="45"
          width="180"
          rounded="lg"
          variant="outlined"
          :disabled="!valid"
          >Login</v-btn
        >
        <div class="flex justify-center space-x-2 mt-2">
          <v-btn icon="" density="comfortable"
            ><i class="fa-brands fa-google fa-md pt-0.5"></i
          ></v-btn>
          <v-btn icon="" density="comfortable"
            ><i class="fa-brands fa-linkedin fa-lg pb-0.5"></i
          ></v-btn>
          <v-btn icon="" density="comfortable"
            ><i class="fa-brands fa-github fa-lg pb-0.5"></i
          ></v-btn>
        </div>
        <p class="text-neutral-000 font-[500] text-sm mt-6 mb-2">
          Don't have an account?
          <v-btn
            variant="plain"
            class="ma-0 px-1"
            @click="handleNavigation('/register')"
            ><span class="text-none">Sign Up</span></v-btn
          >
        </p>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {},
  props: {},
  data() {
    return {
      registerData: {
        email: "",
        password: "",
      },
      showPass: false,
      valid: false,

      rules: {
        required: (value) => !!value || "This field is required",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
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
      this.showPass = false;
      this.valid = false;
    },
  },
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
  mounted() {},
});
</script>
<style scoped></style>

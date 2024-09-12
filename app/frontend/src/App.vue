<template>
  <v-app class="min-h-full min-w-full">
    <v-navigation-drawer
      :theme="themeState.isDarkTheme ? 'dark' : ''"
      permanent
      :rail="!this.$vuetify.display.mdAndUp && !hideNavbar"
      :width="hideNavbar ? 0 : 200"
      :hidden="hideNavbar"
    >
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/75.jpg"
        nav
      ></v-list-item>
      <v-divider></v-divider>
      <v-list density="comfortable" nav>
        <v-list-item
          v-for="item in menuItems"
          :prepend-icon="item.icon"
          :value="item.title"
          :title="item.title"
          @click="handleNavigation(item.route)"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi mdi-theme-light-dark"
          title="Light/Dark"
          @click="toggleTheme"
        />
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="handleLogout"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main 
      :class="themeState.isDarkTheme ? 'bg-neutral-800' : 'bg-neutral-300'"
    >
      <RouterView
    /></v-main>
  </v-app>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "./composables/useAuth";
export default defineComponent({
  components: {},
  props: {},
  data() {
    return {
      menuItems: [
        {
          title: "Projects",
          icon: "mdi-view-dashboard",
          route: "/projects",
          selected: false,
        },
        {
          title: "Notifications",
          icon: "mdi-forum",
          route: "/notifications",
          selected: true,
        },
      ],
    };
  },
  methods: {
    handleLogout() {
      this.logout();
      this.router.push(`/login`);
    },
    handleNavigation(route: string) {
      this.router.push(route);
    },
    toggleTheme() {
      this.themeState.isDarkTheme = !this.themeState.isDarkTheme;
    },
  },
  computed: {
    hideNavbar() {
      return this.$route.name === "Login" || this.$route.name === "Register";
    },
  },
  setup() {
    const router = useRouter();
    const { isAuthenticated, logout } = useAuth();
    const themeState = inject("themeState") as { isDarkTheme: boolean };
    return {
      router,
      themeState,
      isAuthenticated,
      logout,
    };
  },
  mounted() {
    if (!this.isAuthenticated()) {
      this.router.push(`/login`);
      return;
    }
  },
});
</script>
<style scoped></style>

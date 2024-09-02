<template>
  <v-app class="min-h-full min-w-full">
    <v-navigation-drawer
      theme="dark"
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
      </v-list>
    </v-navigation-drawer>
    <v-main class="bg-neutral-800"> <RouterView /></v-main>
  </v-app>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
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
    handleNavigation(route: string) {
      this.router.push(route);
    },
  },
  computed: {
    hideNavbar() {
      return this.$route.name === "Login" || this.$route.name === "Register";
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
<style scoped>

</style>

import { createRouter, createWebHistory } from "vue-router";
import Projects from "./pages/Projects.vue";
import NotFound from "./pages/NotFound.vue";

const routes = [
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

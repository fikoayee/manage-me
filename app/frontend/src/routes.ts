import { createRouter, createWebHistory } from "vue-router";
import Projects from "./pages/Projects.vue";
import NotFound from "./pages/NotFound.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { hideNavbar: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { hideNavbar: true },
  },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

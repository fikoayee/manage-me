import { createApp, reactive } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes";
import vuetify from "./plugins/vuetify.ts";

const savedTheme = localStorage.getItem("isDarkTheme") === "true";

const themeState = reactive({
  isDarkTheme: savedTheme,
});

const app = createApp(App);
app.provide("themeState", themeState);
app.use(vuetify);
app.use(router);
app.mount("#app");

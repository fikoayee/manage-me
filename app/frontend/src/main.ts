import { createApp, reactive } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes";
import vuetify from "./plugins/vuetify.ts";

const themeState = reactive({
    isDarkTheme: false,
  });

const app = createApp(App);
app.provide('themeState', themeState);
app.use(vuetify);
app.use(router);
app.mount("#app");

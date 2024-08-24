import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes";
import vuetify from "./plugins/vuetify.ts";

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount("#app");

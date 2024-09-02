import { vMaska } from 'maska/vue';
import { App } from 'vue';

export default {
  install(app: App) {
    app.directive('maska', vMaska);
  },
};
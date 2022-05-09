import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { nSQL } from "@nano-sql/core";
import { setup } from "./models/wireframe";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

setup().then(() => {
  const app = createApp(App);

  app.use(createPinia());
  app.use(router);

  app.mount("#app");
});

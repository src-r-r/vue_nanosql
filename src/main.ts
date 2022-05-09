import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { setup } from "./models/wireframe";

// Optional -- but makes it look pretty! 😬
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// We'll first set up the database

setup().then(() => {
  // Then mount the app!
  const app = createApp(App);

  app.use(createPinia());
  app.use(router);

  app.mount("#app");
});

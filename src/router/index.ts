import MaintenanceVue from "@/views/Maintenance.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/maintenance",
      name: "maintenance",
      component: MaintenanceVue,
    },
  ],
});

export default router;

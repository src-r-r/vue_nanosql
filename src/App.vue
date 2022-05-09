<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template lang="pug">
div
  header.header
    nav.navbar.navbar-expand-lg.navbar-light.bg-light
      .container-fluid
        .navbar-brand
          div To Do List
        .collapse.navbar-collapse
          ul.navbar-nav.me-auto.mb-2.mb-lg-0
            li.nav-item
              RouterLink.nav-link(to="/") Home
            li.nav-item
              RouterLink.nav-link(to="/maintenance") Maintenance
  .container-fluid
    RouterView
</template>

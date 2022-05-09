<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import bootstrap from "bootstrap";
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

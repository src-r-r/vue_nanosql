<template lang="pug">
.container
    h1 Maintenance
    h2 Drop Database
    .alert.alert-danger You know what this means. Push the button to reset everything and cause a rift in the space-time continuum!
    div
        a.btn.btn-danger.btn-large(@click="destroyData")
            i.bi.bi-icon-trash
            span Delete All Data
</template>

<script setup="" lang="ts">
import { tearDown } from "@/models/wireframe";
import { useRouter } from "vue-router";

const router = useRouter();

async function destroyData() {
  await tearDown();
  router.push({ name: "home" });
}
</script>

<style lang="stylus"></style>

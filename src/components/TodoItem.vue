<template lang="pug">
div.row
    div.row(v-if="prop.item")
      div.col.btn.btn-sm.col-sm-1
        DoneIconVue(v-if="!prop.item.is_complete")
        TodoIconVue(v-else="")
      div.col(v-bind:class="!prop.item.is_complete ? '' : 'crossout' ") {{ prop.item.task }}
</template>

<script setup="" lang="ts">
import { TodoItem } from "@/models/todoitem";
import { reactive, type Component, onBeforeMount } from "vue";
import DoneIconVue from "./icon/DoneIcon.vue";
import TodoIconVue from "./icon/TodoIcon.vue";

const emit = defineEmits(["check", "moveUp", "moveDown"]);

const data = reactive({
  itemState: null,
  cssClass: "",
} as {
  itemState: Component | null;
  cssClass: string;
});

const prop = defineProps({
  item: {
    type: TodoItem,
    required: true,
  },
  i: {
    type: Number,
    requried: true,
  },
});

onBeforeMount(async () => {
  if (!prop.item) return;
  data.itemState = prop.item.is_complete ? DoneIconVue : TodoIconVue;
  data.cssClass = prop.item.is_complete ? "crossout" : "";
});
</script>

<style lang="stylus">
.crossout
    text-decoration line-through
</style>

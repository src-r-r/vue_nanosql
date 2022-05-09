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
import DoneIconVue from "./icon/DoneIcon.vue";
import TodoIconVue from "./icon/TodoIcon.vue";

const emit = defineEmits(["check", "moveUp", "moveDown"]);

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
</script>

<style lang="stylus">
.crossout
    text-decoration line-through
</style>

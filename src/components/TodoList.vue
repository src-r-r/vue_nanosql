<template lang="pug">
div.container
    form(v-on:submit.prevent="renameList")
        .row.container-fluid(v-if="data.edit")
          .col
            input.form-control(type="text" v-model="data.listName")
          .col
            a.btn.btn-primary(
                  :disabled="!data.listName"
                  :class="data.listName ? 'btn-primary' : 'btn-disabled'"
                  @click="renameList")
              i.bi.bi-save
              span Save
        .row.container-fluid(v-else="")
          h1 {{ ls.listTitle }}
            i.bi.bi-pencil-square(@click="doEdit")
    form(v-on:submit.prevent="emitAddTask")
        .row
          .col
            label(for="task") New Task
        .row
          .col
            input.form-control(type="text" v-model="data.task")
          .col
            a.btn.btn-primary(click="emitAddTask")
              i.bi.bi-plus-circle-fill
    ul.list-group
        li.list-group-item(v-for="item in ls.items")
            component(:is="TodoItemComponent" :item="item", @click="emitChecked(item)")
</template>

<script setup lang="ts">
import type { TodoItem } from "@/models/todoitem";
import { TodoList } from "@/models/todolist";
import { onBeforeMount, reactive } from "vue";
import TodoItemComponent from "@/components/TodoItem.vue";
import _ from "lodash";
import { useTodoListStore } from "@/stores/todo";

// Check is propogated from the child elements
const emit = defineEmits(["addTask", "renameList", "check"]);

const ls = useTodoListStore();

const data = reactive({
  edit: false,
  items: [],
  task: null,
  listName: null,
} as {
  edit: boolean;
  items: TodoItem[];
  task: string | null;
  listName: string | null;
});

function doEdit() {
  data.edit = true;
  data.listName = ls.listTitle;
}

function renameList() {
  emit("renameList", data.listName);
  data.edit = false;
}

function emitAddTask() {
  emit("addTask", data.task);
  data.task = null;
}

function emitChecked(...args: any[]) {
  emit("check", ...args);
}
</script>

<style lang="stylus"></style>

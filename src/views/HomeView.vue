<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import TodoListComponent from "../components/TodoList.vue";
import ListSelectorComponent from "../components/ListSelector.vue";
import { TodoList } from "@/models/todolist";
import type { Id } from "@/models/base";
import { TodoItem } from "@/models/todoitem";
import { useTodoListStore } from "@/stores/todo";

const ls = useTodoListStore();

const data = reactive({
  newListName: null,
  currentList: null,
  lists: [],
} as {
  newListName: string | null;
  currentList: null | TodoList;
  lists: TodoList[];
});

onBeforeMount(async () => {
  data.lists = await TodoList.filter<TodoList>([]);
});

// This is where we handle the events.

async function addList() {
  if (!data.newListName) return;
  const list = new TodoList(null, data.newListName);
  await list.save();
  data.newListName = null;
  data.currentList = list;
  ls.listTitle = list.name;
  ls.currentListId = list.id;
  ls.items = await list.getItems();
  data.lists = await TodoList.filter<TodoList>([]);
}

async function onListChanged(listId: Id) {
  data.currentList = data.lists.find((l) => l.id == listId) || null;
  if (!data.currentList) {
    return;
  }
  ls.listTitle = data.currentList.name;
  ls.items = await data.currentList.getItems();
  console.log(JSON.stringify(ls.items));
}

async function onAddTask(task: string) {
  if (!data.currentList) return;
  const item = new TodoItem(null, task, data.currentList.id);
  item.save();
  // Add this item to the top of the list to avoid refetching
  ls.items.unshift(item);
}

async function onCheck(item: TodoItem) {
  console.log(`onCheck`);
  item.is_complete = !item.is_complete;
  await item.save();
}

async function onRenameList(name: string) {
  if (!data.currentList) return;
  data.currentList.name = name;
  await data.currentList.save();
  ls.listTitle = data.currentList.name;
}
</script>

<template lang="pug">
main.main
  .container
    form(@submit.prevent="addList")
      .row.mb-3.container-fluid
        .col
          input.form-control(type="text" v-model="data.newListName")
        .col
          input.btn(type="submit" value="Add List" :disabled="!data.newListName" :class="data.newListName? 'btn-primary' : 'btn-disabled'")
    form
      .mb-3.row
        label.form-label Choose a list
        ListSelectorComponent(:lists="data.lists"
                              @change="onListChanged")
    div(v-if="data.currentList")
      TodoListComponent(@addTask="onAddTask"
                        @check="onCheck"
                        @renameList="onRenameList")
</template>

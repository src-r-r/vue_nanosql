<template lang="pug">
select.form-select(v-if="prop.lists.length"
                    aria-label="Select a List"
                    v-model="ls.currentListId"
                    @change='emit("change", ls.currentListId)')
    option(:value="list.id"
           v-for="list in prop.lists") {{ list.name }}
</template>

<script setup lang="ts">
import type { Id } from "@/models/base";
import { TodoList } from "@/models/todolist";
import { useTodoListStore } from "@/stores/todo";
import { onBeforeMount, onUpdated, reactive } from "vue";

const emit = defineEmits(["change"]);

const ls = useTodoListStore();

const prop = defineProps(["lists"]);

const data = reactive({
  current: null,
} as {
  current: Id | null;
});

onBeforeMount(() => {
  data.current = ls.currentListId;
});
</script>

<template lang="pug">
select.form-select(v-if="prop.lists.length"
                    aria-label="Select a List"
                    v-model="ls.currentListId"
                    @change='emit("change", ls.currentListId)')
    option(:value="list.id"
           v-for="list in prop.lists") {{ list.name }}
</template>

<script setup lang="ts">
import { useTodoListStore } from "@/stores/todo";

const emit = defineEmits(["change"]);

const ls = useTodoListStore();

const prop = defineProps(["lists"]);
</script>

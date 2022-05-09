import type { Id } from "@/models/base";
import type { TodoItem } from "@/models/todoitem";
import { defineStore } from "pinia";

export const useTodoListStore = defineStore({
  id: "todoList",
  state: () =>
    ({
      currentListId: null,
      listTitle: null,
      items: [],
    } as {
      currentListId: Id | null;
      listTitle: string | null;
      items: TodoItem[];
    }),
});

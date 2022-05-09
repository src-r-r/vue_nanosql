import { nSQL } from "@nano-sql/core";
import { TodoItem } from "./todoitem";
import { TodoList } from "./todolist";

export const TABLES = [TodoList.TABLE_DEF, TodoItem.TABLE_DEF];

export async function setup(id = "vue_nsql_example", mode = "PERM") {
  const dbList = nSQL().listDatabases();
  if (dbList.includes(id)) {
    console.log(`${id} already created`);
    return;
  }
  await nSQL().createDatabase({
    id,
    mode,
    tables: TABLES,
  });
  console.debug(`Database created: ${id}`);
}

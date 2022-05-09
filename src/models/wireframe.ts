import { nSQL } from "@nano-sql/core";
import { TodoItem } from "./todoitem";
import { TodoList } from "./todolist";

// Table definitions are within the classes.
export const TABLES = [TodoList.TABLE_DEF, TodoItem.TABLE_DEF];

// This will be a simple function that will set up the necessary tables.
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
  // If we want to pre-seed data we'll do it here.
}

// Dropping is pretty simple.
export async function tearDown(id = "vue_nsql_example") {
  indexedDB.deleteDatabase(id);
}

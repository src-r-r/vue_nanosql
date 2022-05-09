import type { InanoSQLTableConfig } from "@nano-sql/core/lib/interfaces";
import { plainToInstance } from "class-transformer";
import { Model, type Id } from "./base";
import { TodoItem } from "./todoitem";

export class TodoList extends Model {
  constructor(public id: Id, public name: string) {
    super(id);
    this.name = name;
  }

  // Remember...static attributes for column names.
  // We don't need ID since that's inherited from `Model`
  static NAME = "name";

  // The compiler will warn us if we forget this. ;-P
  static get TABLE() {
    return "todo_list";
  }

  static convert(instance: object) {
    return plainToInstance(TodoList, instance);
  }

  // See https://nanosql.io/databases.html#creating-a-database
  // for how to construct a table definition.

  static get TABLE_DEF(): InanoSQLTableConfig {
    return {
      name: this.TABLE,
      model: {
        ...Model.BASE_DEF, // This will inherit the "id" column
        [`${TodoList.NAME}:string`]: {},
      },
    };
  }

  public async getItems(): Promise<TodoItem[]> {
    // There's a bit of an odd bug where
    // if you do a strict equals nothing is returned.
    const where = [
      [TodoItem.TODOLIST_ID, ">=", this.id],
      "AND",
      [TodoItem.TODOLIST_ID, "<", this.id + 1],
    ];
    console.log(`filtering ${JSON.stringify(where)}`);
    return await TodoItem.filter<TodoItem>(where);
  }
}

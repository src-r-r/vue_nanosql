import { InanoSQLFKActions } from "@nano-sql/core/lib/interfaces";
import { plainToInstance } from "class-transformer";
import { Model, type Id } from "./base";
import { TodoList } from "./todolist";

export class TodoItem extends Model {
  constructor(
    public id: Id,
    public task: string,
    public todolist_id: Id,
    public is_complete = false,
    public order = 0
  ) {
    super(id);
    this.task = task;
    this.todolist_id = todolist_id;
    this.is_complete = is_complete;
    this.order = order;
  }

  static TASK = "task";
  static TODOLIST_ID = "todolist_id";
  static ORDER = "order";
  static IS_COMPLETE = "is_complete";

  // The compiler will warn us if we forget this. ;-P
  static get TABLE() {
    return "todo_item";
  }

  static convert(instance: object) {
    return plainToInstance(TodoItem, instance);
  }

  // See https://nanosql.io/databases.html#creating-a-database
  // for how to construct a table definition.

  static get TABLE_DEF() {
    return {
      name: this.TABLE,
      model: {
        ...Model.BASE_DEF, // This will inherit the "id" column
        [`${TodoItem.TODOLIST_ID}:number`]: {},
        [`${TodoItem.TASK}:string`]: {},
        [`${TodoItem.ORDER}:int`]: {},
        [`${TodoItem.IS_COMPLETE}:boolean`]: {},
      },
      indexes: {
        // A Foreign key to the TodoList
        [`${TodoItem.TODOLIST_ID}:number`]: {
          foreignKey: {
            // See? This will change if the table or ID changes.
            target: `${TodoList.TABLE}.${TodoList.ID}`,
            onDelete: InanoSQLFKActions.CASCADE,
          },
        },
        // This will increment the "order" column.
        [`${TodoItem.ORDER}:int`]: { offset: 1 },
      },
    };
  }

  public async getTodoList() {
    return (
      await TodoList.filter<TodoItem>([
        TodoItem.TODOLIST_ID,
        "=",
        this.todolist_id,
      ])
    )[0];
  }
}

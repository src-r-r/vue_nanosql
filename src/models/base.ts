import { nSQL } from "@nano-sql/core";
import { instanceToPlain } from "class-transformer";

// We'll define an ID time in case we want to
// change it to a different data type later, like UUID
export type Id = number | null;

export const DB_NAME = "vue_nsql";

export abstract class Model {
  public id: Id;

  // This is the `id` column

  public static ID = "id";

  // Returns the name of the table.
  static get TABLE(): void | string {
    throw new Error(`Not implemented: ${this.name}.TABLE`);
  }

  // converts the object returned from the database into a
  // typescript class. this MUST be done on a per-implementation
  // basis to ensure all methods are "captured"
  static convert(instance: object): unknown {
    throw new Error(`Not implemented: ${this.name}.convert`);
  }

  // This will be included in the child `TABLE_DEF` objects.
  // Don't be scared by the syntax. In the end all this
  // resolves to is {`id:int` : {pk : true, ai : true}}

  public static BASE_DEF = {
    [`${Model.ID}:int`]: { pk: true, ai: true },
  };

  constructor(id: Id | null = null) {
    this.id = id;
  }

  // Just a bit of housekeeping.
  // This is in case another databsae is selected we'll always
  // get back to our test database.
  //
  // I would not recommend for production environments.

  async ensureDb() {
    if (nSQL().listDatabases().indexOf(DB_NAME) >= 0) return;
    await nSQL().useDatabase(DB_NAME).connect();
  }

  async save() {
    const table = (this.constructor as any).TABLE;
    const _t = table || `<unknown table in ${this.constructor.name}>`;
    const data = instanceToPlain(this);
    console.log(`<SAVE> ${_t} : ${JSON.stringify(data)}`);
    await nSQL(table).query("upsert", [data]).exec();
  }

  // We have to do a bit of fancy footwork here.
  // Since this "current" Model has no notion of what the subclasses are,
  // We have to call each subclass's `convert` method in order to
  // return the appropriate class.
  public static async filter<Type>(
    where: unknown[] = [],
    orderBy: string[] = []
  ): Promise<Type[]> {
    const table = this.TABLE as unknown as string; // coerce this to a string
    return (
      await nSQL(table).query("select").where(where).orderBy(orderBy).exec()
    ).map((i) => this.convert(i) as Type);
  }
}

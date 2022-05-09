import { nSQL } from "@nano-sql/core";
import {
  instanceToPlain,
  plainToInstance,
  Type,
  type ClassConstructor,
} from "class-transformer";
import { map } from "lodash";

export type Id = number | null;

export interface Updatable {
  update(): void;
}

export abstract class Model {
  public id: Id;

  public static window: Window | undefined;
  public mWindow: Window | undefined;

  public static ID = "id";

  static get TABLE(): void | string {
    throw new Error(`Not implemented: ${this.name}.TABLE`);
  }

  static convert(instance: object): unknown {
    throw new Error(`Not implemented: ${this.name}.convert`);
  }

  public static BASE_DEF = {
    [`${Model.ID}:int`]: { pk: true, ai: true },
  };

  static get INDEXES() {
    return {};
  }

  constructor(id: Id | null = null) {
    this.id = id;
  }

  async ensureDb() {
    if (nSQL().listDatabases().indexOf("augustine") >= 0) return;
    await nSQL().useDatabase("augustine").connect();
  }

  async save() {
    const table = (this.constructor as any).TABLE;
    const _t = table || `<unknown table in ${this.constructor.name}>`;
    const data = instanceToPlain(this);
    console.log(`<SAVE> ${_t} : ${JSON.stringify(data)}`);
    await nSQL(table).query("upsert", [data]).exec();
  }

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

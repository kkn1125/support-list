export enum COMP_TYPE {
  SI = 0,
  SOL,
  SM,
  STARTUP,
  B2C,
  B2B,
}

export class Data {
  static num: number = 0;
  id: number;
  comp_name: string;
  comp_size: number;
  comp_purpose: string;
  comp_type: COMP_TYPE;
  created_at: number | Date;

  // *auto_increment() {
  //   let index = 0;
  //   for (;;) {
  //     yield ++index;
  //   }
  // }

  constructor({
    comp_name,
    comp_size,
    comp_purpose,
    comp_type,
    created_at,
  }: {
    comp_name?: string;
    comp_size?: number;
    comp_purpose?: string;
    comp_type?: COMP_TYPE;
    created_at?: number | Date;
  } = {}) {
    this.id = Data.num++;
    comp_name && (this.comp_name = comp_name);
    comp_size && (this.comp_size = comp_size);
    comp_purpose && (this.comp_purpose = comp_purpose);
    comp_type && (this.comp_type = comp_type);
    created_at && (this.created_at = created_at);
  }
}

export class Support extends Map {
  constructor() {
    super();
    this.load();
  }

  list() {
    return [...this.values()];
  }

  findAll() {
    return this;
  }

  findOne(id: number) {
    return this.get(id);
  }

  findOneByName(comp_name: string) {
    return [...this.values()].find((comp) => comp.comp_name === comp_name);
  }

  insert(comp: Data) {
    this.set(comp.id, comp);
  }

  update(id: number, comp: Data) {
    if (this.has(id)) {
      const temp = this.get(id);
      Object.keys(comp).forEach((key) => {
        if (!Object.hasOwn(temp, key)) {
          delete comp[key as keyof Data];
        }
      });
      Object.assign(temp, comp);
    } else {
      throw new Error("not found temp");
    }

    return this.get(id);
  }

  delete(id: number) {
    if (this.has(id)) {
      const temp = { ...this.get(id) };
      this.delete(id);
      return temp;
    }

    return false;
  }

  save() {
    console.log("[Method] Save support data.");
    localStorage.setItem("support", JSON.stringify(Object.fromEntries(this)));
  }

  load() {
    console.log("[Init] Loading support datas.");
    const storage = JSON.parse(localStorage.getItem("support") || "{}");
    Object.entries(storage).forEach(([k, v]: [any, any]) => {
      this.set(Number(k), v);
      Data.num = Number(k) + 1;
    });
    console.log("number is", Data.num);
  }
}

export default class Manager {
  support: Support = new Support();
}

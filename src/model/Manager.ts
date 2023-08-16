export enum COMP_TYPE {
  SI = "SI",
  SOL = "SOL",
  SM = "SM",
  STARTUP = "STARTUP",
  B2C = "B2C",
  B2B = "B2B",
}

export class Data {
  static num: number = 0;
  id?: number;
  site?: string;
  comp_name?: string;
  position?: string;
  comp_size?: number;
  comp_purpose?: string;
  comp_type?: COMP_TYPE;
  apply_start?: number | Date;
  end_time?: number | Date;
  created_at?: number | Date;

  // *auto_increment() {
  //   let index = 0;
  //   for (;;) {
  //     yield ++index;
  //   }
  // }

  constructor({
    id,
    site,
    comp_name,
    position,
    comp_size,
    comp_purpose,
    comp_type,
    apply_start,
    end_time,
  }: {
    id?: number;
    site?: string;
    comp_name?: string;
    position?: string;
    comp_size?: number;
    comp_purpose?: string;
    comp_type?: COMP_TYPE;
    apply_start?: number | Date;
    end_time?: number | Date;
    created_at?: number | Date;
  } = {}) {
    this.id = id ?? Data.num++;
    this.site = site || null;
    this.comp_name = comp_name || null;
    this.position = position || null;
    this.comp_size = comp_size || null;
    this.comp_purpose = comp_purpose || null;
    this.comp_type = comp_type || null;
    this.apply_start = apply_start || null;
    this.end_time = end_time || null;
    this.created_at = +new Date();
  }
}

export class Support extends Map {
  constructor() {
    super();
    this.load();
    this.save();
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

  remove(id: number) {
    console.log("has id", id, this.has(id));
    if (this.has(id)) {
      const temp = { ...this.get(id) };
      this.delete(id);
      return temp;
    }

    return false;
  }

  save() {
    console.log("[Method] Save support data.", this);
    console.log("[Method] Save support data.", Object.fromEntries(this));
    localStorage.setItem("support", JSON.stringify(Object.fromEntries(this)));
  }

  load() {
    console.log("[Init] Loading support datas.");
    const storage = JSON.parse(localStorage.getItem("support") || "{}");
    Object.entries(storage).forEach(([k, v]: [any, any]) => {
      this.set(Number(v.id), Object.assign({}, new Data(v)));
      Data.num = Data.num < Number(v.id) + 1 ? Number(v.id) + 1 : Data.num;
    });
    console.log("number is", Data.num);
  }
}

export default class Manager {
  support: Support = new Support();
}

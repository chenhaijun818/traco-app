import {Affair} from "./affair";

export class Track {
  id: string;
  pid: string;
  rid: string;
  name: string;
  affairs: Affair[] = [];
  constructor(data: any) {
    this.id = data._id;
    this.pid = data.pid;
    this.rid = data.rid;
    this.name = data.name;
  }
}

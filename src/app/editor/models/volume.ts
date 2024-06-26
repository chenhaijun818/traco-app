import {Chapter} from "./chapter";

export class Volume {
  id: string;
  pid: string;
  name: string;
  chapters: Chapter[] = [];

  constructor(data: any) {
    this.id = data._id;
    this.pid = data.pid;
    this.name = data.name;
  }
}

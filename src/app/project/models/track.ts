import {Affair} from "./affair";

export class Track {
  id: string;
  name: string;
  affairs: Affair[] = [];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
  }
}

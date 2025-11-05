export class Tag {
  name: string;
  id: string;
  pid: string;
  constructor(data: any) {
    this.name = data.name;
    this.id = data._id;
    this.pid = data.pid;
  }
}

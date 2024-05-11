export class Chapter {
  id: string;
  pid: string;
  vid: string;
  name: string;
  content: string = '';

  constructor(data: any) {
    this.id = data._id;
    this.pid = data.pid;
    this.vid = data.vid;
    this.name = data.name;
  }
}

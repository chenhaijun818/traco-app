export class Thing {
  id: string;
  pid: string;
  name: string;
  creator: string;
  owner: string;
  desc: string;
  avatar: string;

  constructor(data: any) {
    this.id = data._id;
    this.pid = data.pid;
    this.name = data.name;
    this.creator = data.creator;
    this.owner = data.owner;
    this.desc = data.desc;
    this.avatar = data.avatar;
  }
}

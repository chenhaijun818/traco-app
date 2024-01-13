export class Affair {
  id: string;
  name: string;
  pid: string;
  tid: string;
  startTime: Date;
  endTime: Date;
  content: string;
  site: string;
  roles: string[];
  otherRoles: string[];
  sort: number;
  done: boolean;

  constructor(data: any) {
    this.id = data._id;
    this.pid = data.pid;
    this.name = data.name;
    this.tid = data.tid;
    this.startTime = new Date(data.startTime || 0);
    this.endTime = new Date(data.endTime || 0);
    this.content = data.content;
    this.site = data.site || '';
    this.roles = data.roles || [];
    this.otherRoles = data.otherRoles || [];
    this.sort = data.sort;
    this.done = data.done;
  }
}

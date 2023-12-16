export class Affair {
  id: string;
  name: string;
  tid: string;
  startTime: Date;
  endTime: Date;
  content: string;
  site: string;
  roles: string;
  order: number;
  constructor(data: any) {
    this.id = data._id;
    this.name = data.name;
    this.tid = data.tid;
    this.startTime = new Date(data.startTime || 0);
    this.endTime = new Date(data.endTime || 0);
    this.content = data.content;
    this.site = data.site || '';
    this.roles = data.roles || '';
    this.order = data.order;
  }
}

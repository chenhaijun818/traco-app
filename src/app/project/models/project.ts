export class Project {
  id: string;
  name: string;
  desc: string;
  cover: string;
  tags: string[];
  user: string;
  baseTime: number;
  status: number;
  visible: boolean;

  constructor(data: any) {
    this.id = data._id;
    this.name = data.name;
    this.desc = data.desc;
    this.cover = data.cover;
    this.tags = data.tags;
    this.user = data.user;
    this.baseTime = data.baseTime;
    this.status = data.status;
    this.visible = data.visible;
  }
}

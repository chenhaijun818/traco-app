export class Project {
  id: string;
  name: string;
  desc: string;
  cover: string;
  tags: string[];
  user: string;

  constructor(data: any) {
    this.id = data._id;
    this.name = data.name;
    this.desc = data.desc;
    this.cover = data.cover;
    this.tags = data.tags;
    this.user = data.user;
  }
}

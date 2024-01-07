export class Organization {
  id: string;
  name: string;
  projectId: string;
  parentId: string;
  leader: string;
  cadre: string[];
  member: string[];
  site: string;
  subordinates = [];

  constructor(data: any) {
    this.id = data._id;
    this.name = data.name;
    this.projectId = data.projectId;
    this.parentId = data.parentId;
    this.leader = data.leader;
    this.cadre = data.cadre || [];
    this.member = data.member || [];
    this.site = data.site;
  }
}

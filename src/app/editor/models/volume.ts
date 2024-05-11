export class Volume {
  id: string;
  name: string;
  chapters: any[] = [];

  constructor(data: any) {
    this.id = data._id;
    this.name = data.name;
  }
}

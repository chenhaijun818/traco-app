export class Site {
  id: string;
  name: string;
  address: string;
  desc: string;
  constructor(data: any) {
    this.id = data._id;
    this.name = data.name || '-';
    this.address = data.address || '-';
    this.desc = data.desc || '-';
  }
}

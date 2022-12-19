export class User {
  phone = '';
  name = '';
  email = '';
  avatar = '';
  desc: string = '';

  constructor(data: any) {
    this.phone = data.phone;
    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
    this.desc = data.desc;
  }
}

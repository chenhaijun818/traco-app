export class User {
  phone = '';
  name = '';
  email = '';
  avatar = '';
  constructor(data: any) {
    this.phone = data.phone;
    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
  }
}

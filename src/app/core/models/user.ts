export class User {
  phone = '';
  name = '';
  email = '';

  constructor(data: any) {
    this.phone = data.phone;
    this.name = data.name;
    this.email = data.email;
  }
}

export class Role {
  id: string;
  name: string;
  gender: number;
  age: number;
  height: number
  avatar: string;
  beauty: number;
  bust: number;
  waist: number;
  hip: number;
  weight: number;
  virgin: number;
  marriage: number;
  fertility: number;
  desc: string;

  constructor(data: any) {
    this.id = data._id;
    this.name = data.name;
    this.gender = data.gender;
    this.beauty = data.beauty;
    this.age = data.age;
    this.height = data.height;
    this.avatar = data.avatar || 'https://traco-oss.oss-cn-hangzhou.aliyuncs.com/avatars/role-female.jpg';
    this.bust = data.bust;
    this.waist = data.waist;
    this.hip = data.hip;
    this.weight = data.weight;
    this.virgin = data.virgin;
    this.marriage = data.marriage;
    this.fertility = data.fertility;
    this.desc = data.desc;
  }
  update(data: any) {
    this.avatar = data.avatar;
    this.name = data.name;
    this.gender = data.gender;
    this.age = data.age;
    this.height = data.height;
    this.desc = data.desc;
  }
}

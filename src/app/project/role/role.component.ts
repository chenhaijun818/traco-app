import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../models/role";
import {UiService} from "../../core/services/ui.service";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  // project?: Project
  options = ['全部', '男性', '女性'];
  roles: Role[] = [];
  selectedRole: Role | any;
  filter: any = {
    gender: 0
  };
  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private ui: UiService) { }

  ngOnInit(): void {
    this.getRoles();
  }

  addRole() {
    const pid = this.route.snapshot.params['id'];
    const name = prompt('输入角色姓名');
    if (!name) {
      return;
    }
    this.http.post('project/role/add', {pid, name}).subscribe((res: any) => {
      if (res) {
        this.roles.push(new Role(res))
      }
    })
  }

  getRoles() {
    const pid = this.route.snapshot.params['id'];
    this.http.get(`project/role/roles?pid=${pid}`).subscribe((res: any) => {
      if (res && res.length) {
        this.roles.length = 0;
        res.forEach((r: any) => {
          this.roles.push(new Role(r));
        })
      }
    })
  }

  selectRole(role: Role) {
    this.selectedRole = null;
    setTimeout(() => {
      this.selectedRole = role;
    })
  }

  deleteRole(role: Role) {
    const res = confirm('您确定要删除该角色吗？')
    if (!res) {
      return
    }
    this.http.post('project/role/delete', {id: role.id}).subscribe((res: any) => {
      if (res) {
        this.ui.success('删除成功');
        this.roles = this.roles.filter(r => r.id !== role.id)
        this.selectedRole = null;
      }
    })
  }
}

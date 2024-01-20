import {Component, OnInit} from '@angular/core';
import {Role} from "../../models/role";
import {HttpClient} from "@angular/common/http";
import {UiService} from "../../../core/services/ui.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-role-panel',
  templateUrl: './role-panel.component.html',
  styleUrls: ['./role-panel.component.scss']
})
export class RolePanelComponent implements OnInit {
  role: Role | any = new Role({})
  rid = '';
  values: any = {};

  constructor(private http: HttpClient,
              private ui: UiService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // 监听路由变化
    this.route.params.subscribe((params: Params | any) => {
      this.rid = params.id;
      this.getRole();
    });
  }

  getRole() {
    this.http.get(`project/role/${this.rid}`).subscribe((res: any) => {
      if (res) {
        this.role = new Role(res);
        this.values = {...this.role};
      }
    })
  }

  submit(key: string) {
    const value = this.values[key];
    const params: any = {id: this.role.id};
    if (!value) {
      return;
    }
    params[key] = value;
    if (key === 'gender') {
      const avatar = this.role.avatar.split('/').pop();
      if (value === 1 && avatar === 'role-female.jpg') {
        params.avatar = 'https://traco-oss.oss-cn-hangzhou.aliyuncs.com/avatars/role-male.jpg'
      }
      if (value === 2 && avatar === 'role-male.jpg') {
        params.avatar = 'https://traco-oss.oss-cn-hangzhou.aliyuncs.com/avatars/role-male.jpg'
      }
    }
    this.http.post('project/role/update', params).subscribe((res: any) => {
      if (res) {
        this.ui.success('修改成功');
        this.role[key] = value;
        if (params.avatar) {
          this.role.avatar = params.avatar;
        }
      }
    })
  }

  avatarChange(event: any) {
    if (event.type === 'success') {
      const avatar = event.file.response.url;
      this.http.post('project/role/update', {id: this.role.id, avatar}).subscribe((res: any) => {
        if (res) {
          this.ui.success('修改成功');
          this.role.avatar = avatar;
        }
      })
    }
  }

  deleteRole() {
    const res = confirm('您确定要删除该角色吗？')
    if (!res) {
      return
    }
    this.http.post('project/role/delete', {id: this.role.id}).subscribe((res: any) => {
      if (res) {
        this.ui.success('删除成功');
        this.router.navigate(['../'], {relativeTo: this.route, replaceUrl: true})
      }
    })
  }
}

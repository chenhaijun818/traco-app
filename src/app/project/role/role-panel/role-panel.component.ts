import {Component, OnInit} from '@angular/core';
import {Role} from "../../models/role";
import {UiService} from "../../../core/services/ui.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RoleService} from "../role.service";
import {Tag} from "../../models/tag";
import {ClientService} from "../../../core/services/client.service";

@Component({
  selector: 'app-role-panel',
  templateUrl: './role-panel.component.html',
  styleUrls: ['./role-panel.component.scss']
})
export class RolePanelComponent implements OnInit {
  id = '';
  role: Role | any = {};
  tags: Tag[] = [];

  constructor(private ui: UiService,
              private route: ActivatedRoute,
              private router: Router,
              private rs: RoleService,
              private client: ClientService) {
  }

  ngOnInit(): void {
    // 监听路由变化
    this.route.params.subscribe((params: Params | any) => {
      this.id = params.id;
      this.getRole();
    });
    this.rs.tags$.subscribe(tags => {
      this.tags = tags || [];
    })
  }

  getRole() {
    this.client.get(`project/role/${this.id}`).then((res: any) => {
      if (res) {
        this.role = new Role(res);
      }
    })
  }

  submit(key: string) {
    const value = this.role[key];
    const params: any = {id: this.role.id};
    params[key] = value;
    if (key === 'gender') {
      const avatar = this.role.avatar.split('/').pop();
      if (value === 1 && avatar === 'role-female.jpg') {
        params.avatar = 'https://traco-oss.oss-cn-hangzhou.aliyuncs.com/avatars/role-male.jpg'
      }
      if (value === 2 && avatar === 'role-male.jpg') {
        params.avatar = 'https://traco-oss.oss-cn-hangzhou.aliyuncs.com/avatars/role-female.jpg'
      }
    }
    this.client.post('project/role/update', params).then((res: any) => {
      if (res) {
        this.ui.success('修改成功');
        this.role[key] = value;
        if (params.avatar) {
          this.role.avatar = params.avatar;
        }
        this.rs.updateRole(this.role);
      }
    })
  }

  avatarChange(event: any) {
    if (event.type === 'success') {
      const avatar = event.file.response.url;
      this.client.post('project/role/update', {id: this.role.id, avatar}).then((res: any) => {
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
    this.rs.removeRole(this.role.id).then(() => {
      this.ui.success('删除成功')
      this.router.navigate(['../'], {relativeTo: this.route, replaceUrl: true})
    });
  }

  onTagChange() {
    this.client.post('project/role/update', {id: this.role.id, tags: this.role.tags}).then(() => {
      this.rs.updateRole(this.role);
    });
  }
}

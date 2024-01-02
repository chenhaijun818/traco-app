import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../models/role";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  options = ['全部', '男性', '女性'];
  roles: Role[] = [];
  filter: any = {
    gender: 0
  };
  pid = '';

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const parent: ActivatedRoute | any = this.route.parent;
    this.pid = parent.snapshot.params['id'];
    this.getRoles();
  }

  addRole() {
    const name = prompt('输入角色姓名');
    if (!name) {
      return;
    }
    this.http.post('project/role/add', {pid: this.pid, name}).subscribe((res: any) => {
      if (res) {
        const role = new Role(res);
        this.roles.push(role);
        this.router.navigate(['./', role.id], {relativeTo: this.route, replaceUrl: true})
      }
    })
  }

  getRoles() {
    this.http.get(`project/role/roles?pid=${this.pid}`).subscribe((res: any) => {
      if (res && res.length) {
        this.roles = [];
        res.forEach((r: any) => {
          this.roles.push(new Role(r));
        })
      }
    })
  }

}

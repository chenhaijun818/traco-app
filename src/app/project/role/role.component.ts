import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../models/role";
import {RoleService} from "./role.service";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  options = ['全部', '男性', '女性'];
  roles?: Role[];
  filter: any = {
    gender: 0
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rs: RoleService) {
  }

  ngOnInit(): void {
    this.rs.roles$.subscribe(roles => {
      this.roles = roles;
    })
  }

  addRole() {
    const name = prompt('输入角色姓名');
    if (!name) {
      return;
    }
    this.rs.addRole({name}).then(role => {
      if (role) {
        this.router.navigate(['./', role.id], {relativeTo: this.route, replaceUrl: true})
      }
    })
  }

}

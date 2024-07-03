import { Injectable } from '@angular/core';
import {Role} from "../models/role";
import {ClientService} from "../../core/services/client.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  pid: string = '';
  roles: Role[] = [];
  roleMap: Map<string, Role> = new Map();
  roles$ = new BehaviorSubject<Role[] | undefined>(undefined)
  constructor(private client: ClientService) { }

  init(pid: string) {
    this.roles = [];
    this.roleMap.clear();
    this.pid = pid;
    this.getRoles();
  }

  getRoles() {
    this.client.get('project/role/roles', {pid: this.pid}).then((res: any) => {
      if (!res || !res.length) {
        return
      }
      for (const r of res) {
        const role = new Role(r);
        this.roleMap.set(role.id, role);
        this.roles.push(role);
      }
      this.roles$.next(this.roles);
    })
  }

  addRole(params: any) {
    params.pid = this.pid;
    return this.client.post('project/role/add', params).then((res: any) => {
      let role;
      if (res) {
        role = new Role(res);
        this.roles.push(role);
        this.roleMap.set(role.id, role)
        this.roles$.next(this.roles);
      }
      return role;
    });
  }

  removeRole(id: string): void {
    this.roleMap.delete(id);
    this.roles = [...this.roleMap.values()];
  }

  updateRole(newRole: Role) {
    const role = this.roleMap.get(newRole.id);
    role?.update(newRole);
  }
}

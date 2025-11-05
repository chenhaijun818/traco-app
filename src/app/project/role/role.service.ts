import {Injectable} from '@angular/core';
import {Role} from "../models/role";
import {ClientService} from "../../core/services/client.service";
import {BehaviorSubject} from "rxjs";
import {Tag} from "../models/tag";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  pid: string = '';
  roles: Role[] = [];
  roleMap: Map<string, Role> = new Map();
  roles$ = new BehaviorSubject<Role[] | undefined>(undefined);
  tags: Tag[] = [];
  tagMap: Map<string, Tag> = new Map();
  tags$ = new BehaviorSubject<Tag[] | undefined>(undefined);

  constructor(private client: ClientService) {
  }

  init(pid: string) {
    this.roles = [];
    this.roleMap.clear();
    this.pid = pid;
    this.getRoles();
    this.getTags();
  }

  getRoles() {
    this.client.get('project/role/roles', {pid: this.pid}).then((res: any) => {
      if (!res) {
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

  getTags() {
    this.client.get('project/tag/tags', {pid: this.pid}).then((res: any) => {
      if (!res) {
        return
      }
      for (const r of res) {
        const tag = new Tag(r);
        this.tagMap.set(tag.id, tag);
        this.tags.push(tag);
      }
      this.tags$.next(this.tags);
    })
  }

  addTag(tagName: string) {
    return this.client.post('project/tag/add', {name: tagName, pid: this.pid}).then((res: any) => {
      if (res) {
        let tag = new Tag(res);
        this.tags.push(tag);
        this.tagMap.set(tag.id, tag)
        this.tags$.next(this.tags);
      }
      return res;
    });
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

  removeRole(id: string) {
    return this.client.post('project/role/delete', {id}).then((res: any) => {
      if (res) {
        this.roleMap.delete(id);
        this.roles = [...this.roleMap.values()];
        this.roles$.next(this.roles)
      }
      return res;
    })
  }

  removeTag(tid: string) {
    return this.client.post('project/tag/delete', {id: tid}).then(res => {
      if (res) {
        this.tagMap.delete(tid);
        this.tags = [...this.tagMap.values()];
        this.tags$.next(this.tags);
      }
      return res;
    })
  }

  updateRole(newRole: Role) {
    const role = this.roleMap.get(newRole.id);
    role?.update(newRole);
    // this.roles$.next(this.roles);
  }
}

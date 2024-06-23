 import {Component, OnInit} from '@angular/core';
import {Thing} from "../../models/thing";
import {NzUploadChangeParam} from "ng-zorro-antd/upload";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UiService} from "../../../core/services/ui.service";
import {ThingService} from "../thing.service";
 import {Location} from "@angular/common";
 import {Role} from "../../models/role";
 import {ClientService} from "../../../core/services/client.service";

@Component({
  selector: 'app-thing-panel',
  templateUrl: './thing-panel.component.html',
  styleUrls: ['./thing-panel.component.scss']
})
export class ThingPanelComponent implements OnInit {
  id: string = '';
  thing: Thing | any;

  name: string = '';
  avatar: string = '';
  creator: string = '';
  owner: string = '';
  desc: string = '';

  roles: Role[] = [];

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private ui: UiService,
              private client: ClientService,
              private ts: ThingService,
              private location: Location) {
  }

  ngOnInit(): void {
    // 监听路由变化
    this.route.params.subscribe(async (params: Params | any) => {
      this.id = params.id;
      await this.getThing();
      this.getRoles();
    });
  }

  getThing() {
    return this.client.get(`project/thing/${this.id}`).then((res: any) => {
      if (!res) {
        return
      }
      this.thing = this.ts.thingMap.get(this.id);
      if (this.thing) {
        this.thing.update(res);
      } else {
        this.thing = new Thing(res);
        this.ts.addThing(this.thing);
      }
      this.name = this.thing.name;
      this.avatar = this.thing.avatar;
      this.creator = this.thing.creator;
      this.owner = this.thing.owner;
      this.desc = this.thing.desc;
    })
  }

  getRoles() {
    this.client.get('project/role/roles', {pid: this.thing.pid}).then((list: any) => {
      if (list && list.length) {
        this.roles = [];
        for (const r of list) {
          this.roles.push(new Role(r))
        }
      }
    })
  }

  avatarChange(event: NzUploadChangeParam) {
    if (event.type === 'success') {
      const avatar = event.file.response.url;
      this.http.post('project/thing/update', {id: this.thing.id, avatar}).subscribe((res: any) => {
        if (res) {
          this.ui.success('修改成功');
          this.thing.avatar = avatar;
          this.avatar = avatar;
        }
      })
    }
  }

  deleteThing() {
    const res = confirm('您确定要删除该物品吗？');
    if (!res) {
      return
    }
    this.http.post('project/thing/delete', {id: this.thing.id}).subscribe((res: any) => {
      if (res) {
        this.ui.success('删除成功');
        this.ts.removeThing(this.thing);
        this.location.back();
      }
    })
  }

  onCreatorChange() {
    this.client.post('project/thing/update', {id: this.id, creator: this.creator}).then(res => {
      if (res) {
        this.ui.success('修改成功')
      }
    });
  }

  updateName() {
    this.http.post('project/thing/update', {id: this.id, name: this.name}).subscribe((res: any) => {
      if (res) {
        this.ui.success('修改成功');
        this.thing.name = this.name;
      }
    })
  }

  updateDesc() {
    this.http.post('project/thing/update', {id: this.id, desc: this.desc}).subscribe((res: any) => {
      if (res) {
        this.ui.success('修改成功');
        this.thing.desc = this.desc;
      }
    })
  }

  onOwnerChange() {
    this.client.post('project/thing/update', {id: this.id, owner: this.owner}).then(res => {
      if (res) {
        this.ui.success('修改成功')
      }
    });
  }
}

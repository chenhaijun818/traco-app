 import {Component, OnInit} from '@angular/core';
import {Thing} from "../../models/thing";
import {NzUploadChangeParam} from "ng-zorro-antd/upload";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UiService} from "../../../core/services/ui.service";
import {ThingService} from "../thing.service";
 import {Location} from "@angular/common";

@Component({
  selector: 'app-thing-panel',
  templateUrl: './thing-panel.component.html',
  styleUrls: ['./thing-panel.component.scss']
})
export class ThingPanelComponent implements OnInit {
  id: string = '';
  thing: Thing | any;
  values: any = {};

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private ui: UiService,
              private ts: ThingService,
              private location: Location) {
  }

  ngOnInit(): void {
    // 监听路由变化
    this.route.params.subscribe(async (params: Params | any) => {
      this.id = params.id;
      this.getThing();
    });
  }

  getThing() {
    this.http.get(`project/thing/${this.id}`).subscribe((res: any) => {
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
      this.values = {...this.thing};
    })
  }

  submit(key: string) {
    const value = this.values[key];
    const params: any = {id: this.thing.id};
    if (!value) {
      return;
    }
    params[key] = value;
    this.http.post('project/thing/update', params).subscribe((res: any) => {
      if (res) {
        this.ui.success('修改成功');
        this.thing[key] = value;
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
          this.values.avatar = avatar;
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
}

import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UiService} from "../../core/services/ui.service";
import {ActivatedRoute} from "@angular/router";
import {Thing} from "../models/thing";
import {ThingService} from "./thing.service";

@Component({
  selector: 'app-thing',
  templateUrl: './thing.component.html',
  styleUrls: ['./thing.component.scss']
})
export class ThingComponent implements OnInit {
  pid: string = '';
  things: Thing [] = [];

  constructor(private http: HttpClient,
              private ui: UiService,
              private route: ActivatedRoute,
              private ts: ThingService) {
  }

  ngOnInit(): void {
    const parent: ActivatedRoute | any = this.route.parent;
    this.pid = parent.snapshot.params['id'];
    this.ts.things$.subscribe(things => {
      this.things = things;
    })
    this.ts.getThings(this.pid);
    // this.getThings()
  }

  addThing() {
    const name = prompt('请输入物品名称');
    if (!name) {
      return;
    }
    this.http.post('project/thing/add', {name, pid: this.pid}).subscribe((res: any) => {
      if (res) {
        const thing = new Thing(res);
        this.ts.addThing(thing);
        this.ui.success('新增成功')
      }
    })
  }

  deleteThing(thing: Thing) {
    const res = confirm('您确定要删除该物品吗？');
    if (!res) {
      return
    }
    this.http.post('project/thing/delete', {id: thing.id}).subscribe((res: any) => {
      if (res) {
        this.things = this.things.filter(t => t.id !== thing.id);
      }
    })
  }

  getThings() {
    this.http.get(`project/thing/things?pid=${this.pid}`).subscribe((res: any) => {
      if (res && res.length) {
        for (const t of res) {
          this.things.push(new Thing(t))
        }
      }
    })
  }
}

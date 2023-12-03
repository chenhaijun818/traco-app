import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Project} from "../models/project";
import {UiService} from "../../core/services/ui.service";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  project: Project = new Project({});
  affairs: any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private ui: UiService) {
  }

  ngOnInit(): void {
    const pid = this.route.snapshot.params['id'];
    this.http.get(`project/${pid}`).subscribe(res => {
      this.project = new Project(res);
    });
    this.getAffairs();
  }

  // 新增一个事件
  addAffair() {
    const pid = this.project.id;
    const name = '未命名事件';
    const content = '暂时没有内容';
    this.http.post('project/affair/add', {pid, name, content}).subscribe(res => {
      if (res) {
        this.ui.success('新增成功');
        this.getAffairs();
      }
    })
  }

  getAffairs() {
    const pid = this.route.snapshot.params['id'];
    this.http.get('project/affairs', {params: {pid}}).subscribe((res: any) => {
      this.affairs = res.list;
    })
  }

  selectAffair(a: any) {
    console.log(a)
  }
}

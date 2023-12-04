import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Project} from "../models/project";
import {UiService} from "../../core/services/ui.service";
import {Affair} from "../models/affair";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  project: Project = new Project({});
  affairs: Affair[] = [];
  selectedAffair?: Affair;

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
    const name = prompt('输入事件名称');
    if (!name) {
      return;
    }
    const pid = this.project.id;
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
      if (res && res.list) {
        this.affairs = [];
        res.list.forEach((a: any) => {
          this.affairs.push(new Affair(a))
        })
      }
    })
  }

  selectAffair(a: Affair) {
    this.selectedAffair = a;
  }

  deleteAffair() {
    const res = confirm('您确定要删除这个事件吗？');
    if (res) {
      this.http.post('project/affair/delete', {id: this.selectedAffair?.id}).subscribe((res: any) => {
        if (res) {
          this.ui.success('删除成功');
          this.selectedAffair = undefined;
          this.getAffairs();
        }
      })
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Project} from "../models/project";
import {UiService} from "../../core/services/ui.service";
import {Affair} from "../models/affair";
import {Track} from "../models/track";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  project: Project = new Project({});
  tracks: Track[] = [];
  trackMap: Map<string, Track> = new Map();
  affairs: Affair[] = [];
  selectedAffair?: Affair;

  constructor(private route: ActivatedRoute, private http: HttpClient, private ui: UiService) {
  }

  async ngOnInit() {
    const pid = this.route.snapshot.params['id'];
    this.http.get(`project/${pid}`).subscribe(res => {
      this.project = new Project(res);
    });
    await this.getTracks();
    this.getAffairs();
  }

  // 新增一个事件
  addAffair(tid: string) {
    const name = prompt('输入事件名称');
    if (!name) {
      return;
    }
    const pid = this.project.id;
    const content = '暂时没有内容';
    this.http.post('project/affair/add', {pid, name, tid, content}).subscribe(res => {
      if (res) {
        const affair = new Affair(res);
        this.trackMap.get(affair.tid)?.affairs.push(affair);
        this.ui.success('新增成功');
      }
    })
  }

  getAffairs() {
    const pid = this.route.snapshot.params['id'];
    this.http.get('project/affair/list', {params: {pid}}).subscribe((res: any) => {
      if (res && res.list) {
        this.affairs = [];
        res.list.forEach((a: any) => {
          const affair = new Affair(a);
          this.affairs.push(affair);
          this.trackMap.get(affair.tid)?.affairs.push(affair)
        })
      }
    })
  }

  selectAffair(a: Affair) {
    this.selectedAffair = a;
  }

  addTrack() {
    const name = prompt('请输入支线名称');
    if (!name) {
      return
    }
    this.http.post('project/track/add', {name, pid: this.project.id}).subscribe((res: any) => {
      if (res) {
        const track = new Track(res);
        this.tracks.push(track);
        this.trackMap.set(track.id, track);
      }
    })
  }

  getTracks() {
    return firstValueFrom(this.http.get('project/track/tracks', {params: {pid: this.project.id}})).then((res:any)=> {
      if (res && res.length) {
        this.tracks = [];
        this.trackMap.clear();
        res.forEach((t: any) => {
          const track = new Track(t);
          this.tracks.push(track);
          this.trackMap.set(track.id, track);
        })
      }
    });
  }

  deleteTrack(id: string) {
    const res = confirm('您确定删除该支线吗？');
    if (!res) {
      return;
    }
    this.http.post('project/track/delete', {id}).subscribe((res: any) => {
      if (res) {
        this.ui.success('删除成功');
        this.trackMap.delete(id);
        this.tracks = this.tracks.filter(t => t.id !== id);
      }
    })
  }

  visibility(t: Track) {
    console.log(t)
  }
}

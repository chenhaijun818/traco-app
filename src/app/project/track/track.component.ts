import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Project} from "../models/project";
import {UiService} from "../../core/services/ui.service";
import {Affair} from "../models/affair";
import {Track} from "../models/track";
import {firstValueFrom} from "rxjs";
import {TrackService} from "./track.service";

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
  pid = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private ui: UiService,
              private trackService: TrackService) {
  }

  async ngOnInit() {
    const parent: ActivatedRoute | any = this.route.parent;
    this.pid = parent.snapshot.params['id'];
    this.getProject();
    await this.getTracks();
    this.getAffairs();
    // 监听子路由支线信息的变化
    this.trackService.trackSubject.subscribe((t: Track) => {
      const track: Track | any = this.trackMap.get(t.id);
      track.visible = t.visible;
    });
    // 监听子路由事件信息的变化
    this.trackService.affairSubject.subscribe((a: Affair) => {
      const affair: Affair | any = this.affairs.find(affair => affair.id === a.id);
      affair.name = a.name;
      affair.startTime = a.startTime;
      affair.content = a.content;
      affair.site = a.site;
      affair.roles = a.roles;
    });
    // 监听事件删除事件
    this.trackService.deleteAffairSubject.subscribe((a: Affair) => {
      this.affairs = this.affairs.filter(affair => affair.id !== a.id);
      const track = this.trackMap.get(a.tid);
      if (track) {
        track.affairs = track.affairs.filter(affair => affair.id !== a.id);
      }
    })
  }

  getProject() {
    this.http.get(`project/${this.pid}`).subscribe(res => {
      this.project = new Project(res);
    });
  }

  // 新增一个事件
  addAffair(tid: string) {
    const name = prompt('输入事件名称');
    if (!name) {
      return;
    }
    const lastAffair = this.affairs[this.affairs.length - 1];
    let sort = 100;
    if (lastAffair && lastAffair.sort) {
      sort = lastAffair.sort + 100;
    }
    const content = '暂时没有内容';
    const startTime = this.project.baseTime;
    this.http.post('project/affair/add', {
      pid: this.pid, name, sort, tid, content, startTime
    }).subscribe(res => {
      if (res) {
        const affair = new Affair(res);
        this.affairs.push(affair);
        this.trackMap.get(affair.tid)?.affairs.push(affair);
        this.ui.success('新增成功');
        this.router.navigate(['./', affair.id], {replaceUrl: true, relativeTo: this.route})
      }
    })
  }

  getAffairs() {
    this.http.get('project/affair/list', {params: {pid: this.pid}}).subscribe((res: any) => {
      if (res && res.list) {
        this.affairs = res.list.map((a: any) => new Affair(a));
        this.affairs.sort((a: Affair, b: Affair) => {
          return a.sort - b.sort;
        });
        for (const affair of this.affairs) {
          this.trackMap.get(affair.tid)?.affairs.push(affair)
        }
      }
    })
  }
  addTrack() {
    const name = prompt('请输入支线名称');
    if (!name) {
      return
    }
    this.http.post('project/track/add', {name, pid: this.pid}).subscribe((res: any) => {
      if (res) {
        const track = new Track(res);
        this.tracks.push(track);
        this.trackMap.set(track.id, track);
      }
    })
  }

  getTracks() {
    return firstValueFrom(this.http.get('project/track/tracks', {params: {pid: this.pid}})).then((res: any) => {
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

  deleteTrack(track: Track) {
    if (track.affairs.length) {
      this.ui.error('该支线下有事件，不可删除')
      return;
    }
    const res = confirm('您确定删除该支线吗？');
    if (!res) {
      return;
    }
    this.http.post('project/track/delete', {id: track.id}).subscribe((res: any) => {
      if (res) {
        this.ui.success('删除成功');
        this.trackMap.delete(track.id);
        this.tracks = this.tracks.filter(t => t !== track);
      }
    })
  }

  visibility(t: Track) {
    this.http.post('project/track/update', {id: t.id, visible: !t.visible}).subscribe((res: any) => {
      if (res) {
        t.visible = !t.visible;
      }
    })
  }

  forward(t: Track) {
    console.log(t)
  }

  backward(t: Track) {
    console.log(t)
  }
  rename(t: Track) {
    const name = prompt('输入新的名称');
    if (!name) {
      return;
    }
    this.http.post('project/track/update', {id: t.id, name}).subscribe((res: any) => {
      if (res) {
        this.ui.success('修改成功');
        t.name = name;
      }
    })
  }
}

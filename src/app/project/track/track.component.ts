import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Project} from "../models/project";
import {UiService} from "../../core/services/ui.service";
import {Affair} from "../models/affair";
import {Track} from "../models/track";
import {firstValueFrom} from "rxjs";
import {TrackService} from "./track.service";
import {ProjectService} from "../project.service";
import {Role} from "../models/role";

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
  roles: Role[] = [];
  pid = '';

  // 拖拽结束时鼠标位于哪个事件
  endAffair: Affair | null = null;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private ui: UiService,
              private trackService: TrackService,
              private ps: ProjectService) {
  }

  async ngOnInit() {
    const parent: ActivatedRoute | any = this.route.parent;
    this.pid = parent.snapshot.params['id'];
    this.getProject();
    await this.getTracks();
    this.getAffairs();
    this.getRoles();
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
      affair.rolesName = a.rolesName;
      affair.progress = a.progress;
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
  addAffair(track?: Track) {
    const tid = track?.id || 'main';
    const roles = [];
    if (track?.rid) {
      roles.push(track.rid);
    }
    const name = prompt('输入事件名称');
    if (!name) {
      return;
    }
    const lastAffair = this.affairs[0];
    let sort = 1;
    if (lastAffair && lastAffair.sort) {
      sort = lastAffair.sort + 10;
    }
    const content = '暂时没有内容';
    const startTime = this.project.baseTime;
    this.http.post('project/affair/add', {
      pid: this.pid, name, sort, tid, content, startTime, roles
    }).subscribe(res => {
      if (res) {
        const affair = new Affair(res);
        this.affairs.unshift(affair);
        this.trackMap.get(affair.tid)?.affairs.push(affair);
        this.ui.success('新增成功');
        this.router.navigate(['./', affair.id], {replaceUrl: true, relativeTo: this.route})
      }
    })
  }

  getAffairs() {
    this.http.get('project/affair/affairs', {params: {pid: this.pid}}).subscribe((res: any) => {
      if (res) {
        this.affairs = res.map((a: any) => new Affair(a));
        this.affairs.forEach(affair => {
          affair.rolesName = affair.roles.map(rid => this.ps.roleMap.get(rid)?.name)
          affair.siteName = this.ps.siteMap.get(affair.site)?.name
        })
        this.affairs.sort((a: Affair, b: Affair) => {
          return b.sort - a.sort;
        });
        for (const affair of this.affairs) {
          this.trackMap.get(affair.tid)?.affairs.push(affair)
        }
      }
    })
  }

  addTrack(role?: Role) {
    let name: any;
    if (role) {
      name = role.name;
    } else {
      name = prompt('请输入支线名称');
    }
    if (!name) {
      return
    }
    this.http.post('project/track/add', {name, pid: this.pid, rid: role?.id}).subscribe((res: any) => {
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
  dragEnter(a: Affair) {
    this.endAffair = a;
  }

  dragEnd(affair: Affair) {
    if (!this.endAffair) {
      return;
    }
    const nextAffair = this.endAffair;
    let newSort = 0;
    const nextIndex = this.affairs.findIndex(a => a === nextAffair);
    if (nextIndex) {
      const preAffair = this.affairs[nextIndex - 1];
      newSort = nextAffair.sort - (nextAffair.sort - preAffair.sort) / 2;
    } else {
      newSort = nextAffair.sort + 10;
    }

    this.http.post('project/affair/update', {id: affair.id, sort: newSort}).subscribe(() => {
      affair.sort = newSort;
      this.affairs.sort((a: Affair, b: Affair) => {
        return b.sort - a.sort;
      });
      for (const track of this.tracks) {
        track.affairs.sort((a: Affair, b: Affair) => {
          return b.sort - a.sort;
        });
      }
    })
  }

  private getRoles() {
    this.http.get(`project/role/roles?pid=${this.pid}`).subscribe((res: any) => {
      if (res && res.length) {
        for (const r of res) {
          this.roles.push(new Role(r))
        }
      }
    })
  }
}

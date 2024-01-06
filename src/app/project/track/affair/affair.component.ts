import {Component, OnInit} from '@angular/core';
import {Affair} from "../../models/affair";
import {HttpClient} from "@angular/common/http";
import {UiService} from "../../../core/services/ui.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TrackService} from "../track.service";
import {ClientService} from "../../../core/services/client.service";
import {Role} from "../../models/role";
import {Site} from "../../models/site";

@Component({
  selector: 'app-affair',
  templateUrl: './affair.component.html',
  styleUrls: ['./affair.component.scss']
})
export class AffairComponent implements OnInit {
  affair = new Affair({})
  startTime = new Date()
  aid = '';
  roles: Role[] = [];
  sites: Site[] = [];
  constructor(private http: HttpClient,
              private client: ClientService,
              private ui: UiService,
              private route: ActivatedRoute,
              private router: Router,
              private trackService: TrackService) {
  }

  ngOnInit(): void {
    // 监听路由变化
    this.route.params.subscribe(async (params: Params | any) => {
      this.aid = params.id;
      await this.getAffair();
      this.getRoles();
      this.getSites();
    });
  }

  getRoles() {
    this.client.get('project/role/roles', {pid: this.affair.pid}).then((list: any) => {
      if (list && list.length) {
        this.roles = [];
        for (const r of list) {
          this.roles.push(new Role(r))
        }
      }
    })
  }

  getSites() {
    this.client.get('project/site/sites', {pid: this.affair.pid}).then((list: any) => {
      if (list && list.length) {
        this.sites = [];
        for (const s of list) {
          this.sites.push(new Site(s))
        }
      }
    })
  }

  getAffair() {
    return this.client.get(`project/affair/${this.aid}`).then(res => {
      this.affair = new Affair(res);
    })
  }

  deleteAffair() {
    const res = confirm('您确定要删除该事件吗？');
    if (!res) {
      return;
    }
    this.client.post('project/affair/delete', {id: this.affair.id}).then(res => {
      if (res) {
        this.ui.success('删除成功');
        this.trackService.deleteAffairSubject.next(this.affair);
        this.router.navigate(['../'], {relativeTo: this.route, replaceUrl: true});
      }
    })
  }

  updateName() {
    if (this.affair.name) {
      const {id, name} = this.affair;
      this.http.post('project/affair/update', {id, name}).subscribe((res: any) => {
        if (res) {
          this.ui.success('修改成功');
          this.trackService.affairSubject.next(this.affair);
        }
      })
    }
  }

  updateTime($event: any) {
    const id = this.affair.id;
    const startTime = $event.getTime();
    this.http.post('project/affair/update', {id, startTime}).subscribe((res: any) => {
      if (res) {
        this.ui.success('修改成功');
        this.trackService.affairSubject.next(this.affair)
      }
    })
  }

  updateContent() {
    if (this.affair.content) {
      const {id, content} = this.affair;
      this.http.post('project/affair/update', {id, content}).subscribe((res: any) => {
        if (res) {
          this.ui.success('修改成功');
          this.trackService.affairSubject.next(this.affair)
        }
      })
    }
  }
  onRoleChange() {
    const {id, roles} = this.affair;
    this.client.post('project/affair/update', {id, roles});
  }

  onOtherRoleChange() {
    const {id, otherRoles} = this.affair;
    this.client.post('project/affair/update', {id, otherRoles});
  }

  onSiteChange() {
    const {id, site} = this.affair;
    this.client.post('project/affair/update', {id, site});
  }
}

import {Component, OnInit} from '@angular/core';
import {Affair} from "../../models/affair";
import {HttpClient} from "@angular/common/http";
import {UiService} from "../../../core/services/ui.service";
import {ActivatedRoute, Params} from "@angular/router";
import {TrackService} from "../track.service";

@Component({
  selector: 'app-affair',
  templateUrl: './affair.component.html',
  styleUrls: ['./affair.component.scss']
})
export class AffairComponent implements OnInit {
  affair = new Affair({})
  startTime = new Date()
  aid = '';

  constructor(private http: HttpClient,
              private ui: UiService,
              private route: ActivatedRoute,
              private trackService: TrackService) {
  }

  ngOnInit(): void {
    // 监听路由变化
    this.route.params.subscribe((params: Params | any) => {
      this.aid = params.id;
      this.getAffair();
    });
  }

  getAffair() {
    this.http.get(`project/affair/${this.aid}`).subscribe((res: any) => {
      if (res) {
        this.affair = new Affair(res);
      }
    })
  }

  deleteAffair() {
    // this.deleteEmit.emit(this.affair);
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

  updateSite() {
    if (this.affair.site) {
      const {id, site} = this.affair;
      this.http.post('project/affair/update', {id, site}).subscribe((res: any) => {
        if (res) {
          this.ui.success('修改成功')
          this.trackService.affairSubject.next(this.affair)
        }
      })
    }
  }

  updateRoles() {
    if (this.affair.roles) {
      const {id, roles} = this.affair;
      this.http.post('project/affair/update', {id, roles}).subscribe((res: any) => {
        if (res) {
          this.ui.success('修改成功')
          this.trackService.affairSubject.next(this.affair)
        }
      })
    }
  }
}

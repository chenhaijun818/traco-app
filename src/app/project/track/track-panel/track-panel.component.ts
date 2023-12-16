import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Affair} from "../../models/affair";
import {HttpClient} from "@angular/common/http";
import {UiService} from "../../../core/services/ui.service";

@Component({
  selector: 'app-track-panel',
  templateUrl: './track-panel.component.html',
  styleUrls: ['./track-panel.component.scss']
})
export class TrackPanelComponent implements OnInit {
  @Input() affair: Affair | any;
  @Output('delete') deleteEmit = new EventEmitter<Affair>();
  startTime = new Date()

  constructor(private http: HttpClient, private ui: UiService) {
  }

  ngOnInit(): void {
    console.log(this.affair)
  }

  deleteAffair() {
    this.deleteEmit.emit(this.affair);
  }

  updateName() {
    if (this.affair?.name) {
      const {id, name} = this.affair;
      this.http.post('project/affair/update', {id, name}).subscribe((res: any) => {
        if (res) {
          this.ui.success('修改成功')
        }
      })
    }
  }

  updateTime($event: any) {
    const id = this.affair?.id;
    const startTime = $event.getTime();
    this.http.post('project/affair/update', {id, startTime}).subscribe((res: any) => {
      if (res) {
        this.ui.success('修改成功')
      }
    })
  }

  updateContent() {
    if (this.affair?.content) {
      const {id, content} = this.affair;
      this.http.post('project/affair/update', {id, content}).subscribe((res: any) => {
        if (res) {
          this.ui.success('修改成功')
        }
      })
    }
  }

  updateSite() {
    if (this.affair?.site) {
      const {id, site} = this.affair;
      this.http.post('project/affair/update', {id, site}).subscribe((res: any) => {
        if (res) {
          this.ui.success('修改成功')
        }
      })
    }
  }

  updateRoles() {
    if (this.affair?.roles) {
      const {id, roles} = this.affair;
      this.http.post('project/affair/update', {id, roles}).subscribe((res: any) => {
        if (res) {
          this.ui.success('修改成功')
        }
      })
    }
  }
}

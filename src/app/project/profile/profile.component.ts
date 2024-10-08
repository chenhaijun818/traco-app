import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {UiService} from 'src/app/core/services/ui.service';
import {CompatibleDate} from "ng-zorro-antd/date-picker";
import {ProjectService} from "../project.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient,
              private ui: UiService,
              public ps: ProjectService) {
  }

  ngOnInit(): void {

  }

  submitName() {
    const {id, name} = this.ps.project!;
    this.http.post('project/update', {id, name}).subscribe(res => {
      if (res) {
        this.ui.success('修改成功')
      }
    })
  }

  submitDesc() {
    const {id, desc} = this.ps.project!;
    this.http.post('project/update', {id, desc}).subscribe(res => {
      if (res) {
        this.ui.success('修改成功')
      }
    })
  }

  onUpload(event: any) {
    if (event.type === 'success') {
      const cover = event.file.response.url;
      this.http.post('project/update', {id: this.ps.project?.id, cover}).pipe().subscribe(res => {
        if (res) {
          this.ui.success('上传成功');
          this.ps.project!.cover = cover;
        }
      })
    }
  }

  deleteProject() {
    const res = confirm('您确定要删除该作品吗？')
    if (res) {
      this.http.post('project/delete', {id: this.ps.project!.id}).subscribe((res: any) => {
        if (res) {
          this.ui.success('删除成功');
        }
      })
    }
  }

  updateBaseTime($event: CompatibleDate | any) {
    const baseTime = $event.getTime();
    this.http.post('project/update', {id: this.ps.project!.id, baseTime}).subscribe((res: any) => {
      if (res) {
        this.ui.success('修改成功');
      }
    })
  }
}

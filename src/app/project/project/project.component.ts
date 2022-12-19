import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Project} from "../models/project";
import {UiService} from "../../core/services/ui.service";
import {Track} from "../models/track";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project?: Project;
  tracks: Track[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private ui: UiService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.http.get(`project/${id}`).subscribe(res => {
      this.project = new Project(res);
    });
    this.http.get(`project/tracks?pid=${id}`).subscribe((res: any) => {
      if (res && res.list) {
        for (let t of res.list) {
          this.tracks.push(new Track(t))
        }
      }
    })
  }

  updateProjectName() {
    this.http.post('project/update', {id: this.project?.id, name: this.project?.name}).subscribe(res => {
      if (res) {
        this.ui.success('修改成功')
      }
    })
  }

  updateProjectDesc() {
    this.http.post('project/update', {id: this.project?.id, desc: this.project?.desc}).subscribe(res => {
      if (res) {
        this.ui.success('修改成功')
      }
    })
  }

  onChange(event: any) {
    if (event.type === 'success') {
      const cover = event.file.response.url;
      this.http.post('project/update', {id: this.project?.id, cover}).pipe().subscribe(res => {
        if (res) {
          this.ui.success('上传成功');
          this.project!.cover = cover;
        }
      })
    }
  }
}

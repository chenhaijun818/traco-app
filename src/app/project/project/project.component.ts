import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Project} from "../models/project";
import {UiService} from "../../core/services/ui.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project?: Project;

  constructor(private http: HttpClient, private route: ActivatedRoute, private ui: UiService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.http.get(`project/${id}`).subscribe(res => {
      this.project = new Project(res);
    })
  }

  delete() {
    const id = this.route.snapshot.params['id'];
    this.http.post('project/delete', {id}).subscribe(res => {
      console.log(res)
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

  beforeUpload(event: any) {
    console.log(event)
    return false;
  }

  onChange(event: any) {
    console.log(event)
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

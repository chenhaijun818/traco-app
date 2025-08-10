import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Project} from "../models/project";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  projects: any[] = [];
  projectMap: Map<string, Project> = new Map();
  visibles: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.http.get('project/myProjects').subscribe((res: any) => {
      if (res && res.length) {
        this.projects = [];
        this.projectMap.clear();
        res.forEach((p: any) => {
          const project = new Project(p);
          this.projects.push(project);
          this.projectMap.set(project.id, project);
        });
        this.visibles = this.projects.filter(t => t.visible).map(t => t.id);
      }
    })
  }

  createProject() {
    this.http.post('project/create', {}).subscribe((res: any) => {
      this.router.navigate(['/project', res._id])
    })
  }

  onChange(ids: any) {
    const oldIds = this.projects.filter(p => p.visible).map(p => p.id);
    const newIds = ids;
    const a = newIds.filter((id: string) => !oldIds.find(vid => vid === id));
    const b = oldIds.filter((vid: string) => !newIds.find((id: string) => id === vid));
    let id: any = '';
    let flag = false;
    if (a.length) {
      id = a.pop();
      flag = true;
    }
    if (b.length) {
      id = b.pop();
      flag = false;
    }
    this.http.post('project/update', {id, visible: flag}).subscribe((res: any) => {
      if (res) {
        const project: any = this.projectMap.get(id);
        project.visible = flag;
        // this.trackService.trackSubject.next(track);
      }
    })
  }
}

import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getProjects() {
    this.http.get('project/myProjects').subscribe((res: any) => {
      this.projects = res.list;
    })
  }

  createProject() {
    this.http.post('project/create', {}).subscribe(res => {
      console.log(res)
    })
  }
}

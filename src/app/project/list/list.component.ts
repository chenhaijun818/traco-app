import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  projects: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.http.get('project/myProjects').subscribe((res: any) => {
      this.projects = res.list;
    })
  }

  createProject() {
    this.http.post('project/create', {}).subscribe((res: any) => {
      this.router.navigate(['/project', res._id])
    })
  }
}

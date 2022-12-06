import {Component, OnInit} from '@angular/core';
import {AppService} from "../../services/app.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  username = '';

  constructor(public app: AppService, private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.app.logout();
  }

  createProject() {
    this.http.post('project/create', {}).subscribe(res => {
      console.log(res)
    })
  }

  login() {
    this.router.navigate(['/login'])
  }
}

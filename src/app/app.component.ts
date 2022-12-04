import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppService} from "./core/services/app.service";
import {User} from "./core/models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'comiic-app';

  constructor(private router: Router,
              private http: HttpClient,
              private app: AppService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.router.navigate(['/login'])
      return
    }
    this.http.get('user/getUser').subscribe(res => {
      this.app.user = new User(res);
    })
  }
}

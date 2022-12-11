import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AppService} from "../../core/services/app.service";
import {User} from "../../core/models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  phone: string = '18775226607';
  code: string = '';

  constructor(private http: HttpClient, private router: Router, private app: AppService) {
  }

  ngOnInit(): void {
  }

  getCode() {
    this.http.get('user/getCode', {
      params: {phone: this.phone},
      headers: new HttpHeaders({'noToken': 'yes'})
    }).subscribe((res: any) => {
      this.code = res.code;
    })
  }

  login() {
    this.http.post('user/login', {
      phone: this.phone, code: this.code
    }, {
      headers: new HttpHeaders({'noToken': 'yes'})
    }).subscribe((res: any) => {
      if (res.token) {
        localStorage.setItem('token', res.token)
        this.app.user = new User(res.user)
        this.router.navigate(['/'])
      }
    })
  }

  thirdLogin(platform: 'github' | 'ali' | 'wx') {
    console.log(platform)
    if (platform === 'github') {
      // 使用github登录
    }
  }
}

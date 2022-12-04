import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  phone: string = '18775226607';
  code: string = '123456';

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  getCode() {
    this.http.get('user/getCode', {params: {phone: this.phone}}).subscribe(res => {
      console.log(res)
    })
  }

  login() {
    this.http.post('user/login', {phone: this.phone, code: this.code}).subscribe((res: any) => {
      if (res && res.data && res.data.token) {
        localStorage.setItem('token', res.data.token)
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

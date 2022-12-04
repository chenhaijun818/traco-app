import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['login'])
  }

  getUserInfo() {
    this.http.get('user/getUser').subscribe(res => {
      console.log(res)
    })
  }

  test() {
    this.http.get('test').subscribe(res => {
      console.log(res)
    })
  }
}

import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  phone: string = '';
  code: string = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getCode() {
    this.http.get(`http://localhost:3000/user/getCode?phone=${this.phone}`).subscribe(res => {
      console.log(res)
    })
  }

}

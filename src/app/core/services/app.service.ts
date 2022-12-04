import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  user?: User

  constructor(private router: Router) {
  }

  logout() {
    localStorage.removeItem('token')
    this.user = undefined;
    this.router.navigate(['/login'])
  }
}

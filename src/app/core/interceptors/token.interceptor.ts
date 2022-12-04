import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";
import {UiService} from "../services/ui.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private ui: UiService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const noToken = request.headers.get('noToken')
    if (noToken === 'yes') {
      return next.handle(request);
    }
    const token = localStorage.getItem('token') || '';
    if (!token) {
      this.router.navigate([''])
    }
    const [_, userInfoStr] = token.split('.');
    const userInfo = JSON.parse(atob(userInfoStr));
    const now = Date.now();
    const expiredTime = userInfo.exp * 1000;  // 过期时间

    // token过期
    if (now > expiredTime) {
      this.ui.error('登录已过期，请重新登录')
      localStorage.removeItem('token');
      this.router.navigate(['/login'])
    }
    request = request.clone({
      setHeaders: {
        'authorization': `Bearer ${token}`
      }
    });
    return next.handle(request);
  }
}

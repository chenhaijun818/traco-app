import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {UiService} from "../services/ui.service";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private ui: UiService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(() => {
        // 捕获http错误, 并把错误强转为正常返回,在map里处理
        return of(new HttpResponse({body: {code: 400, message: '请求失败, 请稍后重试'}}))
      }),
      map(event => {
        if (event instanceof HttpResponse && event.body) {
          if (event.body.code !== 200) {
            this.ui.error(event.body.message)
          }
          return event.clone({body: event.body.data});
        }
        return event
      })
    );
  }
}

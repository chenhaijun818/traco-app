import {Injectable} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private message: NzMessageService) {
  }

  public error(msg: string, duration = 3000) {
    this.message.error(msg, {
      nzDuration: duration
    })
  }

}

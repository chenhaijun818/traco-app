import {Component, OnInit} from '@angular/core';
import {AppService} from "../../core/services/app.service";
import {User} from "../../core/models/user";
import {NzUploadChangeParam} from "ng-zorro-antd/upload";
import {HttpClient} from "@angular/common/http";
import {UiService} from "../../core/services/ui.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: User = new User({});
  // @ts-ignore
  title: '个人信息'

  constructor(public app: AppService, private http: HttpClient, private ui: UiService) {

  }

  ngOnInit(): void {
    this.user = new User({...this.app.user})
  }

  onChange(event: NzUploadChangeParam) {
    // 头像上传成功，更新用户的头像url
    if (event.type === 'success') {
      const avatar = event.file.response.url;
      this.http.post('user/update', {avatar}).subscribe(res => {
        if (res) {
          this.user.avatar = avatar;
          this.app.user!.avatar = avatar
        }
      })
    }
  }

  submit() {
    this.http.post('user/update', this.user).subscribe(res => {
      if (res) {
        this.ui.success('修改成功');
        this.app.user!.name = this.user.name;
        this.app.user!.phone = this.user.phone;
        this.app.user!.email = this.user.email;
        this.app.user!.desc = this.user.desc;
      }
    })
  }
}

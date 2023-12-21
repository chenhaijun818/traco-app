import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Role} from "../../models/role";
import {HttpClient} from "@angular/common/http";
import {UiService} from "../../../core/services/ui.service";

@Component({
  selector: 'app-role-panel',
  templateUrl: './role-panel.component.html',
  styleUrls: ['./role-panel.component.scss']
})
export class RolePanelComponent implements OnInit {
  @Input('role') role: Role | any;
  @Output('delete') deleteEmitter = new EventEmitter();
  values: any = {};

  constructor(private http: HttpClient,
              private ui: UiService) {
  }

  ngOnInit(): void {
    this.values = {...this.role};
  }

  submit(key: string) {
    const value = this.values[key];
    if (!value) {
      return;
    }
    this.http.post('project/role/update', {[key]: value, id: this.role.id}).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.ui.success('修改成功');
        this.role[key] = value;
      }
    })
  }

  avatarChange(event: any) {
    console.log(event)
    if (event.type === 'success') {
      const avatar = event.file.response.url;
      this.http.post('project/role/update', {id: this.role.id, avatar}).subscribe((res: any) => {
        if (res) {
          this.ui.success('修改成功');
          this.role.avatar = avatar;
        }
      })
    }
  }

  deleteRole() {
    this.deleteEmitter.emit(this.role);
  }
}

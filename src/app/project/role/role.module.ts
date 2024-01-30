import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoleRoutingModule} from './role-routing.module';
import {NzImageModule} from "ng-zorro-antd/image";
import {RolePanelComponent} from "./role-panel/role-panel.component";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  declarations: [
    RolePanelComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    NzImageModule,
    NzUploadModule,
    NzInputModule,
    FormsModule,
    NzSelectModule,
    NzButtonModule
  ]
})
export class RoleModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { SettingsComponent } from './settings/settings.component';
import {NzUploadModule} from "ng-zorro-antd/upload";


@NgModule({
  declarations: [
    LoginComponent,
    SettingsComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        NzUploadModule
    ]
})
export class UserModule { }

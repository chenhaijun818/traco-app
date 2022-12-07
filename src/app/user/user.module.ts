import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    LoginComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }

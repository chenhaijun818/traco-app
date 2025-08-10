import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  {
    path: "login",
    title: "登录轨纪",
    component: LoginComponent
  }, {
    path: 'settings',
    title: '个人信息',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

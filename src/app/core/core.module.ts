import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {HomeComponent} from './home/home.component';
import {NavComponent} from './components/nav/nav.component';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  declarations: [
    HomeComponent,
    NavComponent
  ],
  exports: [
    NavComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    NzDropDownModule,
    NzIconModule
  ]
})
export class CoreModule {
}

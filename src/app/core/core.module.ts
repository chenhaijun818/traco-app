import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {NavComponent} from './components/nav/nav.component';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import { IndexComponent } from './components/index/index.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    NavComponent,
    IndexComponent,
    FilterPipe
  ],
  exports: [
    NavComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    NzAvatarModule
  ]
})
export class CoreModule {
}

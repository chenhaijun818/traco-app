import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrackRoutingModule} from './track-routing.module';
import {ListComponent} from "./list/list.component";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    TrackRoutingModule,
    NzSelectModule,
    FormsModule
  ]
})
export class TrackModule {
}

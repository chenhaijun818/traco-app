import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrackRoutingModule} from './track-routing.module';
import {ListComponent} from "./list/list.component";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {AffairComponent} from "./affair/affair.component";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  declarations: [
    ListComponent,
    AffairComponent
  ],
  imports: [
    CommonModule,
    TrackRoutingModule,
    NzSelectModule,
    FormsModule,
    NzDatePickerModule,
    NzInputModule,
    NzButtonModule
  ]
})
export class TrackModule {
}

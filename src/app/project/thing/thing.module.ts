import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ThingRoutingModule} from './thing-routing.module';
import {ThingPanelComponent} from './thing-panel/thing-panel.component';
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";

@NgModule({
  declarations: [
    ThingPanelComponent
  ],
    imports: [
        CommonModule,
        ThingRoutingModule,
        NzUploadModule,
        NzImageModule,
        NzButtonModule,
        NzInputModule,
        ReactiveFormsModule,
        FormsModule,
        NzOptionComponent,
        NzSelectComponent
    ]
})
export class ThingModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditorRoutingModule} from './editor-routing.module';
import {QuillModule} from "ngx-quill";
import {EditorComponent} from "./editor/editor.component";
import {FormsModule} from "@angular/forms";
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    QuillModule.forRoot({
      modules: {
        toolbar: false
      },
      placeholder: '请输入内容...'
    }),
    FormsModule,
    NzIconModule
  ]
})
export class EditorModule {
}

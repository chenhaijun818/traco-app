import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditorRoutingModule} from './editor-routing.module';
import {QuillModule} from "ngx-quill";
import {EditorComponent} from "./editor/editor.component";
import {FormsModule} from "@angular/forms";


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
      }
    }),
    FormsModule
  ]
})
export class EditorModule {
}

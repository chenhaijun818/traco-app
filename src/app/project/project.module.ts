import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProjectComponent } from './project/project.component';
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  declarations: [
    MyProjectsComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NzEmptyModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule
  ]
})
export class ProjectModule { }

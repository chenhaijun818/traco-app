import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProjectComponent } from './project/project.component';


@NgModule({
  declarations: [
    MyProjectsComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }

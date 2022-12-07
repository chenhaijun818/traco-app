import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyProjectsComponent} from "./my-projects/my-projects.component";
import {ProjectComponent} from "./project/project.component";

const routes: Routes = [
  {
    path: 'my-projects',
    component: MyProjectsComponent
  }, {
    path: 'project/:id',
    component: ProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ListComponent } from './list/list.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: 'project/list',
    component: ListComponent
  }, {
    path: 'project/:id',
    component: IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}

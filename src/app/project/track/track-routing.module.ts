import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from "./list/list.component";
import {AffairComponent} from "./affair/affair.component";

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
  }, {
    path: ':id',
    component: AffairComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackRoutingModule {
}

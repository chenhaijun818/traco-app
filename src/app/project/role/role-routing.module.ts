import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RolePanelComponent} from "./role-panel/role-panel.component";

const routes: Routes = [
  {
    path: ':id',
    component: RolePanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ThingPanelComponent} from "./thing-panel/thing-panel.component";

const routes: Routes = [
  {
    path: ':id',
    component: ThingPanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThingRoutingModule {
}

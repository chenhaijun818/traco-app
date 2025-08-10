import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {IndexComponent} from './index/index.component';
import {ProfileComponent} from "./profile/profile.component";
import {TrackComponent} from "./track/track.component";
import {RoleComponent} from "./role/role.component";
import {SiteComponent} from "./site/site.component";
import {ThingComponent} from "./thing/thing.component";
import {OrganizationComponent} from "./organization/organization.component";

const routes: Routes = [
  {
    path: 'project/list',
    title: '我的作品',
    component: ListComponent
  }, {
    path: 'project/:id',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: ProfileComponent
      }, {
        path: 'profile',
        component: ProfileComponent
      }, {
        path: 'affair',
        component: TrackComponent,
        loadChildren: () => import('./track/track.module').then(m => m.TrackModule)
      }, {
        path: 'role',
        component: RoleComponent,
        loadChildren: () => import('./role/role.module').then(m => m.RoleModule)
      }, {
        path: 'site',
        component: SiteComponent
      }, {
        path: 'thing',
        component: ThingComponent,
        loadChildren: () => import('./thing/thing.module').then(m => m.ThingModule)
      }, {
        path: 'organization',
        component: OrganizationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}

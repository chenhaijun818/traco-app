import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { IndexComponent } from './index/index.component';
import { RoleComponent } from './role/role.component';
import { TrackComponent } from './track/track.component';
import { SiteComponent } from './site/site.component';
import { OrganizationComponent } from './organization/organization.component';
import { ThingComponent } from './thing/thing.component';

const routes: Routes = [
  {
    path: 'project/list',
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
        path: 'role',
        component: RoleComponent
      }, {
        path: 'track',
        component: TrackComponent
      }, {
        path: 'site',
        component: SiteComponent
      }, {
        path: 'thing',
        component: ThingComponent
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

import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {ProjectRoutingModule} from './project-routing.module';
import {IndexComponent} from './index/index.component';
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {FormsModule} from "@angular/forms";
import {NzUploadModule} from "ng-zorro-antd/upload";
import { TrackComponent } from './track/track.component';
import { RoleComponent } from './role/role.component';
import { ListComponent } from './list/list.component';
import { SiteComponent } from './site/site.component';
import { ThingComponent } from './thing/thing.component';
import { OrganizationComponent } from './organization/organization.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ProfileComponent } from './profile/profile.component';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzInputModule} from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    ProfileComponent,
    TrackComponent,
    RoleComponent,
    ListComponent,
    IndexComponent,
    SiteComponent,
    ThingComponent,
    OrganizationComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NzEmptyModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    FormsModule,
    NzUploadModule,
    NzMenuModule,
    NzImageModule,
    NzInputModule,
    NgOptimizedImage
  ]
})
export class ProjectModule {
  name = 'project'
}

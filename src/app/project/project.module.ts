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
import {TrackComponent} from './track/track.component';
import {RoleComponent} from './role/role.component';
import {ListComponent} from './list/list.component';
import {SiteComponent} from './site/site.component';
import {ThingComponent} from './thing/thing.component';
import {OrganizationComponent} from './organization/organization.component';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {ProfileComponent} from './profile/profile.component';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzTimelineModule} from "ng-zorro-antd/timeline";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {AffairComponent} from './track/affair/affair.component';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSegmentedModule} from "ng-zorro-antd/segmented";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {RolePanelComponent} from './role/role-panel/role-panel.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {CoreModule} from "../core/core.module";
import {NzTableModule} from "ng-zorro-antd/table";
import {TrackModule} from "./track/track.module";
import {RoleModule} from './role/role.module';

@NgModule({
  declarations: [
    ProfileComponent,
    TrackComponent,
    RoleComponent,
    ListComponent,
    IndexComponent,
    SiteComponent,
    ThingComponent,
    OrganizationComponent,
    AffairComponent,
    RolePanelComponent
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
    NgOptimizedImage,
    NzTimelineModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzSegmentedModule,
    NzAvatarModule,
    NzSelectModule,
    CoreModule,
    NzTableModule,
    TrackModule,
    RoleModule
  ]
})
export class ProjectModule {
  name = 'project'
}

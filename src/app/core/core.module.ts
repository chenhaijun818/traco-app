import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {HomeComponent} from './home/home.component';
import { NavComponent } from './components/nav/nav.component';


@NgModule({
    declarations: [
        HomeComponent,
        NavComponent
    ],
    exports: [
        NavComponent
    ],
    imports: [
        CommonModule,
        CoreRoutingModule
    ]
})
export class CoreModule {
}

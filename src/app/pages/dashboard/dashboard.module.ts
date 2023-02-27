import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CollegeCardModule } from '@shared/college-card/college-card.module';
import { DashboardCollegeFilterComponent } from './features/dashboard-college-filter/dashboard-college-filter.component';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardCollegeFilterComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CollegeCardModule,
    CoreModule
  ]
})
export class DashboardModule { }

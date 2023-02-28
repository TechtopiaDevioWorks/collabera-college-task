import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollegeRoutingModule } from './college-routing.module';
import { CollegeComponent } from './college.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CollegeCardModule } from '@shared/college-card/college-card.module';


@NgModule({
  declarations: [
    CollegeComponent
  ],
  imports: [
    CommonModule,
    CollegeRoutingModule,
    MatPaginatorModule,
    CollegeCardModule
  ]
})
export class CollegeModule { }

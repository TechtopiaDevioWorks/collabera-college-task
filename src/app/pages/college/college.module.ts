import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollegeRoutingModule } from './college-routing.module';
import { CollegeComponent } from './college.component';


@NgModule({
  declarations: [
    CollegeComponent
  ],
  imports: [
    CommonModule,
    CollegeRoutingModule
  ]
})
export class CollegeModule { }

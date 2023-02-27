import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollegeCardComponent } from './college-card.component';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    CollegeCardComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    CollegeCardComponent
  ]
})
export class CollegeCardModule { }

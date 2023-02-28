import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { DiscoverMoreContainerComponent } from './discover-more-container.component';



@NgModule({
  declarations: [DiscoverMoreContainerComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [DiscoverMoreContainerComponent]
})
export class DiscoverMoreContainerModule { }

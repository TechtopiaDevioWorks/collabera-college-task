import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { DiscoverMoreContainerModule } from '@shared/discover-more-container/discover-more-container.module';


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    DiscoverMoreContainerModule
  ]
})
export class AboutModule { }

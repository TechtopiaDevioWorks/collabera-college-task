import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { CoreModule } from 'src/app/core/core.module';
import { HeaderUserComponent } from './features/header-user/header-user.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderUserComponent
  ],
  imports: [
    CommonModule, CoreModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }

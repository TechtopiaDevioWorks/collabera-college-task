import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerService } from './services/user-manager.service';
import { CollegeManagerService } from './services/college-manager.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [UserManagerService, CollegeManagerService]
})
export class CoreModule { }

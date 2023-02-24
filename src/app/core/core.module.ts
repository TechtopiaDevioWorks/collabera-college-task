import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerService } from './services/user-manager.service';
import { CollegeManagerService } from './services/college-manager.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule
  ],
  exports: [
    CommonModule, RouterModule, ReactiveFormsModule
  ],
  providers: [UserManagerService, CollegeManagerService]
})
export class CoreModule { }

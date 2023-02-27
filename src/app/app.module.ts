import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './features/layout/layout.module';
import { UserManagerService } from '@core/services/user-manager.service';
import { CollegeManagerService } from '@core/services/college-manager.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
  ],
  providers: [UserManagerService, CollegeManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

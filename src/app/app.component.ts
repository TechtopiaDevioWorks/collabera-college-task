import { Component, OnInit } from '@angular/core';
import { CollegeManagerService } from '@core/services/college-manager.service';
import { UserManagerService } from '@core/services/user-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private _user: UserManagerService) {

  }

  ngOnInit(): void {
    this._user.checkUser();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserManagerService } from '@core/services/user-manager.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-header-user',
	templateUrl: './header-user.component.html',
	styleUrls: ['./header-user.component.scss'],
})
export class HeaderUserComponent implements OnInit, OnDestroy {
	isUserLoggedIn = false;
  username = '';
	private userLoggedInSubscription: Subscription | null = null;
  private usernameSubscription: Subscription | null = null;
	constructor(private _user: UserManagerService) {}
	ngOnInit(): void {
		this.userLoggedInSubscription = this._user.loggedIn.subscribe((status) => {
			this.isUserLoggedIn = status;
		});
    this.usernameSubscription = this._user.username.subscribe((username) => {
      this.username = username;
    })
	}

	ngOnDestroy(): void {
		if (this.userLoggedInSubscription) {
			this.userLoggedInSubscription.unsubscribe();
			this.userLoggedInSubscription = null;
		}
    if (this.usernameSubscription) {
			this.usernameSubscription.unsubscribe();
			this.usernameSubscription = null;
		}
	}

  onLogoutClick() {
    this._user.logout();
  }
}

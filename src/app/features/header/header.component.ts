import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserManagerService } from '@core/services/user-manager.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	mobileState = false;
	isUserLoggedIn = false;

	private userLoggedInSubscription: Subscription | null = null;
	constructor(private _user: UserManagerService) {}
	ngOnInit(): void {
		this.userLoggedInSubscription = this._user.loggedIn.subscribe((status) => {
			this.isUserLoggedIn = status;
		});
	}

	ngOnDestroy(): void {
		if (this.userLoggedInSubscription) {
			this.userLoggedInSubscription.unsubscribe();
			this.userLoggedInSubscription = null;
		}
	}
	toggleMobileNavigation() {
		this.mobileState = !this.mobileState;
	}
}

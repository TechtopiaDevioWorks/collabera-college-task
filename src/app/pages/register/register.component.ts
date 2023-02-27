import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CollegeManagerService } from '@core/services/college-manager.service';
import { UserManagerService } from '@core/services/user-manager.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	registerForm = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.min(2), Validators.max(25)]),
		firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
		lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
		email: new FormControl('', [Validators.required, Validators.email]),
		branch: new FormControl<null | string>(null, [Validators.required]),
		percentage: new FormControl<null | number>(null, [Validators.required]),
		password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
		passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25),]),
	});
	branchList: string[] = [];
	requestLoading = false;
	registerError = '';
	constructor(private _user: UserManagerService, private _college: CollegeManagerService, private _router: Router) {}

	ngOnInit(): void {
		this.initBranchList();
		this.registerForm
			.get('passwordConfirmation')
			?.addValidators(
				this.checkPasswords
			);
	}

	async initBranchList() {
		this.branchList = await this._college.getBranches();
	}
	async onRegisterSubmit() {
		if (this.requestLoading) {
			return;
		}
		if (this.registerForm.valid) {
			this.requestLoading = true;
			this.registerError = '';
			const user = {
				username: this.registerForm.get('username')?.value,
				firstname: this.registerForm.get('firstName')?.value,
				lastname: this.registerForm.get('lastName')?.value,
				email: this.registerForm.get('email')?.value,
				password: this.registerForm.get('password')?.value,
				branch: this.registerForm.get('branch')?.value,
				percentage: this.registerForm.get('percentage')?.value,
			};
			if (
				user.username &&
				user.password &&
				user.firstname &&
				user.lastname &&
				user.email &&
				user.branch &&
				user.percentage
			) {
				const loginStatus = await this._user.register(
					user.username,
					user.firstname,
					user.lastname,
					user.email,
					user.password,
					user.branch,
					user.percentage
				);
				if (loginStatus) {
					this._router.navigate(['/login'], { queryParams: { registerSuccess: true } });
				} else {
					this.registerError = 'Register Failed! Try again!';
				}
			}
		}
		this.requestLoading = false;
	}

	private checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass =this.registerForm.get('password')?.value;
    let confirmPass = this.registerForm.get('passwordConfirmation')?.value
    return pass === confirmPass ? null : { notSame: true }
  }
}

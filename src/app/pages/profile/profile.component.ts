import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CollegeManagerService } from '@core/services/college-manager.service';
import { UserManagerService } from '@core/services/user-manager.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	profileForm = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.min(2), Validators.max(25)]),
		firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
		lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
		email: new FormControl('', [Validators.required, Validators.email]),
		branch: new FormControl<null | string>(null, [Validators.required]),
		percentage: new FormControl<null | number>(null, [Validators.required]),
	});
	branchList: string[] = [];
  fieldInEdit: string|null = null;
  fieldLoading: string | null = null;
	constructor(private _user: UserManagerService, private _college: CollegeManagerService) {}

	ngOnInit(): void {
		this.initBranchList();
    this.initForm();
	}

  initForm() {
    this.profileForm.reset();
    this.profileForm.get('username')?.disable();
    this.profileForm.get('firstName')?.disable();
    this.profileForm.get('lastName')?.disable();
    this.profileForm.get('email')?.disable();
    this.profileForm.get('branch')?.disable();
    this.profileForm.get('percentage')?.disable();
    const user = this._user.getUserInfo();
    if(user) {
      this.profileForm.get('username')?.setValue(user.username);
      this.profileForm.get('firstName')?.setValue(user.firstname);
      this.profileForm.get('lastName')?.setValue(user.lastname);
      this.profileForm.get('email')?.setValue(user.email);
      this.profileForm.get('branch')?.setValue(user.branch);
      this.profileForm.get('percentage')?.setValue(user.percentage);
    }
  }

	async initBranchList() {
		this.branchList = await this._college.getBranches();
	}

  go2EditField(fieldName: string) {
    const field = this.profileForm.get(fieldName);
    if(!field) {
      this.fieldInEdit = null;
      return
    }
    this.fieldInEdit = fieldName;
    field.enable();
  }

  cancelEditField() {
    this.fieldInEdit = null;
    this.fieldLoading = null;
    this.initForm();
  }

  async saveEditField(fieldName: string) {
    const field = this.profileForm.get(fieldName)
    const user = this._user.getUserInfo();
    if(!field || !user) {
      this.cancelEditField();
      return
    }
    this.fieldLoading = fieldName;
    await this._user.updateUserField(user.id, fieldName, field.value)
    this.fieldLoading = null;
    this.cancelEditField()
  }
}

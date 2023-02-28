import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { College } from '@core/interfaces/college';
import { CollegeFilter } from '@core/interfaces/navigation';
import { CollegeManagerService } from '@core/services/college-manager.service';
import { UserManagerService } from '@core/services/user-manager.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.scss']
})
export class CollegeComponent implements OnInit {
	filterInfo: CollegeFilter = {};

	collegeList: College[] = [];

	pageSize = 10;
	pageNumber = 0;
	collegeListLength = 0;

	constructor(private _college: CollegeManagerService, private _user: UserManagerService) {}

	ngOnInit(): void {
    const userInfo = this._user.getUserInfo();
    if(userInfo) {
      this.filterInfo.branch = userInfo.branch;
      this.filterInfo.minScore = userInfo.percentage - 2;
      this.filterInfo.maxScore = userInfo.percentage + 2;
    }
    this.onFilterChange();
	}

	async onFilterChange() {
		this.collegeListLength = await this._college.getCollegeListLength(
			this.filterInfo.region ?? null,
			this.filterInfo.branch ?? null,
			this.filterInfo.minScore ?? null,
			this.filterInfo.maxScore ?? null
		);
		this.pageNumber = 0;
		await this.refreshList();
	}

	async refreshList() {
		this.collegeList = await this._college.getCollegeList(
			this.filterInfo.region ?? null,
			this.filterInfo.branch ?? null,
			this.filterInfo.minScore ?? null,
			this.filterInfo.maxScore ?? null,
			this.pageSize,
			this.pageNumber
		);
	}

	onPaginatorChange(e: PageEvent) {
		this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    this.refreshList();
	}
}
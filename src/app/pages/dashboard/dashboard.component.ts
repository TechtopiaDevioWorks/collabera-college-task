import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { College } from '@core/interfaces/college';
import { CollegeFilter } from '@core/interfaces/navigation';
import { CollegeManagerService } from '@core/services/college-manager.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	filterInfo: CollegeFilter = {};

	collegeList: College[] = [];

	pageSize = 10;
	pageNumber = 0;
	collegeListLength = 0;

	constructor(private _college: CollegeManagerService) {}

	ngOnInit(): void {
		this.onFilterChange({});
    
	}

	async onFilterChange(newFilter: CollegeFilter) {
		this.filterInfo = newFilter;
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

  onBannerClick() {
  window.open('https://www.amazon.com', "_blank", "resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no, location=no, width=1000, height=600" );
  }
}

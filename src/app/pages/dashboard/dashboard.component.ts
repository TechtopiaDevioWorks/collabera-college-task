import { Component, OnInit } from '@angular/core';
import { College } from '@core/interfaces/college';
import { CollegeFilter } from '@core/interfaces/navigation';
import { CollegeManagerService } from '@core/services/college-manager.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  filterInfo: CollegeFilter = {};

  collegeList: College[] = [];

  constructor (private _college: CollegeManagerService) {

  }

  ngOnInit(): void {
    this.onFilterChange({});
  }

  async onFilterChange(newFilter: CollegeFilter) {
    this.filterInfo = newFilter;
    this.collegeList = await this._college.getCollegeList(newFilter.region ?? null, newFilter.branch ?? null,
      newFilter.minScore ?? null, newFilter.maxScore ?? null, 10, 0);
    console.log(this.collegeList);
  }
}

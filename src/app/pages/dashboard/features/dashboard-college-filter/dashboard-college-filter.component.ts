import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CollegeFilter } from '@core/interfaces/navigation';
import { CollegeManagerService } from '@core/services/college-manager.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-dashboard-college-filter',
	templateUrl: './dashboard-college-filter.component.html',
	styleUrls: ['./dashboard-college-filter.component.scss'],
})
export class DashboardCollegeFilterComponent implements OnInit, OnDestroy {
	filterForm = new FormGroup({
		region: new FormControl<string>(''),
		branch: new FormControl<string>(''),
		minScore: new FormControl<number>(0, [Validators.min(0)]),
		maxScore: new FormControl<number>(100, [Validators.max(100)]),
	});
	regionList: string[] = [];
	branchList: string[] = [];
  formSubscription: Subscription | null = null;
  filterData: CollegeFilter = {
    region: '',
    branch: '',
    minScore: 0,
    maxScore: 100
  }
  @Output() filterOut: EventEmitter<CollegeFilter> = new EventEmitter();
	constructor(private _college: CollegeManagerService) {}

	ngOnInit(): void {
		this.initBranchList();
    this.initRegionList();
    this.formSubscription = this.filterForm.valueChanges.subscribe((newValues) => {
      this.filterData=newValues;
      this.filterOut.next(this.filterData);
    })
	}

  ngOnDestroy(): void {
    if(this.formSubscription) {
      this.formSubscription.unsubscribe();
      this.formSubscription = null;
    }
  }

	async initBranchList() {
		this.branchList = await this._college.getBranches();
	}

	initRegionList() {
		this.regionList = this._college.getRegionList();
	}
}

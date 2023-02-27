import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, throwError } from 'rxjs';
import { College } from '@core/interfaces/college';

@Injectable({
	providedIn: 'root',
})
export class CollegeManagerService {
	private apiUrl = 'http://localhost:3000/';
	private collegeList: College[] = [];
	private regionList: string[] = ['Amravati', 'Aurangabad', 'Mumbai', 'Nagpur', 'Nashik', 'Prune'];
	private latestFilterList: College[] = [];
	private latestFilter: string | null = null;
	constructor(private _http: HttpClient) {}

	async getBranches(): Promise<string[]> {
		if (!this.collegeList || this.collegeList.length === 0) {
			await this.initCollegeList();
		}
		const branches = Array.from(new Set(this.collegeList.map((e) => e.branch)));
		return branches;
	}

  getRegionList() {
    return this.regionList;
  }

	async getCollegeList(
		region: String | null = null,
		branch: String | null = null,
		minScore: number | null = null,
		maxScore: number | null = null,
		results: number = 10,
		page: number = 0
	) {
		if (!this.collegeList || this.collegeList.length === 0) {
			await this.initCollegeList();
		}
		const filter: any = {};
		if (region) filter.region = region;
		if (branch) filter.branch = branch;
		if (minScore) filter.minScore = minScore;
		if (maxScore) filter.maxScore = maxScore;
		if (this.latestFilter === JSON.stringify(filter) && this.latestFilterList && this.latestFilterList.length > 0) {
		} else {
			this.latestFilterList = this.collegeList.filter((college) => {
				return Object.keys(filter).every((key) => {
					if (key === 'minScore') {
						return college.meritScore >= filter[key];
					} else if (key === 'maxScore') {
						return college.meritScore <= filter[key];
					} else return college[key] === filter[key];
				});
			});
			this.latestFilter = JSON.stringify(filter);
		}
		const start = page * results;
		const end = start + results;
		return this.latestFilterList.slice(start, end);
	}

	async getCollegeListLength(
		region: String | null = null,
		branch: String | null = null,
		score_min: number | null = null,
		score_max: number | null = null
	) {
		if (!this.collegeList || this.collegeList.length === 0) {
			await this.initCollegeList();
		}
		const filter: any = {};
		if (region) filter.region = region;
		if (branch) filter.branch = branch;
		if (score_min) filter.score_min = score_min;
		if (score_max) filter.score_max = score_max;
		if (this.latestFilter === JSON.stringify(filter) && this.latestFilterList && this.latestFilterList.length > 0) {
		} else {
			this.latestFilterList = this.collegeList.filter((college) => {
				return Object.keys(filter).every((key) => {
					if (key === 'score_min') {
						return college.meritScore >= filter[key];
					} else if (key === 'score_max') {
						return college.meritScore <= filter[key];
					} else return college[key] === filter[key];
				});
			});
			this.latestFilter = JSON.stringify(filter);
		}
		return this.latestFilterList.length;
	}

	async initCollegeList() {
		try {
			const res = await firstValueFrom(this._http.get<any[]>(this.apiUrl + `college`));
			if (res.length > 0) {
				this.collegeList = res.map((e) => {
					const institute = this.extractInstituteCodeName(e.Institute);
					const region = this.getRegionFromCode(institute.code);
					const college: College = {
						id: e._id.$oid,
						srno: e.SrNo,
						meritScore: parseFloat(e.Merit_Score),
						choiceCode: parseFloat(e.Choice_Code),
						institute: this.removeNewlinesAndExtraSpaces(institute.name),
						branch: this.removeNewlinesAndExtraSpaces(e.Course_Name),
						exam: e.Exam_JEEMHT__CET,
						type: e.Type,
						seatType: e.Seat_Type,
						instituteCode: institute.code,
						region: region,
					};
					return college;
				});
				return true;
			} else {
				return false;
			}
		} catch (e) {
			this.handleError(e);
			return false;
		}
	}

	private getRegionFromCode(code: number) {
		if (code >= 1000 && code < 2000) {
			return 'Amravati';
		} else if (code >= 2000 && code < 3000) {
			return 'Aurangabad';
		} else if (code >= 3000 && code < 4000) {
			return 'Mumbai';
		} else if (code >= 4000 && code < 5000) {
			return 'Nagpur';
		} else if (code >= 5000 && code < 6000) {
			return 'Nashik';
		} else if (code >= 6000 && code < 7000) {
			return 'Prune';
		} else {
			return 'Unknown';
		}
	}

	private removeNewlinesAndExtraSpaces(str: string) {
		const regex = /[\r\n\t\f\v]/g; //newline + extra
		const singleSpaceRegex = /\s+/g; // all whitespace characters
		const cleanedStr = str.replace(regex, ' '); // replace newlines
		const finalStr = cleanedStr.replace(singleSpaceRegex, ' '); // replace multiple spaces with single space
		return finalStr.trim();
	}

	private extractInstituteCodeName(institute: string) {
		const regex = /\d+/;
		const match = institute.match(regex);
		if (match) {
			const code = parseFloat(match[0]);
			const name = institute.replace(regex, '').trim();
			return { code, name };
		} else {
			return { code: 0, name: institute };
		}
	}

	private handleError(error: HttpErrorResponse | unknown) {
		if (error instanceof HttpErrorResponse) {
			if (error.status === 0) {
				console.error('An error occurred:', error.error);
			} else {
				console.error(`Backend returned code ${error.status}, body was: `, error.error);
			}
		}
		return throwError(() => new Error('Error; please try again later.'));
	}
}

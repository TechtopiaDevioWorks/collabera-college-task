import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, throwError } from 'rxjs';
import { College } from '@core/interfaces/college';

@Injectable({
  providedIn: 'root'
})
export class CollegeManagerService {
  private apiUrl = 'http://localhost:3000/';
  private collegeList: College[] = [];
  constructor(private _http: HttpClient) {}


  async getBranches(): Promise<string[]> {
    if(!this.collegeList || this.collegeList.length === 0) {
      await this.initCollegeList();
    }
    const branches = Array.from(new Set(this.collegeList.map(e => e.courseName)));
    return branches;
  }

  async initCollegeList() {
    try {
			const res = await firstValueFrom(
				this._http.get<any[]>(this.apiUrl + `college`)
			);
			if (res.length > 0) {
				this.collegeList = res.map(e => {
          const college: College = {
            id: e._id.$oid,
            srno: e.SrNo,
            meritScore: Number(e.Merit_Score),
            choiceCode: e.Choice_Code,
            institute: e.Institute,
            courseName: e.Course_Name,
            exam: e.Exam_JEEMHT__CET,
            type: e.Type,
            seatType: e.Seat_Type
          }
          return college;
        })
        return true;
			} else {
        return false;
      }
		} catch (e) {
			this.handleError(e);
      return false;
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { BehaviorSubject, firstValueFrom, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class UserManagerService {
	private apiUrl = 'http://localhost:3000/';
	private _user: User | null = null;
	loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  username: BehaviorSubject<string> = new BehaviorSubject('');
	constructor(private _http: HttpClient, private _router: Router) {}

	async checkUser() {
    if(this._user) {
      this.loggedIn.next(true)
    } else {
      if(localStorage) {
        const userToken = localStorage.getItem('userToken');
        if(userToken) {
          try {
            const res = await firstValueFrom(
              this._http.get<User[]>(this.apiUrl + `user?token=${userToken}`)
            );
            if (res.length === 1) {
              this._user = res[0];
              this.saveUserLocal();
              this.loggedIn.next(true);
              this.updateUserToken(this._user.id, this.generateUserToken())
            } else {
              this.logout();
            }
          } catch (e) {
            this.handleError(e);
            this.logout()
          }
        } else {
          this.logout();
        }
      }
      else {
        this.logout()
      }
    }
  }

  getUserInfo() {
    return this._user
  }

  async register(username: string, firstname: string, lastname: string, email: string, password: string, branch: string, percentage:number): Promise<boolean> {
    try {
      await this.delay(1000)
      const checkres = await firstValueFrom(
				this._http.get<User[]>(this.apiUrl + `user?username=${username}`)
			);
      if (checkres.length > 0) {
        return false;
      }
      const body = {
        username,firstname, lastname, email, password, branch, percentage
      }
			const res = await firstValueFrom(
				this._http.post(this.apiUrl + `user`, body)
			);
      console.log(res)
			if (res) {
        return true;
			}
      return false;
		} catch (e) {
			this.handleError(e);
      return false;
		}
  }

	async login(username: string, password: string): Promise<boolean>{
		try {
			await this.delay(1000);
			const res = await firstValueFrom(
				this._http.get<User[]>(this.apiUrl + `user?username=${username}&password=${password}`)
			);
			if (res.length === 1) {
				this._user = res[0];
				this.saveUserLocal();
				this.loggedIn.next(true);
        this.updateUserToken(this._user.id, this.generateUserToken())
        return true;
			} else {
        return false;
      }
		} catch (e) {
			this.handleError(e);
      return false;
		}
	}

  logout() {
    if(localStorage) {
      localStorage.removeItem('userToken')
    }
    this._user = null;
    this.loggedIn.next(false);
    this._router.navigate(['/dashboard'], {queryParams: {logout: true}})
  }

	saveUserLocal() {
    if(!this._user) return 
    this.username.next(this._user.username)
		if (localStorage) {
			localStorage.setItem('userToken', this._user.token);
		}
	}

  async updateUserField(userId: number, fieldName: string, fieldValue: any) {
		try {
      await this.delay(1000)
      const body = {

      }
      Object.defineProperty(body, fieldName, {value: fieldValue, enumerable: true})
			const res = await firstValueFrom(
				this._http.patch<User>(this.apiUrl + `user/${userId}`, body)
			);
			if (res) {
				this._user = res;
				this.saveUserLocal();
			}
		} catch (e) {
			this.handleError(e);
		}
	}

	async updateUserToken(userId: number, newToken: string) {
		try {
			const res = await firstValueFrom(
				this._http.patch<User>(this.apiUrl + `user/${userId}`, {
          "token": newToken
        })
			);
			if (res) {
				this._user = res;
				this.saveUserLocal();
			}
		} catch (e) {
			this.handleError(e);
		}
	}

	private generateUserToken() {
		const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let token = '';
		for (let i = 0; i < 30; i++) {
			token += chars[Math.floor(Math.random() * chars.length)];
		}
		return token;
	}

	private delay(ms: number) {
		return new Promise((res) => setTimeout(res, ms));
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

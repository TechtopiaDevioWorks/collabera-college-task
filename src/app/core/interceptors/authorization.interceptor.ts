import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserManagerService } from '@core/services/user-manager.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private _user: UserManagerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this._user.getUserInfo();

    if (user) {
      // If we have a token, we set it to the header
      request = request.clone({
         setHeaders: {Authorization: `Bearer ${user.token}`}
      });
    }
    return next.handle(request);
  }
}

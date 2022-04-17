import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileService } from '../../services/tasks-api/profile/profile.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  token: string = '';

  constructor(private getauthToken: ProfileService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getauthToken.getToken();
    if (token) {
      return next.handle(request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }))
    } else {
      return next.handle(request);
    }

  }

  /*   addAuthToken(request: HttpRequest<any>) {
      const token = this.authService.getAuthToken();
  
      return request.clone({
          setHeaders: {
            Authorization: `Basic ${token}`
          }
      })
    } */
}
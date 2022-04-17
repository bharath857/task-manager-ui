import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map } from 'rxjs/operators';
import { Param, UtilService } from '../../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  token: string = '';
  userid: string = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient, private utilService: UtilService) { }

  sineUpforTaskAPI(name: string, email: string, password: string) {
    let params: Param[] = []
    let requestParams = {
      name,
      email,
      password
    }
    let url = this.utilService.generateURL('/users', params)
    return this.http.post(url, requestParams, this.httpOptions).pipe(map((response: any) => {
      this.setToken(response.token)
      let res = {
        success: true,
        user: response.user
      }
      return res
    }), catchError(error => {
      let response = {
        success: false,
        error
      }
      if (error?.error?.error?.errors?.email.message) {
        response['error'] = error.error.error.errors.email.message
      } else {
        response['error'] = 'Creating Account Failed'
      }
      return of(response);
    })
    )
  }

  login(email: string, password: string) {
    let params: Param[] = [];
    let requestParams = {
      email: email,
      password: password
    }
    let url = this.utilService.generateURL('/users/login', params)
    return this.http.post(url, requestParams, this.httpOptions).pipe(map((response: any) => {

      this.setToken(response.token)
      return response.user
    }), catchError(error => {
      console.log(error);
      return of(null);
    }))
  }

  logout() {
    let params: Param[] = [];
    let url = this.utilService.generateURL('/users/logout', params)
    return this.http.post(url, this.httpOptions)
  }

  logoutAll() {
    let params: Param[] = [];
    let url = this.utilService.generateURL('/users/logoutAll', params)
    return this.http.post(url, this.httpOptions)
  }

  getToken() {
    return this.token
  }

  setToken(token: string) {
    this.token = token;
  }

  updateUserProfile(property: userProfile) {
    let params: Param[] = [];
    let req = {
      ...property
    }
    let url = this.utilService.generateURL('/users/profile', params)
    return this.http.patch(url, req, this.httpOptions)
  }

  getUserInfo(){
    let params: Param[] = [];
    let url = this.utilService.generateURL('/users/profile', params)
    return this.http.get(url, this.httpOptions)
  }

  deleteMyProfile() {
    let params: Param[] = [];
    let url = this.utilService.generateURL('/users/profile', params)
    return this.http.delete(url, this.httpOptions)
  }

  updateUserProfileImage(req: string) {
    let params: Param[] = [];
    let url = this.utilService.generateURL('/users/profile/avatar', params)
    return this.http.post(url, req, this.httpOptions)
  }

  getuserImage(id: string) {
    let params: Param[] = [];
    let url = this.utilService.generateURL('/users/' + id + '/avatar', params)
    console.log(url)
    return this.http.get(url, this.httpOptions)
  }

  removeImage(id: string) {
    let params: Param[] = [];
    let url = this.utilService.generateURL('/users/profile/avatar', params)
    return this.http.delete(url, this.httpOptions)
  }

  setuserID(Id: string) {
    this.userid = Id;
  }

  getuserID() {
    return this.userid;
  }
}
export interface userProfile {
  name?: string,
  email?: string,
  password?: string,
  age?: number
}
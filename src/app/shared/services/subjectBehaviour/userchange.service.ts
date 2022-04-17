import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserchangeService {

  userid: string = '';

  private userSubject = new BehaviorSubject(this.userid)
  userChanged = this.userSubject.asObservable();

  constructor() { }

  setNewUser(newuser: string) {
    this.userid = newuser;
    this.userSubject.next(newuser)
  }
}


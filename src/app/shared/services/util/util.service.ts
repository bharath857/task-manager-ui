import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Param {
  key: string;
  value: string | boolean | number;
}

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  config: any;
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor() {
    console.log(environment)
    this.config = 'https://baymax-task-manager-api.herokuapp.com'
  }
  

  generateURL(path: string, parms: Param[]) {
    if (path == null || path === undefined) {
      throw new Error('Path cannot be null')
    }
    if (!parms || parms.length === 0) {
      return `${this.config.TASK_MANAGER_AP}${path}`
    }

    let equalSeparatedParms = parms.map((param: Param) => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`);
    return `${this.config.TASK_MANAGER_AP}${path}?${equalSeparatedParms.join('&')}`
  }
}


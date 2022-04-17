import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Param, UtilService } from '../../util/util.service';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient, private utilService: UtilService) { }

  getTasks(filterTasks: filterTasks) {
    let params: Param[] = [];

    if (filterTasks.hasOwnProperty('completed') && filterTasks.completed !== undefined) {
      let val = { key: 'completed', value: filterTasks?.completed }
      params.push(val)
    } else if (filterTasks?.limit) {
      let val = { key: 'limit', value: filterTasks?.limit }
      params.push(val)
    } else if (filterTasks?.skip) {
      let val = { key: 'skip', value: filterTasks?.skip }
      params.push(val)
    } else if (filterTasks?.sortBy) {
      let val = { key: 'sortBy', value: filterTasks?.sortBy }
      params.push(val)
    }
    let url = this.utilService.generateURL('/tasks', params)
    return this.http.get(url, this.httpOptions).pipe(map((response: any) => {
      let res = {
        success: true,
        tasks: response.tasks
      }
      return res
    }), catchError(error => {
      let response = {
        success: false,
        error
      }
      return of(response);
    }))
  }

  updateTask(property: any, id: string) {
    let params: Param[] = [];
    let requestParams = {
      ...property
    }
    let url = this.utilService.generateURL('/tasks/' + id, params)
    return this.http.patch(url, requestParams, this.httpOptions).pipe(map((response: any) => {
      let res = {
        success: true,
        tasks: response.task
      }
      return res
    }), catchError(error => {
      let response = {
        success: false,
        error
      }
      return of(response);
    }))
  }

  createTask(description: string) {
    let params: Param[] = [];
    let requestParams = {
      description
    }

    let url = this.utilService.generateURL('/tasks', params)
    return this.http.post(url, requestParams, this.httpOptions).pipe(map((response: any) => {
      let res = {
        success: true,
        tasks: response.task
      }
      return res
    }), catchError(error => {
      let response = {
        success: false,
        error
      }
      return of(response);
    }))
  }
}
export interface filterTasks {
  completed?: boolean;
  limit?: number;
  skip?: number;
  sortBy?: string;
}
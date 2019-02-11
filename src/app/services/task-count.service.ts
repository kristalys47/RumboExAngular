import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cacheable} from 'ngx-cacheable';
import {Observable} from 'rxjs';
import {Task} from '../models/task';
import {FLASK_URL} from "./services";

@Injectable({
  providedIn: 'root'
})
export class TaskCountService {
  private BASE_URL: string = FLASK_URL + 'task';
  private httpheaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

   @Cacheable()
  get_personal_tasks_count(user_id): Observable<Task[]> {
    let url: string = `${this.BASE_URL}/personal/count/${user_id}`;
    return this.http.get<Task[]>(url);
  }
   @Cacheable()
  get_study_tasks_count(user_id): Observable<Task[]> {
    let url: string = `${this.BASE_URL}/study/count/${user_id}`;
    return this.http.get<Task[]>(url);
  }
 @Cacheable()
  get_apppointment_tasks_count(user_id): Observable<Task[]> {
    let url: string = `${this.BASE_URL}/appointment/count/${user_id}`;
    return this.http.get<Task[]>(url);
  }
   @Cacheable()
  get_course_tasks_count(user_id): Observable<Task[]> {
    let url: string = `${this.BASE_URL}/course/count/${user_id}`;
    return this.http.get<Task[]>(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Student } from '../../models/student';
import {Cacheable} from "ngx-cacheable";
import {students} from "../../dummy_data/dummy_data";
import {of} from "rxjs/internal/observable/of";
import {FLASK_URL} from "../services";

@Injectable({providedIn: 'root'})
export class StudentService {
  private BASE_URL: string = FLASK_URL;
  private httpheaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  @Cacheable()
  getStudent(usr_id) : Observable<Student> {
    let url: string = `${this.BASE_URL}/student/${usr_id}`;
    return this.http.get<Student>(url);
    // return of(students[0]);
  }

  @Cacheable()
  getstudentlist(): Observable<any> {
    // let url: string = `${this.BASE_URL}/student`;
    // return this.http.get<any>(url);
    return of(students);
  }

  getstudentpromise(): Observable<Student[]> {
    let url: string = `${this.BASE_URL}/student`;
    return this.http.get<Student[]>(url);
  }

  getFaculties() : Observable<any> {
    let url: string = `${this.BASE_URL}/faculties`;
    return this.http.get(url);
  }
}

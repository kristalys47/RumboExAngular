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

  // public student: Student;

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
  getstudentlist(mentor_id): Observable<any> {
    let url: string = `${this.BASE_URL}/studentlist/${mentor_id}`;
    return this.http.get<any>(url);
    // return of(students);
  }

  @Cacheable()
  getMentorsByStudentId(student_id): Observable<any> {
    let url: string = `${this.BASE_URL}/mentors/${student_id}`
    return this.http.get<any>(url);
  }

  getstudentpromise(): Observable<Student[]> {
    let url: string = `${this.BASE_URL}/student`;
    return this.http.get<Student[]>(url);
  }

  @Cacheable()
  getFaculties() : Observable<any> {
    let url: string = `${this.BASE_URL}/faculties`;
    return this.http.get(url);
  }

  updateStudent(student_id, data): Promise<any> {
    let url: string = `${this.BASE_URL}/student/${student_id}`;
    return this.http.put(url,data,{headers: this.httpheaders}).toPromise();
  }
}

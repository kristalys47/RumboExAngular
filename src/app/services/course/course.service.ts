import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from "../../models/task";
import {Observable} from "rxjs/internal/Observable";
import {HttpResponse} from "@angular/common/http";
import {Cacheable} from "ngx-cacheable";
import {courses} from "../../dummy_data/dummy_data";
import {of} from "rxjs/internal/observable/of";
import {FLASK_URL} from "../services";
import {Course} from "../../models/course";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CourseService {

  private BASE_URL: string = FLASK_URL + '/course';
  private httpheaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});

  constructor(private http: HttpClient) { }

  @Cacheable()
  get_courses(user_id): Observable<Course[]> {
    let url: string = `${this.BASE_URL}s/${user_id}`;
    console.log(url);
    return this.http.get<Course[]>(url);
    // return of(courses);
  }

  @Cacheable()
  get_courses_with_grades(user_id): Observable<any> {
    let url: string = `${this.BASE_URL}s/grades/${user_id}`;
    return this.http.get(url)
  }

  @Cacheable()
  get_course(course_id, student_id): Observable<any> {
    let url: string = `${this.BASE_URL}/${course_id}/${student_id}`;
    return this.http.get(url);
    // return of(courses[course_id]);
  }

  @Cacheable()
  get_grades_by_course_id(course_id): Observable<any> {
    let url: string = `${this.BASE_URL}/${course_id}/grades`;
    return this.http.get(url);
  }

  insert_course(user_id, course): Promise<any> {
    let url: string = `${this.BASE_URL}/${user_id}`;
    return this.http.post(url, course, {headers: this.httpheaders}).toPromise();
  }

  insert_grade(user_id, grade) : Promise<any> {
    let url: string = `${FLASK_URL}/grade/${user_id}`;
    return this.http.post(url, grade, {headers: this.httpheaders}).toPromise();
  }

  edit_grade(user_id, data): Promise<any> {
    let url: string = `${FLASK_URL}/grade/${user_id}`;
    return this.http.put(url, data, {headers: this.httpheaders}).toPromise();
  }

  remove_grade(user_id, grade_id): Promise<any> {
    let url: string = `${FLASK_URL}/grade/${user_id}/${grade_id}`;
    return this.http.delete(url, {headers: this.httpheaders}).toPromise();
  }

}

import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from "../../models/task";
import {Observable} from "rxjs/internal/Observable";
import {HttpResponse} from "@angular/common/http";
import {Cacheable} from "ngx-cacheable";
import {courses} from "../../dummy_data/dummy_data";
import {of} from "rxjs/internal/observable/of";
import {FLASK_URL} from "../services";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CourseService {

  private BASE_URL: string = FLASK_URL + 'course';
  private httpheaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  @Cacheable()
  get_courses(user_id): Observable<any> {
    // let url: string = `${this.BASE_URL}s/${user_id}`;
    // return this.http.get(url);
    return of(courses);
  }

  @Cacheable()
  get_courses_with_grades(user_id): Observable<any> {
    let url: string = `${this.BASE_URL}s/grades/${user_id}`;
    return this.http.get(url)
  }

  @Cacheable()
  get_course(course_id): Observable<any> {
    // let url: string = `${this.BASE_URL}/${course_id}`;
    // return this.http.get(url);
    return of(courses[course_id]);
  }

  @Cacheable()
  get_grades_by_course_id(course_id): Observable<any> {
    let url: string = `${this.BASE_URL}/${course_id}/grades`;
    return this.http.get(url);
  }

}
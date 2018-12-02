import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Cacheable} from "ngx-cacheable";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private BASE_URL: string = 'http://localhost:5000/messages';
  private httpheaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  @Cacheable()
  get_messages(user_id): Observable<any> {
    let url: string = `${this.BASE_URL}/${user_id}`;
    return this.http.get(url);
  }

}

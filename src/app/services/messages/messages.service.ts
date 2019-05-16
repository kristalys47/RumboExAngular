import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Cacheable} from "ngx-cacheable";
import {FLASK_URL} from "../services";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private BASE_URL: string = FLASK_URL + '/messages';
  private httpheaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  @Cacheable()
  get_messages(user_id): Observable<any> {
    let url: string = `${this.BASE_URL}/${user_id}`;
    return this.http.get(url);
  }

  insert_message(user_id, msg): Promise<any> {
    let url: string = `${this.BASE_URL}/${user_id}`;
    return this.http.post(url, msg, {headers: this.httpheaders}).toPromise();
  }

  set_message_seen(user_id, data): Promise<any> {
    let url: string = `${this.BASE_URL}/${user_id}`;
    return this.http.put(url, data, {headers: this.httpheaders}).toPromise()
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class MethodsHttpProvider {
  constructor(public http: HttpClient) {}

  httpGet(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  httpPost(url: string, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'     
      })
    }    
    return this.http.post<any>(url, body,httpOptions);
  }
}

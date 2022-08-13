import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class MethodsHttpProvider {
  constructor(public http: HttpClient) {}

  httpGet(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  httpGetById(url: string, id: number,param:string): Observable<any> {
    return this.http.get<any>(`${url}?${param}=${id}`);
  }

  deleteById(url: string, id: number,param:string): Observable<any> {
    return this.http.delete<any>(`${url}?${param}=${id}`);
  }

  httpPost(url: string, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(url, body, httpOptions);
  }

  httpPut(url: string, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<any>(url, body, httpOptions);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class MethodsHttpProvider {
  constructor(public http: HttpClient) {}

  httpGet(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  httpGetById(url: string, id: number): Observable<any> {
    return this.http.get<any>(`${url}?id=${id}`);
  }

  deleteById(url: string, id: number): Observable<any> {
    return this.http.delete<any>(`${url}?userId=${id}`);
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

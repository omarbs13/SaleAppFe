import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class MethodsHttpProvider {
  constructor(public http: HttpClient) {}

/*   httpGet(url: string): Observable<any> {
    return this.http.get<any>(url);
  } */

  httpGet(url: string, queryParams?: HttpParams): Observable<any> {
    //if (queryParams?.toString() = !null) {
      return this.http.get<any>(url, { params: queryParams });
    //}
    //return this.http.get<any>(url);
  }

  httpGetById(url: string, id: number, param: string): Observable<any> {
    return this.http.get<any>(`${url}?${param}=${id}`);
  }

  httpGetBy(url: string, p: string, param: string): Observable<any> {
    return this.http.get<any>(`${url}?${param}=${p}`);
  }


  deleteById(url: string, id: number, param: string): Observable<any> {
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

  httpPostImg(url: string, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL',
      }),
    };
    return this.http.post<any>(url, body);
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

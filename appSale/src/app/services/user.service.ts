import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiUser } from 'src/environments/environment';
import { IResponse } from '../interface/IResponse';
import { MethodsHttpProvider } from '../providers/methodsHttpProviders';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private methodsHttp: MethodsHttpProvider) { }
  
  postUser(request: any){//: Observable<IResponse[]> {    
    console.log(request);
    /* return this.methodsHttp.httpPost(ApiUser, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    ); */
  }
}

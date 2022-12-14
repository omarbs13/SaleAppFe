import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiProvider, ApiProviderGet, ApiProviderGetAll } from 'src/environments/environment';
import {  ProviderModel } from '../interface/user.mode';
import { MethodsHttpProvider } from '../providers/methodsHttpProviders';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(private methodsHttp: MethodsHttpProvider) {}

  postProvider(request: any) {
    
    return this.methodsHttp.httpPost(ApiProvider, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  putProvider(request: ProviderModel) {   
    console.log(request);
    return this.methodsHttp.httpPut(ApiProvider, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getAllProviders(): Observable<ProviderModel[]> {
    return this.methodsHttp.httpGet(ApiProviderGetAll).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  geProvider(id: number): Observable<ProviderModel> {
    return this.methodsHttp.httpGetById(ApiProviderGet, id,'id').pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  deletetProvider(id: number): Observable<ProviderModel> {
    return this.methodsHttp.deleteById(ApiProvider, id,'providerId').pipe(
      map((response) => {
        return response.data;
      })
    );
  }
}

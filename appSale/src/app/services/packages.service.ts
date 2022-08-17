import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PackageModel } from '../interface/user.mode';
import { MethodsHttpProvider } from '../providers/methodsHttpProviders';
import { map } from 'rxjs';
import { ApiPackageGetAll } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  constructor(private methodsHttp: MethodsHttpProvider) {}

 /*  postProvider(request: any) {
    return this.methodsHttp.httpPost(ApiProvider, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  putProvider(request: ProviderModel) {   
    return this.methodsHttp.httpPut(ApiProvider, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  } */

  getAllPackages(): Observable<PackageModel[]> {
    return this.methodsHttp.httpGet(ApiPackageGetAll).pipe(
      map((response) => {
        return response.data;
      })
    );
  }  
  /* geProvider(id: number): Observable<ProviderModel> {
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
  } */
}

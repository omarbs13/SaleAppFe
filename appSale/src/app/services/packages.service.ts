import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  PackageModel,  
  ProductPackageModel,
} from '../interface/user.mode';
import { MethodsHttpProvider } from '../providers/methodsHttpProviders';
import { map } from 'rxjs';
import {
  ApiPackage,
  ApiPackageGet,
  ApiPackageGetAll,
} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PackagesService {
  constructor(private methodsHttp: MethodsHttpProvider) {}

  postPackage(request: PackageModel, products: ProductPackageModel[]) {
    request.products = products;
    return this.methodsHttp.httpPost(ApiPackage, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  putPackage(request: PackageModel, products: ProductPackageModel[]) {
    request.products = products;
    return this.methodsHttp.httpPut(ApiPackage, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getAllPackages(): Observable<PackageModel[]> {
    return this.methodsHttp.httpGet(ApiPackageGetAll).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  getPackage(id: number): Observable<PackageModel> {
    return this.methodsHttp.httpGetById(ApiPackageGet, id, 'id').pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  deletetPackage(id: number): Observable<PackageModel> {
    return this.methodsHttp.deleteById(ApiPackage, id, 'customerId').pipe(
      map((response) => {
        return response.data;
      })
    );
  }
}

import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiProduct, ApiProductFilter, ApiProductGet, ApiProductGetAll } from 'src/environments/environment';
import { ProductModel } from '../interface/user.mode';
import { MethodsHttpProvider } from '../providers/methodsHttpProviders';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private methodsHttp: MethodsHttpProvider) {}

  post(request: any) {
    return this.methodsHttp.httpPost(ApiProduct, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  put(request: ProductModel) {   
    return this.methodsHttp.httpPut(ApiProduct, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getAll(): Observable<ProductModel[]> {
    return this.methodsHttp.httpGet(ApiProductGetAll).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  get(id: number): Observable<ProductModel> {
    return this.methodsHttp.httpGetById(ApiProductGet, id,'id').pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  filter(filter:number, text:string): Observable<ProductModel[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("filter",filter);
    queryParams = queryParams.append("term",text);
    return this.methodsHttp.httpGet(ApiProductFilter, queryParams).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  delete(id: number): Observable<ProductModel> {
    return this.methodsHttp.deleteById(ApiProduct, id,'productId').pipe(
      map((response) => {
        return response.data;
      })
    );
  }
}

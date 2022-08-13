import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiCustomer, ApiCustomerGet, ApiCustomerGetAll } from 'src/environments/environment';
import { CustomerModel } from '../interface/user.mode';
import { MethodsHttpProvider } from '../providers/methodsHttpProviders';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private methodsHttp: MethodsHttpProvider) {}

  postCustomer(request: any) {
    return this.methodsHttp.httpPost(ApiCustomer, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  putCustomer(request: CustomerModel) {   
    return this.methodsHttp.httpPut(ApiCustomer, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getAllCustomers(): Observable<CustomerModel[]> {
    return this.methodsHttp.httpGet(ApiCustomerGetAll).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  geCustomer(id: number): Observable<CustomerModel> {
    return this.methodsHttp.httpGetById(ApiCustomerGet, id,'id').pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  deletetCustomer(id: number): Observable<CustomerModel> {
    return this.methodsHttp.deleteById(ApiCustomer, id,'customerId').pipe(
      map((response) => {
        return response.data;
      })
    );
  }
}

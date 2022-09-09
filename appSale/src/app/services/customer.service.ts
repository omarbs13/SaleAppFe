import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiCustomer, ApiCustomerGet, ApiCustomerGetAll, ApiCustomerGetByPhone, ApiCustomerGetCredits, ApiCustomerGetPayments, ApiCustomerPayment } from 'src/environments/environment';
import { CreditCustomerModel, CustomerModel, PaymentCustomerModel } from '../interface/user.mode';
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

  postCreditCustomer(request: any) {
    return this.methodsHttp.httpPost(ApiCustomerPayment, JSON.stringify(request)).pipe(
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

  geCustomerByPhone(phone: string): Observable<CustomerModel> {
    return this.methodsHttp.httpGetBy(ApiCustomerGetByPhone, phone,'phone').pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  getPayments(id: number): Observable<PaymentCustomerModel[]> {
    return this.methodsHttp.httpGetById(ApiCustomerGetPayments, id,'customerId').pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  getCredits(id:number): Observable<CreditCustomerModel[]> {
    return this.methodsHttp.httpGetById(ApiCustomerGetCredits, id,'customerId').pipe(
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

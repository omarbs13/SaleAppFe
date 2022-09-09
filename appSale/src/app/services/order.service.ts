import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiOrder } from 'src/environments/environment';
import { OrderModel } from '../interface/user.mode';
import { MethodsHttpProvider } from '../providers/methodsHttpProviders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private methodsHttp: MethodsHttpProvider) { }

  postOrder(request: OrderModel) {
    return this.methodsHttp.httpPost(ApiOrder, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }
}

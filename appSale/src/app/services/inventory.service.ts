import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiInventory, ApiInventoryGet } from 'src/environments/environment';
import { InventoryModel } from '../interface/user.mode';
import { MethodsHttpProvider } from '../providers/methodsHttpProviders';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private methodsHttp: MethodsHttpProvider) {}

  post(request: any) {
    return this.methodsHttp.httpPost(ApiInventory, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  put(request: InventoryModel) {   
    return this.methodsHttp.httpPut(ApiInventory, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  get(id: number): Observable<InventoryModel> {
    return this.methodsHttp.httpGetById(ApiInventoryGet, id,'id').pipe(
      map((response) => {
        return response.data;
      })
    );
  }
}
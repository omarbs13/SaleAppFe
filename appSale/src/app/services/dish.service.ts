import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiDish, ApiDishGetAll, ApiGetDishesPackages } from 'src/environments/environment';
import { DishModel, DishPackageModel } from '../interface/user.mode';
import { MethodsHttpProvider } from '../providers/methodsHttpProviders';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private methodsHttp: MethodsHttpProvider) { }

  postDishes(request: DishModel) {
    return this.methodsHttp.httpPost(ApiDish, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getAllDishes(id:number): Observable<DishModel[]> {
    return this.methodsHttp.httpGetById(ApiDishGetAll,id,'subsidiaryId').pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  getAllDishesPackages(id:number): Observable<DishPackageModel[]> {
    return this.methodsHttp.httpGetById(ApiGetDishesPackages,id,'subsidiaryId').pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  getDishes(id: number): Observable<DishModel> {
    return this.methodsHttp.httpGetById(ApiDish, id, 'id').pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  deletetDishes(id: number): Observable<DishModel> {
    return this.methodsHttp.deleteById(ApiDish, id, 'id').pipe(
      map((response) => {
        return response.data;
      })
    );
  }
}

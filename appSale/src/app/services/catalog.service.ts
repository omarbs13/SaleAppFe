import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { GetCities, GetStates, GetTypePackage, GetTypeProduct } from 'src/environments/environment';
import { CityModel, StateModel, TypePackageModel, TypeProductModel } from '../interface/user.mode';
import { MethodsHttpProvider } from '../providers/methodsHttpProviders';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(private methodsHttp: MethodsHttpProvider) {}

  getStates(): Observable<StateModel[]> {
    return this.methodsHttp.httpGet(GetStates).pipe(
      map((result) => {
        return result.data;
      })
    );
  }

  getCities(idState: number): Observable<CityModel[]> {
    return this.methodsHttp.httpGet(`${GetCities}?stateId=${idState}`).pipe(
      map((result) => {
        return result.data;
      })
    );
  }

  getTypePackage(): Observable<TypePackageModel[]> {
    return this.methodsHttp.httpGet(GetTypePackage).pipe(
      map((result) => {
        return result.data;
      })
    );
  }

  getTypeProduct(): Observable<TypeProductModel[]> {
    return this.methodsHttp.httpGet(GetTypeProduct).pipe(
      map((result) => {
        return result.data;
      })
    );
  }
}

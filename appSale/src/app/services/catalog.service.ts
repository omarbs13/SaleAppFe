import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { GetCities, GetStates } from 'src/environments/environment';
import { CityModel, StateModel } from '../interface/user.mode';
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
}

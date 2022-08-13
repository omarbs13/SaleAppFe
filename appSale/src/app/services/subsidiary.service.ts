import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiDelSubsidiary, ApiPostSubsidiary, ApiPutSubsidiary, ApiSubsidiaryGet, ApiSubsidiaryGetAll } from 'src/environments/environment';
import { SubsidiaryModel } from '../interface/user.mode';
import { MethodsHttpProvider } from '../providers/methodsHttpProviders';

@Injectable({
  providedIn: 'root'
})
export class SubsidiaryService {
  constructor(private methodsHttp: MethodsHttpProvider) {}

  postSubsidiary(request: any) {
    return this.methodsHttp.httpPost(ApiPostSubsidiary, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  putSubsidiary(request: SubsidiaryModel) {   
    return this.methodsHttp.httpPut(ApiPutSubsidiary, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getAllSubsidiaries(): Observable<SubsidiaryModel[]> {
    return this.methodsHttp.httpGet(ApiSubsidiaryGetAll).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  getSubsidiary(id: number): Observable<SubsidiaryModel> {
    return this.methodsHttp.httpGetById(ApiSubsidiaryGet, id,'subsidiaryId').pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  deletetSubsidiary(id: number): Observable<SubsidiaryModel> {
    return this.methodsHttp.deleteById(ApiDelSubsidiary, id,'subsidiaryId').pipe(
      map((response) => {
        return response.data;
      })
    );
  }
}

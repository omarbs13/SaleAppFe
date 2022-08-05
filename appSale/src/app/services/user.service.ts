import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  ApiUser,
  ApiUserGet,
  ApiUserGetAll,
} from 'src/environments/environment';
import { IResponse } from '../interface/IResponse';
import { UserModel, UserModelUpd } from '../interface/user.mode';
import { MethodsHttpProvider } from '../providers/methodsHttpProviders';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users = new Array<any>();
  constructor(private methodsHttp: MethodsHttpProvider) {}

  postUser(request: any) {
    //: Observable<IResponse[]> {
    return this.methodsHttp.httpPost(ApiUser, JSON.stringify(request)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  putUser(request: UserModelUpd) {
    let usr: UserModelUpd = {
      password: request.password,
      rolId: request.rolId,
      status: true,
      updatePassword: true,
      userId: request.userId,
      userName: request.userName,
      user: 'admin',
    };
    return this.methodsHttp.httpPut(ApiUser, JSON.stringify(usr)).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getAllUser(): Observable<UserModel[]> {
    return this.methodsHttp.httpGet(ApiUserGetAll).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  getUser(id: number): Observable<UserModelUpd> {
    return this.methodsHttp.httpGetById(ApiUserGet, id).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  deletetUser(id: number): Observable<UserModelUpd> {
    return this.methodsHttp.deleteById(ApiUser, id).pipe(
      map((response) => {
        return response.data;
      })
    );
  }
}

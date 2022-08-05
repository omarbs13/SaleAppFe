// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};


//const SERVER = `http://localhost/appSale`;


const SERVER = `http://localhost`;
const PORT = `5078`;

const API = `api`;
//export const URL = `${SERVER}/${API}`;
export const URL = `${SERVER}:${PORT}/${API}`;


export const ApiUser = `${URL}/user`;
export const ApiUserGetAll = `${URL}/user/GetAll`;
export const ApiUserGet = `${URL}/user/Get`;
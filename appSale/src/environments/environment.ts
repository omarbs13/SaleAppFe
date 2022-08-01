// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};


const SERVER = `https://pruebasjuno.interfactura.com`;
const PORT = `7191`;
const API = `api`;
export const URL = `${SERVER}/${API}`;


export const ApiUser = `${URL}/user`;
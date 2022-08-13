// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};


const SERVER = `http://localhost/appSale`;


//const SERVER = `http://localhost`;
const PORT = `5078`;

const API = `api`;
export const URL = `${SERVER}/${API}`;
//export const URL = `${SERVER}:${PORT}/${API}`;


export const ApiUser = `${URL}/user`;
export const ApiUserGetAll = `${URL}/user/GetAll`;
export const ApiUserGet = `${URL}/user/Get`;

export const ApiProvider = `${URL}/Provider`;
export const ApiProviderGetAll = `${URL}/provider/GetAll`;
export const ApiProviderGet = `${URL}/provider/Get`;

export const ApiCustomer = `${URL}/Customer`;
export const ApiCustomerGetAll = `${URL}/Customer/GetAll`;
export const ApiCustomerGet = `${URL}/Customer/Get`;

export const GetStates = `${URL}/Catalog/GetState`;
export const GetCities = `${URL}/Catalog/GetCity`;

export const RfcValid='^[A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]$';
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
export const ApiCustomerGetPayments= `${URL}/Customer/GetPayments`;
export const ApiCustomerGetCredits= `${URL}/Customer/GetCredits`;
export const ApiCustomerPayment= `${URL}/Customer/CreatePayment`;

export const ApiPostSubsidiary = `${URL}/Company/CreateSubsidiary`;
export const ApiPutSubsidiary = `${URL}/Company/UpdateSubsidiary`;
export const ApiDelSubsidiary = `${URL}/Company/DeleteSubsidiary`;
export const ApiSubsidiaryGetAll = `${URL}/Company/GetAllSubsidiary`;
export const ApiSubsidiaryGet = `${URL}/Company/GetSubsidiary`;

export const ApiProduct = `${URL}/Product`;
export const ApiProductGetAll = `${URL}/Product/GetAll`;
export const ApiProductGet = `${URL}/Product/Get`;
export const ApiProductFilter = `${URL}/Product/Filter`;

export const ApiInventory = `${URL}/Inventory`;
export const ApiInventoryGet = `${URL}/Inventory/Get`;

export const ApiPackageGetAll = `${URL}/Package/GetAll`;
export const ApiPackageGet = `${URL}/Package/Get`;
export const ApiPackage = `${URL}/Package`;

export const GetStates = `${URL}/Catalog/GetState`;
export const GetCities = `${URL}/Catalog/GetCity`;
export const GetTypePackage = `${URL}/Catalog/GetTypePackage`;
export const GetTypeProduct = `${URL}/Catalog/GetTypeProduct`;

export const ApiExpense = `${URL}/Expense`;

export const RfcValid='^[A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]$';

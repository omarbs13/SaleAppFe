export interface UserModel {
  userId: number;
  userName: string;
  rolId: number;
  rolName: string;
}

export interface UserModelUpd {
  userId: number;
  userName: string;
  rolId: number;
  password: string;
  status: boolean;
  updatePassword: boolean;
  user: string;
}

export interface CustomerModel {
  customerId: number;
  customerName: string;
  email: string;
  rfc: string;
  balance: number;
  street: string;
  state: string;
  city: string;
  stateId: number;
  cityId: number;
  zipCode: string;
  phone: string;
}

export interface ProviderModel {
  providerCustomerId: number;
  providerName: string;
  email: string;
  rfc: string;
  street: string;
  state: string;
  stateId: number;
  cityName: string;
  cityId:number;
  zipCode: string;
  phone: string;
}

export interface StateModel {
  stateId: number;
  stateName: string;
}
export interface CityModel {
  cityId: number;
  cityName: string;
}

export interface SubsidiaryModel {
  subsidiaryId: number;
  subsidiaryName: string;
  manager: number;
  managerName: string;
  companyId: number;
  street: string;
  state: string;
  cityName: string;
  stateId: number;
  cityId: number;
  zipCode: string;
  phone: string;
}

export interface ProductModel {
  productId: number;
  productName: string;
  description: string;
  salePrice: number;
  purchasePrice: number;
  packagePrice: number;
  providerId: number;
  providerName: string;
}

export interface InventoryModel {
  inventoryId: number;
  productId: string;
  minimumStock: string;
  currentStock: number;
  inventoryTypeId: number;
}

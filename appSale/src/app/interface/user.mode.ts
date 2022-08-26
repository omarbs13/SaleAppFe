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
  providerId: number;
  providerName: string;
  email: string;
  rfc: string;
  street: string;
  state: string;
  stateId: number;
  cityName: string;
  cityId: number;
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
  code: string;
  productTypeId: number;
  productTypeName: number;
  providerName: string;
  inventory: InventoryModel;
}

export interface InventoryModel {
  inventoryId: number;
  productId: string;
  minimumStock: string;
  currentStock: number;
  inventoryTypeId: number;
}

export interface PackageModel {
  packageId: number;
  packageName: string;
  description: string;
  price: number;
  typePackage: string;
  typePackageId: number;
  total: number;
  img:string,
  products: ProductPackageModel[];
}

export interface ProductPackageModel {
  productId: number;
  price: number;
  productName: string;
  description: string;
}

export interface TypeProductModel {
  productTypeId: number;
  productTypeName: string;
}

export interface TypePackageModel {
  typePackageId: number;
  typePackageName: string;
}

export interface ExpensesModel {
  providerId: number;
  totalProducts: number;
  total: number;
  description: number;
  providerName: number;
  dateExpense: Date;
}

export interface PaymentCustomerModel {
  paymentCustomerId: number;
  datePayment: Date;
  paymentType: string;
  numericReference: string;
  payment: number;
}

export interface CreditCustomerModel {
  creditCustomerId: number;
  referenceSale: string;
  originalCost: number;
  cost: number;
  isPaidOut: boolean;
  customerId: number;
  folio: number;
}

export interface OrderModel {
  creditCustomerId: number;
  referenceSale: string;
  originalCost: number;
  cost: number;
  isPaidOut: boolean;
  customerId: number;
  folio: number;
}


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
  status:boolean;  
  updatePassword:boolean;
  user:string;
}

export interface CustomerModel  {
  customerId:number
  customerName: string;
  email : string;
  rfc: number;
  Balance:number;
  street: string;  
  state: string;
  city: string;
  zipCode: string;
  phone: string;
}

export interface ProviderModel {
  providerCustomerId:number
  providerName: string;
  email : string;
  rfc: number;
  street: string;  
  state: string;
  city: string;
  zipCode: string;
  phone: string;
}


export interface StateModel {
  stateId:number
  stateName: string;
}
export interface CityModel {
  cityId:number
  cityName: string;
}
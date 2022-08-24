import { InventoryModel } from "./user.mode";

export interface DialogData {
  success: boolean;
  msg: string;
  id:number,
  stateId:number
}

export interface DialogInventory {
  success: boolean;
  msg: string;
  id:number;
  productName:string,
  inventory:InventoryModel
}

export interface DialogProvider {
  success: boolean;
  msg: string;
  id:number,
  providerName:string
}
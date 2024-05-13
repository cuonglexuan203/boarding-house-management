export interface IInvoice {
  id: number;
  type: string;
  invoiceDate: string;
  paymentDeadline: string;
  numberOfMonth: number;
  pollingMonth: string;
  status: string;
  surcharge: number;
  surchargeReason: string;
  total: number;
  serviceDetails: IServiceDetail[];
  roomNumber: string;
  rentAmount: number;
}

export interface IServiceDetail {
  id: number;
  money: number;
  oldNumber: number;
  newNumber: number;
  use: number;
  accommodationService: IAccommodationService;
}

export interface IAccommodationService {
  id: number;
  name: string;
  price: number;
  unit: string;
}


export interface IRoom {
  id: number;
  roomNumber: string;
  rentAmount: number;
  floor: string;
  area: number;
  type: string;
  status: string;
}

export interface IService{
  id: number;
  name: string;
  price: number;
  unit: string;
}
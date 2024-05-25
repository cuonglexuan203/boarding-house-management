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

export interface IAddInvoice {
  invoice: IInvoice;
  roomIds: number[] | string[];
}

export interface IServiceDetail {
  id: number;
  money: number;
  oldNumber: number;
  newNumber: number;
  use: number;
  serviceId: number;
}

// export interface IAccommodationService {
//   id: number;
//   name: string;
//   price: number;
//   unit: string;
//   isMeteredService: boolean;
// }

export interface IRoom {
  id: number;
  roomNumber: string;
  rentAmount: number;
  floor: string;
  area: number;
  type: string;
  status: string;
  services: IService[];
}

export interface IAddress {
  city: string;
  district: string;
  ward: string;
  street: string;
}

export interface ITenant {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  idCardNumber: string;
  gender: string; // Assuming gender can be a string
  address: IAddress;
  birthday: string;
  career: string;
  rooms: IRoom[]; // Assuming rooms can be any type of array
}

export interface IProvince {
  province_id: string;
  province_name: string;
  province_type: string;
}

export interface IDistrict {
  district_id: string;
  district_name: string;
  district_type: string;
  lat: string;
  lng: string;
  province_id: string;
}

export interface IWard {
  district_id: string;
  ward_id: string;
  ward_name: string;
  ward_type: string;
}
export interface IService {
  id: number;
  name: string;
  price: number;
  unit: string;
  isMeteredService: boolean;
  roomIds: number[];
}

export interface IRoomBooking {
  id: number;
  checkInDate: string;
  checkOutDate: string;
}

export interface IContract {
  id: number;
  depositAmount: number;
  numberOfMember: number;
  startDate: string;
  endDate: string;
  status: string;
  contractRepresentation: ITenant;
  room: IRoom;
}

export interface IRoomDetails {
  room: IRoom;
  roomBookings: IRoomBooking[];
  currentRoomBooking: IRoomBooking;
  services: IService[];
  tenants: ITenant[];
  invoices: IInvoice[];
  contracts: IContract[];
}

export interface ISignIn {
  username: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  expiresIn: number;
}

export interface IAddContract {
  contract: IContract;
  contractRepresentation: IUser;
  roomId: number;
}

export interface IUser extends ITenant {
  username: string;
  password: string;
}

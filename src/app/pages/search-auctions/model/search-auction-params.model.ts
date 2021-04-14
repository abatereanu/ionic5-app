export interface SearchAuctionParamsModel {
  makeModels: [{make: string, model: string}];
  mileage: number;
  vehicleState: string;
  fromYear: string;
  toYear: string;
  page: number;
}

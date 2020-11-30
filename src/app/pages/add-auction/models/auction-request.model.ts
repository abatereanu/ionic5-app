export interface AuctionRequestModel {
  make: string;
  model: string;
  year: string;
  mileage: string;
  mileageType: 'kmh' | 'mph';
  state: 'new' | 'used' | 'repair';
  description?: string;
}

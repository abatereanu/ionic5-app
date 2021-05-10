export interface AuctionRequestModel {
  title: string;
  make: string;
  model: string;
  year: string;
  mileage: number;
  mileageType: 'kmh' | 'mph';
  state: 'new' | 'used' | 'repair';
  description?: string;
  imageIds?: string;
}

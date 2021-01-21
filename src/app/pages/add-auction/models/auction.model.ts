import { ImageModel } from './image.model';

export interface AuctionModel {
  id: string;
  createdDate: string;
  make: string;
  model: string;
  description: string;
  mileage: number;
  mileageType: 'kmh' | 'mph';
  vehicleState: 'new' | 'used' | 'repair';
  year: string;
  username: string;
  images: ImageModel[];
}

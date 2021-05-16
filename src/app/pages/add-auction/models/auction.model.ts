import type { ImageModel } from './image.model';

export interface AuctionModel {
  id: string;
  title: string;
  make: string;
  model: string;
  description: string;
  mileage: number;
  mileageType: 'kmh' | 'mph';
  vehicleState: 'new' | 'used' | 'repair';
  year: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  images: ImageModel[];
}

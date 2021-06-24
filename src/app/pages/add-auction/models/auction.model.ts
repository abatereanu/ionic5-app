import type { ImageModel } from './image.model';
import { AuctionTypeEnum } from '../enums/auction-type.enum';

export interface AuctionModel {
  id: string;
  auctionType: AuctionTypeEnum;
  title: string;
  make: string;
  model: string;
  year: Date;
  mileage: number;
  mileageType: 'kmh' | 'mph';
  vehicleState: 'new' | 'used' | 'repair';
  description: string;
  price?: number;
  endOfBidDate?: Date;
  minBidPrice?: number;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  images: ImageModel[];
}

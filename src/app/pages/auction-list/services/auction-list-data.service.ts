import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from '../../../shared/constants/constants';
import { ApiResponse } from '../../../shared/model/api-response.model';
import { AuctionModel } from '../../add-auction/models/auction.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionListDataService {

  constructor(private http: HttpClient) {
  }

  getAuctionData(page: number) {
    return this.http.get<ApiResponse<AuctionModel[]>>(`${CONSTANTS.API_URL}/auction?limit=10&page=${page}`);
  }
}

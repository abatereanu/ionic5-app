import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import type { ApiResponse } from '../../../shared/model/api-response.model';
import type { AuctionModel } from '../../add-auction/models/auction.model';
import { CONSTANTS } from '../../../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuctionListDataService {
  constructor(private http: HttpClient) {}

  getAuctionList(params) {
    return this.http.get<ApiResponse<AuctionModel[]>>(`${CONSTANTS.API_URL}/auction`, { params });
  }

  removeAuctionById(id) {
    return this.http.delete(`${CONSTANTS.API_URL}/auction/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuctionRequestModel } from '../models/auction-request.model';
import { CONSTANTS } from '../../../shared/constants/constants';
import type { ApiResponse } from '../../../shared/model/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class AddAuctionDataService {
  constructor(private http: HttpClient) {}

  addAuction(data: AuctionRequestModel) {
    return this.http.post<ApiResponse<AuctionRequestModel>>(`${CONSTANTS.API_URL}/auction`, data);
  }
}

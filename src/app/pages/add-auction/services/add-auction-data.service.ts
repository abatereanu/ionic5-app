import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from '../../../shared/model/api-response.model';
import { FriendModel } from '../../friend-list/model/friend.model';
import { AuctionRequestModel } from '../models/auction-request.model';
import { CONSTANTS } from '../../../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AddAuctionDataService {

  constructor(private http: HttpClient) { }

  addAuction(data: AuctionRequestModel) {
    return this.http.post<ApiResponseModel<AuctionRequestModel>>(CONSTANTS.API_URL + '/auction', data);
  }
}

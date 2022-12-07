import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Coupon } from '../model/Coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  serverApi = environment.serverApi;
  constructor(private http: HttpClient) { }

  getCouponsList() {
    return this.http.get(this.serverApi + 'Elearning/' + 'coupon/');
  }

  redeemCoupon(token: any, userId: number) {
    return this.http.post(this.serverApi + 'Elearning/' + 'coupon/redeem/' + userId, { couponValue: token });
  }

  addCoupons(coupon: Coupon) {
    return this.http.post(this.serverApi + 'Elearning/' + 'coupon/' + coupon.numberOfRows, coupon);
  }
  verifyCoupon(token: string) {
    return this.http.post(this.serverApi + 'Elearning/coupon/verif_token', {
      couponValue: token
    });
  }
}

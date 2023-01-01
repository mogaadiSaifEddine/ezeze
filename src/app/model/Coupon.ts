export interface Coupon {
  type: CouponType;
  value: string;
  expirationDate: Date;
  numberOfRows?: number;
}
export const ColorState = {
  used: 'yellow',
  unused: 'green',
  expired: 'red'
};

export enum State {
  'used' = 'used',
  'unused' = 'unused',
  'expired' = 'expired'
}
export enum CouponType {
  'USER_1' = 'USER_1',
  'USER_2' = 'USER_2',
  'USER_3' = 'USER_3'
}

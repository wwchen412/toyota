import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private $http: HttpClient) {}
  getRedirect() {
    return this.$http.get('/payment/api/Redirect');
  }
  // https://api.toyotafinancial.sg/payment/api/PaymentCodeValidation
  statusValidate() {
    const body = JSON.stringify({
      'paymentCode': '1d68c5de-3f53-4dc9-843b-3d12d52c8076'
    });
    const url = '/api/payment/api/PaymentCodeValidation';
    return this.$http.post<any>(
      url ,
      {paymentCode: '1d68c5de-3f53-4dc9-843b-3d12d52c8076'}
    );
  }
}

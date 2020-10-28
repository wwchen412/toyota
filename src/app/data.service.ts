import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private $http: HttpClient) {}
  getRedirect() {
    return this.$http.get('/api/payment/api/Redirect');
  }
  // https://api.toyotafinancial.sg/payment/api/PaymentCodeValidation
  statusValidate() {
    const body = JSON.stringify({
      paymentCode: '55EEDAC0-B564-45E8-ABF1-7D19E6D64631'
    });
    const url = '/api/payment/api/PaymentCodeValidation';
    return this.$http.post<any>(url, {
      paymentCode: '55EEDAC0-B564-45E8-ABF1-7D19E6D64631'
    });
  }
}

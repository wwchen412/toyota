import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
const APIURL = 'https://api-uat.toyotafinancial.sg/';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private pageSource = new BehaviorSubject('nric');
  private authSource = new BehaviorSubject('');

  // otp
  private otpMsgSource = new BehaviorSubject('');

  currentPage = this.pageSource.asObservable();
  authToken = this.authSource.asObservable();
  otpMsg = this.otpMsgSource.asObservable();

  auth: string;

  constructor(private $http: HttpClient) {}

  changePage(page: string) {
    this.pageSource.next(page);
  }
  setAuth(token: string) {
    this.authSource.next(token);
  }

  setOtpMsg(msg: string) {
    this.otpMsgSource.next(msg);
  }

  createHeader() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.auth}`);
    return headers;
  }
  getOtpSetting() {
    return this.$http.get<any>(APIURL + 'otp/api/OTPSettings');
  }
  sendOTP() {
    this.authToken.subscribe(auth => (this.auth = auth));
    return this.$http.post<any>(APIURL + 'otp/api/SendOtp', '', {
      headers: this.createHeader()
    });
  }
  reSendOTP() {
    return this.$http.post<any>(APIURL + 'otp/api/ResendOtp', '', {
      headers: this.createHeader()
    });
  }
  validateOTP(pin) {
    return this.$http.post(
      APIURL + 'otp/api/ValidateOTP',
      {
        pin: pin
      },
      {
        headers: this.createHeader()
      }
    );
  }
  statusValidate(paymentCode) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const url = APIURL + 'payment/api/PaymentCodeValidation';
    return this.$http.post<any>(
      url,
      { paymentCode: paymentCode },
      { headers: headers }
    );
  }
  getPayChannel() {
    return this.$http.get<any>(APIURL + 'payment/api/PaymentChannel', {
      headers: this.createHeader()
    });
  }
  getPayInfo() {
    return this.$http.get<any>(APIURL + 'payment/api/PaymentInfo', {
      headers: this.createHeader()
    });
  }
  getPaymentMethod() {
    return this.$http.get<any>(APIURL + 'payment/api/PaymentMethod', {
      headers: this.createHeader()
    });
  }
}
